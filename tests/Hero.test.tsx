import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Hero } from '../src/components/Hero';

describe('Hero Component', () => {
  it('renders the main headline', () => {
    // Add stub to avoid framer-motion issues in test
    window.matchMedia = window.matchMedia || function() {
      return {
        matches: false,
        addListener: function() {},
        removeListener: function() {}
      };
    };
    
    render(<Hero />);
    expect(screen.getByText('Most assistants')).toBeInTheDocument();
  });
});
