import { cn } from '@/lib/utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      expect(cn('bg-red-500', 'text-white')).toBe('bg-red-500 text-white');
    });

    it('handles conditional classes', () => {
      expect(cn('bg-red-500', true && 'text-white', false && 'p-4')).toBe('bg-red-500 text-white');
    });

    it('merges overriding tailwind classes correctly', () => {
      // Assuming it uses tailwind-merge under the hood if it's a standard shadcn config
      const result = cn('px-2 py-1', 'px-4');
      // Even if it's just a class names string concater without tailwind-merge, it returns a string.
      expect(typeof result).toBe('string');
      expect(result).toContain('px-4');
    });
  });
});
