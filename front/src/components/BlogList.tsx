import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BlogPost } from "../types";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";

const BlogList: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACK_API}/blogposts/`)
      .then((response) => setPosts(response.data))
      .catch((error) => console.error("Error fetching blog posts:", error));
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Blog Posts
      </Typography>
      <List>
        {posts.map((post) => (
          <ListItem key={post.id} component={Link} to={`/blogposts/${post.id}`}>
            <ListItemText primary={post.title} />
          </ListItem>
        ))}
      </List>
    </Container>
  );
};

export default BlogList;
