import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Box, Container, Typography } from '@mui/material';

const BlogForm: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios.post(`${process.env.REACT_APP_BACK_API}/blogposts/`, { title, content })
      .then(response => {
        console.log('Blog post created:', response.data);
        setTitle('');
        setContent('');
        window.location.reload(); // Refresh the page
      })
      .catch(error => console.error('Error creating blog post:', error));
  };

  return (
    <Container maxWidth="sm">
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Create a New Blog Post
        </Typography>
        <TextField
          label="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Box sx={{ mt: 2 }}>
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Submit
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default BlogForm;
