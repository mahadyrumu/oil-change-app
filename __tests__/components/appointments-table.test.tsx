import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { AppointmentsTable } from '@/app/(main)/dashboard/appointments-table';

// Mock useQuery for appointments
jest.mock('@tanstack/react-query', () => ({
  useQuery: () => ({
    data: [
      { 
        id: '1', 
        date: new Date().toISOString(), 
        status: 'PENDING', 
        service: { name: 'Full Synthetic Oil Change', price: 79.99, duration: 30 } 
      }
    ],
    isLoading: false,
  }),
}));

describe('AppointmentsTable Component', () => {
  it('renders appointments data successfully', () => {
    // Pass empty array for initialData since useQuery mock will return data
    render(<AppointmentsTable appointments={[]} />);
    
    // Check if the service name is rendered
    expect(screen.getAllByText('Full Synthetic Oil Change')[0]).toBeInTheDocument();
    
    // Check if price is rendered correctly
    expect(screen.getAllByText('$79.99')[0]).toBeInTheDocument();
    
    // Check if status badge is rendered
    expect(screen.getAllByText('Pending')[0]).toBeInTheDocument();
  });
});
