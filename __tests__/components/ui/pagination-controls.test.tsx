import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { PaginationControls } from '@/components/ui/pagination-controls';

describe('PaginationControls Component', () => {
  it('renders pagination correctly', () => {
    render(
      <PaginationControls
        currentPage={2}
        setCurrentPage={jest.fn()}
        itemsPerPage={10}
        setItemsPerPage={jest.fn()}
        totalItems={50}
        totalPages={5}
        startIndex={10}
      />
    );
    
    // Check if current page is displayed
    expect(screen.getByText(/Showing 11-20 of 50/i)).toBeInTheDocument();
    
    // Check if buttons are present
    expect(screen.getByText(/back/i, { selector: 'button' })).toBeInTheDocument();
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeInTheDocument();
  });

  it('disables previous button on first page', () => {
    render(
      <PaginationControls
        currentPage={1}
        setCurrentPage={jest.fn()}
        itemsPerPage={10}
        setItemsPerPage={jest.fn()}
        totalItems={50}
        totalPages={5}
        startIndex={0}
      />
    );
    expect(screen.getByText(/back/i, { selector: 'button' })).toBeDisabled();
  });

  it('disables next button on last page', () => {
    render(
      <PaginationControls
        currentPage={5}
        setCurrentPage={jest.fn()}
        itemsPerPage={10}
        setItemsPerPage={jest.fn()}
        totalItems={50}
        totalPages={5}
        startIndex={40}
      />
    );
    expect(screen.getByText(/next/i, { selector: 'button' })).toBeDisabled();
  });
});
