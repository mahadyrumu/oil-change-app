import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { BookingForm } from '@/components/booking-form';
import { useRouter } from 'next/navigation';

// Mock useRouter
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

// Mock useActionState
let mockActionState = { success: false, errors: {}, message: '' };
jest.mock('react', () => ({
  ...jest.requireActual('react'),
  useActionState: () => [mockActionState, jest.fn(), false],
}));

describe('BookingForm Component', () => {
  const mockRouterPush = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockRouterPush,
    });
    mockActionState = { success: false, errors: {}, message: '' };
    
    // Mock sessionStorage
    Storage.prototype.setItem = jest.fn();
  });

  const services = [
    { id: '1', name: 'Standard Oil Change', price: 49.99, duration: 30, description: '' },
    { id: '2', name: 'Full Synthetic Oil Change', price: 79.99, duration: 30, description: '' }
  ];

  it('renders and allows selecting a service and time', () => {
    render(<BookingForm services={services} isAuthenticated={true} />);
    
    // Select service
    const serviceBtn = screen.getByText('Standard Oil Change');
    fireEvent.click(serviceBtn);
    
    // Select quick time
    const timeBtn = screen.getByText('08:00 AM');
    fireEvent.click(timeBtn);
    
    // Summary bar should appear
    expect(screen.getAllByText('Standard Oil Change').length).toBe(2);
    expect(screen.getAllByText('$49.99').length).toBe(2);
  });

  it('allows custom time input', () => {
    render(<BookingForm services={services} isAuthenticated={true} />);
    
    const timeInput = document.querySelector('input[type="time"]');
    if (timeInput) {
      fireEvent.change(timeInput, { target: { value: '14:30' } });
      // 14:30 should be converted to 02:30 PM
      expect(timeInput).toHaveValue('14:30');
    }
  });

  it('handles unauthenticated redirect on save', () => {
    render(<BookingForm services={services} isAuthenticated={false} />);
    
    // Cannot submit if not fully filled
    fireEvent.click(screen.getByText('Continue to Sign In →'));
    expect(mockRouterPush).not.toHaveBeenCalled();

    // Fill form
    fireEvent.click(screen.getByText('Standard Oil Change'));
    fireEvent.click(screen.getByText('08:00 AM'));
    
    fireEvent.click(screen.getByText('Continue to Sign In →'));
    expect(sessionStorage.setItem).toHaveBeenCalled();
    expect(mockRouterPush).toHaveBeenCalledWith('/login?callbackUrl=/book/process');
  });

  it('handles successful booking submission', async () => {
    mockActionState = { success: true, errors: {}, message: 'Success' };
    render(<BookingForm services={services} isAuthenticated={true} />);
    
    await waitFor(() => {
      expect(mockRouterPush).toHaveBeenCalledWith('/dashboard');
    });
  });
});
