// tests/Home.test.tsx
import React from 'react';
import { render, screen } from '@testing-library/react';
import Home from '../src/pages/Home';
import '@testing-library/jest-dom';

describe('Home Page', () => {
  it('renders BlogForm and BlogList components', () => {
    render(<Home />);

    expect(screen.getByText(/create a new blog post/i)).toBeInTheDocument();
    expect(screen.getByText(/blog posts/i)).toBeInTheDocument();
  });
});

