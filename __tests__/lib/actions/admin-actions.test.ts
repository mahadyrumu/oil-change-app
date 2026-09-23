import { createAppointment, updateAppointment, deleteAppointment, createCustomer, updateCustomer, toggleCustomerActiveStatus } from '@/lib/actions/admin-actions';
import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';

// Mock DB
jest.mock('@/lib/db', () => ({
  prisma: {
    appointment: {
      update: jest.fn(),
      delete: jest.fn(),
      create: jest.fn(),
    },
    user: {
      create: jest.fn(),
      update: jest.fn(),
    },
  },
}));

// Mock Auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

// Mock Next.js Cache
jest.mock('next/cache', () => ({
  revalidatePath: jest.fn(),
}));

describe('Admin Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createAppointment', () => {
    it('creates appointment and revalidates path', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'ADMIN' } });
      (prisma.appointment.create as jest.Mock).mockResolvedValue({ id: '1' });

      const result = await createAppointment({
        userId: 'u1',
        serviceId: 's1',
        date: '2025-01-01',
        status: 'PENDING'
      });

      expect(prisma.appointment.create).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('updateAppointment', () => {
    it('updates appointment and revalidates path', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'ADMIN' } });
      (prisma.appointment.update as jest.Mock).mockResolvedValue({ id: '1', status: 'CONFIRMED' });

      const result = await updateAppointment('1', {
        userId: 'u1',
        serviceId: 's1',
        date: '2025-01-01',
        status: 'CONFIRMED'
      });

      expect(prisma.appointment.update).toHaveBeenCalled();
      expect(revalidatePath).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it('returns error on failure (unauthorized)', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'CUSTOMER' } });

      await expect(updateAppointment('1', {
        userId: 'u1',
        serviceId: 's1',
        date: '2025-01-01',
        status: 'CONFIRMED'
      })).rejects.toThrow('Unauthorized');
    });
  });

  describe('deleteAppointment', () => {
    it('deletes appointment and revalidates path', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'ADMIN' } });
      (prisma.appointment.delete as jest.Mock).mockResolvedValue({ id: '1' });

      const result = await deleteAppointment('1');

      expect(prisma.appointment.delete).toHaveBeenCalledWith({
        where: { id: '1' },
      });
      expect(revalidatePath).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });

    it('returns error on failure (unauthorized)', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'CUSTOMER' } });

      await expect(deleteAppointment('1')).rejects.toThrow('Unauthorized');
    });
  });

  describe('createCustomer', () => {
    it('creates customer', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'ADMIN' } });
      (prisma.user.create as jest.Mock).mockResolvedValue({ id: '1' });
      const result = await createCustomer({ name: 'John', email: 'j@j.com', isActive: true });
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('updateCustomer', () => {
    it('updates customer', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'ADMIN' } });
      (prisma.user.update as jest.Mock).mockResolvedValue({ id: '1' });
      const result = await updateCustomer('1', { name: 'John', email: 'j@j.com', isActive: true });
      expect(prisma.user.update).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('toggleCustomerActiveStatus', () => {
    it('toggles active status', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { role: 'ADMIN' } });
      (prisma.user.update as jest.Mock).mockResolvedValue({ id: '1' });
      const result = await toggleCustomerActiveStatus('1', true);
      expect(prisma.user.update).toHaveBeenCalledWith({
        where: { id: '1' },
        data: { isActive: false }
      });
      expect(result.success).toBe(true);
    });
  });
});
