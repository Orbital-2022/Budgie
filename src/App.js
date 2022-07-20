import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MainPage from "./pages/MainPage";
import ProfilePage from "./pages/ProfilePage";
import SummaryPage from "./pages/SummaryPage";
import SettingPage from "./pages/SettingPage";
import IncomePage from "./pages/IncomePage";
import IncomeSummary from "./pages/IncomeSummary";

function App() {

  return (
      <Router>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/mainpage" element={<MainPage />} />
          <Route path="/incomepage" element={<IncomePage />} />
          <Route path= "/profile" element ={<ProfilePage/>}/>
          <Route path= "/summary" element ={<SummaryPage/>}/> 
          <Route path= "/incomesummary" element ={<IncomeSummary/>}/> 
          <Route path= "/setting" element ={<SettingPage/>}/> 
        </Routes>
      </Router>
  );
}

export default App;
