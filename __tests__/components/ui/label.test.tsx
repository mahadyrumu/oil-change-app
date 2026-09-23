import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Label } from '@/components/ui/label';

describe('Label Component', () => {
  it('renders correctly', () => {
    render(<Label htmlFor="test">My Label</Label>);
    const label = screen.getByText('My Label');
    expect(label).toBeInTheDocument();
    expect(label).toHaveAttribute('for', 'test');
  });
});
