import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Select, SelectGroup, SelectValue, SelectTrigger, SelectContent, SelectLabel, SelectItem, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from '@/components/ui/select';

describe('Select Component', () => {
  it('renders correctly and opens', () => {
    render(
      <Select>
        <SelectTrigger>
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectScrollUpButton />
          <SelectGroup>
            <SelectLabel>Label</SelectLabel>
            <SelectItem value="1">Item 1</SelectItem>
          </SelectGroup>
          <SelectSeparator />
          <SelectScrollDownButton />
        </SelectContent>
      </Select>
    );
    
    fireEvent.click(screen.getByRole('combobox'));
    expect(screen.getByText('Label')).toBeInTheDocument();
  });
});
