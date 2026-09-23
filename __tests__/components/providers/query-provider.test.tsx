import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { QueryProvider } from '@/components/providers/query-provider';

describe('QueryProvider', () => {
  it('renders children correctly', () => {
    render(
      <QueryProvider>
        <div data-testid="child">Test Child</div>
      </QueryProvider>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });
});
