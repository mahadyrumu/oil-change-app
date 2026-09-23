import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Logo } from '@/components/logo';

describe('Logo Component', () => {
  it('renders the logo text', () => {
    render(<Logo />);
    expect(screen.getByText(/oil change/i)).toBeInTheDocument();
  });
});
