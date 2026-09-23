import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';

// Mock framer-motion since we are testing components wrapping motion
jest.mock('framer-motion', () => {
  const React = require('react');
  return {
    motion: {
      div: React.forwardRef((props: any, ref: any) => {
        const { viewport, variants, transition, ...rest } = props;
        return <div ref={ref} {...rest} />;
      }),
    },
  };
});

describe('FadeIn Component', () => {
  it('renders children correctly', () => {
    render(
      <FadeIn>
        <p>Faded Content</p>
      </FadeIn>
    );
    expect(screen.getByText('Faded Content')).toBeInTheDocument();
  });
});

describe('Stagger Components', () => {
  it('renders children correctly', () => {
    render(
      <StaggerContainer>
        <StaggerItem>
          <p>Staggered Content</p>
        </StaggerItem>
      </StaggerContainer>
    );
    expect(screen.getByText('Staggered Content')).toBeInTheDocument();
  });
});
