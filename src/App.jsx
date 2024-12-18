import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Discover from './pages/Discover';
import Detail from './pages/Detail';
import Results from './pages/Results';

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="/discover" element={<Discover />}></Route>
        <Route path="/results" element={<Results />}></Route>
        <Route path="/detail/:id" element={<Detail />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
