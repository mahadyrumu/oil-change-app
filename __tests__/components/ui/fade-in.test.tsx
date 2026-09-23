import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/ui/fade-in';

// Mock framer-motion since we are testing components wrapping motion
jest.mock('framer-motion', () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const React = require('react');
  const MotionDiv = React.forwardRef((props: any, ref: any) => {
    const { viewport, variants, transition, ...rest } = props;
    return <div ref={ref} {...rest} />;
  });
  MotionDiv.displayName = 'MotionDiv';
  
  return {
    motion: {
      div: MotionDiv,
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
