import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { BlogPost } from "../types";
import { Container, Typography, CircularProgress, Box, Button } from "@mui/material";

const BlogPostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_API}/blogposts/${id}`)
      .then((response) => setPost(response.data))
      .catch((error) => console.error("Error fetching blog post:", error));
  }, [id]);

  const handleDelete = () => {
    axios
      .delete(`${process.env.REACT_APP_BACK_API}/blogposts/${id}`)
      .then(() => {
        console.log("Blog post deleted");
        navigate("/"); // Redirect to home page after deletion
      })
      .catch((error) => console.error("Error deleting blog post:", error));
  };

  if (!post)
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );

  return (
    <Container>
      <Typography variant="h1" gutterBottom>
        {post.title}
      </Typography>
      <Typography variant="body1">{post.content}</Typography>
      <Box mt={4}>
        <Button variant="contained" color="secondary" onClick={handleDelete}>
          Delete Post
        </Button>
      </Box>
    </Container>
  );
};

export default BlogPostDetail;
