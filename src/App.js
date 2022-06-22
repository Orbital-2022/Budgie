import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SummaryPage from "./pages/SummaryPage";
import SettingPage from "./pages/SettingPage";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path= "/profile" element ={<ProfilePage/>}/>
          <Route path= "/summary" element ={<SummaryPage/>}/> 
          <Route path= "/setting" element ={<SettingPage/>}/> 
        </Routes>
      </Router>
  );
}

export default App;
