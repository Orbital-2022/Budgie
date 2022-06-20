import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SummaryPage from "./pages/SummaryPage";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path= "/profile" element ={<ProfilePage/>}/>
          <Route path= "/summary" element ={<SummaryPage/>}/> 
        </Routes>
      </Router>
  );
}

export default App;
