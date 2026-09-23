import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Textarea } from '@/components/ui/textarea';

describe('Textarea Component', () => {
  it('renders the textarea correctly', () => {
    render(<Textarea placeholder="Enter details" />);
    const textarea = screen.getByPlaceholderText('Enter details');
    expect(textarea).toBeInTheDocument();
    expect(textarea.tagName).toBe('TEXTAREA');
  });

  it('passes props correctly', () => {
    render(<Textarea data-testid="test-textarea" disabled rows={5} />);
    const textarea = screen.getByTestId('test-textarea');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveAttribute('rows', '5');
  });
});
