import { useState } from 'react'
import './App.css'
import {HashRouter, Route, Routes} from "react-router-dom";
import LoginPage from "./components/LoginPage.jsx";
import Dashboard from "./components/Dashboard.jsx";

function App() {




    return (
    <>
        <HashRouter>
          <Routes>
              <Route path="/" element={<LoginPage/>} />
              <Route path="/dashboard" element={<Dashboard/>} />
          </Routes>
        </HashRouter>
    </>
  )
}

export default App
