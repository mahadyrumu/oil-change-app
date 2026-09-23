import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Calendar } from '@/components/ui/calendar';

describe('Calendar Component', () => {
  it('renders calendar correctly', () => {
    render(<Calendar mode="single" selected={new Date(2025, 0, 1)} />);
    // React-day-picker renders navigation buttons, e.g. "Previous Month" or standard month display
    // We just check if the calendar grid is in the document
    expect(screen.getByRole('grid')).toBeInTheDocument();
  });
});
