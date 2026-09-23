import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Button } from '@/components/ui/button';

describe('Button Component', () => {
  it('renders correctly with children', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
  });

  it('applies standard button styles', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('inline-flex');
    expect(buttonElement).toHaveClass('items-center');
    expect(buttonElement).toHaveClass('justify-center');
  });

  it('applies variant classes correctly', () => {
    render(<Button variant="destructive">Destructive</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toHaveClass('text-destructive');
  });

  it('can be disabled', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
  });
});
