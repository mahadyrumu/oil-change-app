import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell, TableFooter, TableCaption } from '@/components/ui/table';

describe('Table Component', () => {
  it('renders a full table correctly', () => {
    render(
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Head 1</TableHead>
            <TableHead>Head 2</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>Cell 1</TableCell>
            <TableCell>Cell 2</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell>Footer</TableCell>
          </TableRow>
        </TableFooter>
        <TableCaption>Caption</TableCaption>
      </Table>
    );

    expect(screen.getByText('Head 1')).toBeInTheDocument();
    expect(screen.getByText('Cell 1')).toBeInTheDocument();
  });
});
