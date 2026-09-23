import { loginAction, registerAction, logoutAction } from '@/lib/actions/auth';
import { signIn, signOut } from '@/lib/auth';
import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';

jest.mock('next-auth', () => {
  class AuthError extends Error {
    type: string;
    constructor(type: string) {
      super(type);
      this.type = type;
    }
  }
  return { AuthError };
});
import { AuthError } from 'next-auth';

jest.mock('@/lib/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
  auth: jest.fn(),
}));

jest.mock('@/lib/db', () => ({
  prisma: {
    user: {
      findUnique: jest.fn(),
      create: jest.fn(),
    },
  },
}));

jest.mock('bcryptjs', () => ({
  hash: jest.fn(),
}));

describe('Auth Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('loginAction', () => {
    it('returns error for invalid input', async () => {
      const formData = new FormData();
      formData.append('email', 'invalid');
      
      const result = await loginAction({}, formData);
      
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('returns success on valid login', async () => {
      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'password123');
      
      (signIn as jest.Mock).mockResolvedValue(true);
      
      const result = await loginAction({}, formData);
      
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'test@test.com',
        password: 'password123',
        redirect: false
      });
      expect(result.success).toBe(true);
    });

    it('returns error on AuthError', async () => {
      const formData = new FormData();
      formData.append('email', 'test@test.com');
      formData.append('password', 'wrong');
      
      const error = new AuthError('CredentialsSignin');
      
      (signIn as jest.Mock).mockRejectedValue(error);
      
      const result = await loginAction({}, formData);
      
      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid email or password.');
    });
  });

  describe('registerAction', () => {
    it('returns error for invalid input', async () => {
      const formData = new FormData();
      formData.append('email', 'invalid');
      
      const result = await registerAction({}, formData);
      
      expect(result.success).toBe(false);
      expect(result.errors).toBeDefined();
    });

    it('returns error if user exists', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'test@test.com');
      formData.append('password', 'password123');
      
      (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: '1' });
      
      const result = await registerAction({}, formData);
      
      expect(result.success).toBe(false);
      expect(result.message).toContain('already exists');
    });

    it('creates new user and returns success', async () => {
      const formData = new FormData();
      formData.append('name', 'John Doe');
      formData.append('email', 'test@test.com');
      formData.append('password', 'password123');
      
      (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
      (bcrypt.hash as jest.Mock).mockResolvedValue('hashed');
      (prisma.user.create as jest.Mock).mockResolvedValue({ id: '1' });
      
      const result = await registerAction({}, formData);
      
      expect(prisma.user.create).toHaveBeenCalled();
      expect(result.success).toBe(true);
    });
  });

  describe('logoutAction', () => {
    it('calls signOut', async () => {
      await logoutAction();
      expect(signOut).toHaveBeenCalledWith({ redirect: true, redirectTo: '/' });
    });
  });
});
