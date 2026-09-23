import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeToggle } from '@/components/theme-toggle';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: () => ({
    theme: 'light',
    setTheme: jest.fn(),
  }),
}));

describe('ThemeToggle Component', () => {
  it('renders the theme toggle button', () => {
    render(<ThemeToggle />);
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    // It should have screen reader text for toggle theme
    expect(screen.getByText('Toggle theme')).toBeInTheDocument();
  });
});
