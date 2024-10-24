import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import BlogDetail from './pages/BlogDetail';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/blogposts/:id" element={<BlogDetail />} />
      </Routes>
    </Router>
  );
};

export default App;

