import React from "react";
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from"./pages/RegisterPage"



function App(){
  return(
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage/>}></Route>
        <Route path="/register" element={<RegisterPage/>}></Route>
        <Route path="/home" element={<HomePage/>}></Route>
      </Routes>
    </Router>
  )
}

export default App;