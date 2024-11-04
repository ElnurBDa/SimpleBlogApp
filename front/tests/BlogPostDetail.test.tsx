// tests/BlogPostDetail.test.tsx
import BlogPostDetail from "../src/components/BlogPost";
import "@testing-library/jest-dom";
import React from "react";
import { render, screen, waitFor, fireEvent } from "@testing-library/react";
import axios from "axios";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import "@testing-library/jest-dom";
import { BlogPost } from "../src/types"; // Adjust the path as needed

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("BlogPostDetail", () => {
  const mockPost: BlogPost = {
    id: "1",
    title: "Test Post",
    content: "Test Content",
    createdAt: "2023-01-01T12:00:00Z",
    updatedAt: "2023-01-01T12:00:00Z",
  };

  beforeEach(() => {
    mockedAxios.get.mockResolvedValue({ data: mockPost });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("displays blog post details", async () => {
    render(
      <MemoryRouter initialEntries={["/blogposts/1"]}>
        <Routes>
          <Route path="/blogposts/:id" element={<BlogPostDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the blog post title and content to appear
    await waitFor(() =>
      expect(screen.getByText("Test Post")).toBeInTheDocument()
    );
    expect(screen.getByText("Test Content")).toBeInTheDocument();
  });

  it("deletes blog post", async () => {
    mockedAxios.delete.mockResolvedValue({});

    render(
      <MemoryRouter initialEntries={["/blogposts/1"]}>
        <Routes>
          <Route path="/blogposts/:id" element={<BlogPostDetail />} />
        </Routes>
      </MemoryRouter>
    );

    // Wait for the blog post to be rendered
    await waitFor(() =>
      expect(screen.getByText("Test Post")).toBeInTheDocument()
    );

    // Simulate clicking the delete button
    fireEvent.click(screen.getByText(/delete post/i));

    // Wait for the delete request to be called with the correct URL
    await waitFor(() =>
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${process.env.REACT_APP_BACK_API}/blogposts/1`
      )
    );
  });
});
