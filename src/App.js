import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Routes>
      </Router>
  );
}

export default App;
