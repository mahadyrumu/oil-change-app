import { createAppointment, cancelAppointment, updateAppointment } from '@/lib/actions/booking';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

// Mock DB
jest.mock('@/lib/db', () => ({
  prisma: {
    appointment: {
      findFirst: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

// Mock Auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

describe('Booking Actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('createAppointment', () => {
    it('returns unauthorized if not logged in', async () => {
      (auth as jest.Mock).mockResolvedValue(null);
      const formData = new FormData();
      const result = await createAppointment(null, formData);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Unauthorized');
    });

    it('returns validation error on missing fields', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      const formData = new FormData();
      const result = await createAppointment(null, formData);
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('creates appointment successfully', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      (prisma.appointment.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.appointment.create as jest.Mock).mockResolvedValue({});

      const formData = new FormData();
      formData.append('serviceId', 's1');
      formData.append('date', '2025-01-01');
      formData.append('time', '10:00 AM');

      const result = await createAppointment(null, formData);
      expect(result.success).toBe(true);
      expect(prisma.appointment.create).toHaveBeenCalled();
    });

    it('returns error on duplicate appointment', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      (prisma.appointment.findFirst as jest.Mock).mockResolvedValue({ id: 'a1' });

      const formData = new FormData();
      formData.append('serviceId', 's1');
      formData.append('date', '2025-01-01');
      formData.append('time', '10:00 AM');

      const result = await createAppointment(null, formData);
      expect(result.success).toBe(false);
      expect(result.message).toContain('already have a booking');
    });

    it('returns error on invalid date', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      const formData = new FormData();
      formData.append('serviceId', 's1');
      formData.append('date', 'invalid-date');
      formData.append('time', 'invalid-time');

      const result = await createAppointment(null, formData);
      expect(result.success).toBe(false);
      expect(result.message).toContain('Invalid date');
    });
  });

  describe('cancelAppointment', () => {
    it('cancels appointment successfully', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      (prisma.appointment.findUnique as jest.Mock).mockResolvedValue({ id: 'a1', userId: 'u1', status: 'PENDING' });
      (prisma.appointment.update as jest.Mock).mockResolvedValue({});

      const result = await cancelAppointment('a1');
      expect(result.success).toBe(true);
    });

    it('fails to cancel if unauthorized', async () => {
      (auth as jest.Mock).mockResolvedValue(null);
      const result = await cancelAppointment('a1');
      expect(result.success).toBe(false);
    });

    it('fails to cancel if already completed', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      (prisma.appointment.findUnique as jest.Mock).mockResolvedValue({ id: 'a1', userId: 'u1', status: 'COMPLETED' });
      const result = await cancelAppointment('a1');
      expect(result.success).toBe(false);
      expect(result.message).toContain('Cannot cancel');
    });
  });

  describe('updateAppointment', () => {
    it('updates successfully', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      (prisma.appointment.findUnique as jest.Mock).mockResolvedValue({ id: 'a1', userId: 'u1', status: 'PENDING' });
      (prisma.appointment.findFirst as jest.Mock).mockResolvedValue(null);
      (prisma.appointment.update as jest.Mock).mockResolvedValue({});

      const formData = new FormData();
      formData.append('id', 'a1');
      formData.append('date', '2025-01-02');
      formData.append('time', '11:00 AM');

      const result = await updateAppointment(null, formData);
      expect(result.success).toBe(true);
    });

    it('returns error on collision', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      (prisma.appointment.findUnique as jest.Mock).mockResolvedValue({ id: 'a1', userId: 'u1', status: 'PENDING' });
      (prisma.appointment.findFirst as jest.Mock).mockResolvedValue({ id: 'a2' });

      const formData = new FormData();
      formData.append('id', 'a1');
      formData.append('date', '2025-01-02');
      formData.append('time', '11:00 AM');

      const result = await updateAppointment(null, formData);
      expect(result.success).toBe(false);
      expect(result.message).toContain('already booked');
    });
  });
});
