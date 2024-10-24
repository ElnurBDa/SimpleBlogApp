import React from "react";
import BlogList from "../components/BlogList";
import BlogForm from "../components/BlogForm";
import { Container, Box, Grid } from "@mui/material";

const Home: React.FC = () => (
  <Container>
    <Box my={4}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <BlogForm />
        </Grid>
        <Grid item xs={12} md={6}>
          <BlogList />
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export default Home;
