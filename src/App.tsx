import {useEffect, useState} from 'react';
import './App.css';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";

import Login from './containers/Login';
import MainPage from './containers/MainPage';
import Detail from './containers/Detail';

import Navbar from './components/Navbar';

import TicketProvider from './context/ticketContext'

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [flagNav, setFlagNav]= useState(false);
  let user:any = localStorage.getItem("user")||'';
  
  useEffect(() => {
    if (user !== '') {
      user = JSON.parse(user);
    } else {
      navigate("/login");
    }
    if (user !== "test@vroom.com.au") navigate("/login");
    if (location.pathname === "/login") setFlagNav(false);
    else setFlagNav(true);
 },[navigate]);

 useEffect(()=>{
    if (user === "test@vroom.com.au") navigate(location.pathname);
    if(location.pathname === "/login") navigate('/');
 },[])

  return (
    <TicketProvider>
      {flagNav ? <Navbar/>:''}
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainPage />} />
        <Route path='/ticket/:ticketid' element={<Detail />} />
      </Routes>
    </TicketProvider>
  );
}

export default App;
