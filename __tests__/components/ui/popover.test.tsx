import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Popover, PopoverTrigger, PopoverContent, PopoverHeader, PopoverTitle, PopoverDescription } from '@/components/ui/popover';

describe('Popover Component', () => {
  it('renders correctly and opens content', () => {
    render(
      <Popover>
        <PopoverTrigger>Open</PopoverTrigger>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Title</PopoverTitle>
            <PopoverDescription>Desc</PopoverDescription>
          </PopoverHeader>
          Content
        </PopoverContent>
      </Popover>
    );
    expect(screen.getByText('Open')).toBeInTheDocument();
    
    // Test the interaction to cover lines
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Content')).toBeInTheDocument();
    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Desc')).toBeInTheDocument();
  });
});
