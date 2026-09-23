import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { GlobalStateProvider, useGlobalState } from '@/components/providers/global-context';

const TestComponent = () => {
  const { isSidebarOpen, setSidebarOpen, toggleSidebar } = useGlobalState();
  return (
    <div>
      <div data-testid="sidebar-state">{isSidebarOpen ? 'open' : 'closed'}</div>
      <button onClick={() => setSidebarOpen(true)}>Open</button>
      <button onClick={toggleSidebar}>Toggle</button>
    </div>
  );
};

const ErrorComponent = () => {
  useGlobalState();
  return <div />;
};

describe('GlobalContext', () => {
  it('provides state and methods to children', () => {
    render(
      <GlobalStateProvider>
        <TestComponent />
      </GlobalStateProvider>
    );

    const stateDisplay = screen.getByTestId('sidebar-state');
    expect(stateDisplay.textContent).toBe('closed');

    fireEvent.click(screen.getByText('Open'));
    expect(stateDisplay.textContent).toBe('open');

    fireEvent.click(screen.getByText('Toggle'));
    expect(stateDisplay.textContent).toBe('closed');
  });

  it('throws an error if used outside provider', () => {
    // Suppress console.error for the expected throw
    const originalError = console.error;
    console.error = jest.fn();

    expect(() => render(<ErrorComponent />)).toThrow('useGlobalState must be used within a GlobalStateProvider');

    console.error = originalError;
  });
});
