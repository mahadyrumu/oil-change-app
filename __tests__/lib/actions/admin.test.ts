import { updateAppointmentStatus } from '@/lib/actions/admin';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

jest.mock('@/lib/db', () => ({
  prisma: {
    appointment: {
      update: jest.fn(),
    },
  },
}));

jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Admin actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('updateAppointmentStatus', () => {
    it('returns error if not authorized', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'CUSTOMER' } });
      const result = await updateAppointmentStatus('1', 'CONFIRMED');
      expect(result.success).toBe(false);
      expect(result.message).toBe('Unauthorized');
    });

    it('updates status and revalidates if authorized', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1', role: 'ADMIN' } });
      (prisma.appointment.update as jest.Mock).mockResolvedValue({ id: '1', status: 'CONFIRMED' });
      
      const result = await updateAppointmentStatus('1', 'CONFIRMED');
      
      expect(prisma.appointment.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { status: 'CONFIRMED' }
      });
      expect(revalidatePath).toHaveBeenCalledWith('/admin');
      expect(revalidatePath).toHaveBeenCalledWith('/admin/appointments');
      expect(result.success).toBe(true);
    });

    it('returns error if db update fails', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1', role: 'ADMIN' } });
      (prisma.appointment.update as jest.Mock).mockRejectedValue(new Error('DB Error'));
      
      const result = await updateAppointmentStatus('1', 'CONFIRMED');
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Failed to update status');
    });
  });
});
