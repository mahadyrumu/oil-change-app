import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from '@/components/ui/dropdown-menu';

describe('DropdownMenu Component', () => {
  it('renders correctly and opens', () => {
    render(
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuGroup>
            <DropdownMenuLabel>Label</DropdownMenuLabel>
            <DropdownMenuItem>Item 1</DropdownMenuItem>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuCheckboxItem checked>Checkbox Item</DropdownMenuCheckboxItem>
          
          <DropdownMenuRadioGroup value="1">
            <DropdownMenuRadioItem value="1">Radio Item</DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>Sub Trigger</DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>Sub Item</DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuContent>
      </DropdownMenu>
    );
    
    fireEvent.click(screen.getByText('Open'));
    expect(screen.getByText('Item 1')).toBeInTheDocument();
    expect(screen.getByText('Label')).toBeInTheDocument();
    expect(screen.getByText('Checkbox Item')).toBeInTheDocument();
    expect(screen.getByText('Radio Item')).toBeInTheDocument();
    expect(screen.getByText('Sub Trigger')).toBeInTheDocument();
  });
});
