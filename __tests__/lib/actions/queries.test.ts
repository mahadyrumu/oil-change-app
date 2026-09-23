import { getUserAppointments } from '@/lib/actions/queries';
import { prisma } from '@/lib/db';
import { auth } from '@/lib/auth';

// Mock DB
jest.mock('@/lib/db', () => ({
  prisma: {
    appointment: {
      findMany: jest.fn(),
    },
  },
}));

// Mock Auth
jest.mock('@/lib/auth', () => ({
  auth: jest.fn(),
}));

describe('Queries Actions', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getUserAppointments', () => {
    it('throws error if unauthorized', async () => {
      (auth as jest.Mock).mockResolvedValue(null);
      await expect(getUserAppointments()).rejects.toThrow('Unauthorized');
    });

    it('returns appointments on success', async () => {
      (auth as jest.Mock).mockResolvedValue({ user: { id: 'u1' } });
      const mockAppointments = [{ id: 'a1', date: new Date() }];
      (prisma.appointment.findMany as jest.Mock).mockResolvedValue(mockAppointments);

      const result = await getUserAppointments();
      expect(result).toEqual(mockAppointments);
      expect(prisma.appointment.findMany).toHaveBeenCalledWith({
        where: { userId: 'u1' },
        include: { service: true },
        orderBy: { date: 'desc' }
      });
    });
  });
});
