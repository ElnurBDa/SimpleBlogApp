// tests/BlogForm.test.tsx
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BlogForm from '../src/components/BlogForm';
import axios from 'axios';
import '@testing-library/jest-dom';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('BlogForm', () => {
  it('renders form inputs and submit button', () => {
    render(<BlogForm />);
    
    expect(screen.getByLabelText(/title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/content/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument();
  });

  it('submits form data', async () => {
    mockedAxios.post.mockResolvedValue({ data: {} });
    
    render(<BlogForm />);
    
    fireEvent.change(screen.getByLabelText(/title/i), { target: { value: 'Test Title' } });
    fireEvent.change(screen.getByLabelText(/content/i), { target: { value: 'Test Content' } });
    
    fireEvent.click(screen.getByRole('button', { name: /submit/i }));
    
    expect(mockedAxios.post).toHaveBeenCalledWith(`${process.env.REACT_APP_BACK_API}/blogposts/`, {
      title: 'Test Title',
      content: 'Test Content',
    });
  });
});

