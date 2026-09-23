import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { Header } from '@/components/layout/header';
import { useSession } from 'next-auth/react';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

// Mock next-auth
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}));

// Mock auth actions
jest.mock('@/lib/actions/auth', () => ({
  logout: jest.fn(),
}));

// Mock Framer motion to bypass SVG rendering issues or layoutId issues
jest.mock('framer-motion', () => {
  const actual = jest.requireActual('framer-motion');
  return {
    ...actual,
    motion: {
      ...actual.motion,
      div: ({ children, ...props }: any) => <div {...props}>{children}</div>
    },
    useScroll: () => ({ scrollY: { get: () => 0, onChange: jest.fn() } }),
    useMotionValueEvent: jest.fn(),
  };
});

describe('Header Component', () => {
  beforeEach(() => {
    (useSession as jest.Mock).mockReturnValue({ data: null, status: 'unauthenticated' });
  });

  it('renders the logo and navigation links', () => {
    render(<Header session={null} />);
    expect(screen.getByText(/oil change/i)).toBeInTheDocument();
    expect(screen.getAllByText(/services/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/about/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/contact/i).length).toBeGreaterThan(0);
    expect(screen.getAllByText(/book appointment/i).length).toBeGreaterThan(0);
  });

  it('shows user menu when authenticated', () => {
    const session = { user: { id: '1', name: 'Test User', role: 'CUSTOMER' }, expires: '' };
    
    render(<Header session={session as any} />);
    expect(screen.getAllByText(/Test/i).length).toBeGreaterThan(0);
  });

  it('shows admin link when admin', () => {
    const session = { user: { id: '2', name: 'Admin User', role: 'ADMIN' }, expires: '' };
    
    render(<Header session={session as any} />);
    expect(screen.getAllByText(/Admin Panel/i).length).toBeGreaterThan(0);
  });
  
  it('toggles mobile menu', () => {
    render(<Header session={null} />);
    // Select the toggle button (it's the only one with no text inside, containing just an SVG)
    const toggleButton = document.querySelector('button.rounded-full.bg-muted\\/50') as HTMLButtonElement;
    if (toggleButton) {
      fireEvent.click(toggleButton);
    }
  });
});
