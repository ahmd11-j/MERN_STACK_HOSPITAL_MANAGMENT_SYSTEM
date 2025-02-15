
import { useContext, useEffect } from 'react'
import "./App.css"
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Home from "./pages/Home";
import Appointment from "./pages/Appointment";
import AboutUs from "./pages/AboutUs";
import Register from "./pages/Register";
import Login from "./pages/Login";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from "./components/Navbar";
import { Context } from './main';
import axios from 'axios';

const App = () => {
  const {isAuthenticated, setisAuthenticated, setUser} = useContext(Context);
  useEffect(()=>{
    const fetchUser = async()=>{
      try {
        const response = await axios.get("http://Localhost:4000/api/v1/user/patient/me",{withCredentials: true});
        setisAuthenticated(true);
        setUser(response.data.user);
      }catch(error){
        setisAuthenticated(false);
        setUser({});

      }
    };
    fetchUser();
  }, [isAuthenticated]);
  return (
    <>
    <Router>
      <Navbar></Navbar>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/appointment' element={<Appointment/>} />
        <Route path='/aboutus' element={<AboutUs/>} />
        <Route path='/register' element={<Register/>} />
        <Route path='/login' element={<Login/>} />
      </Routes>
      <ToastContainer position='top-center' ></ToastContainer>
    </Router>
    </>
  )
}

export default App
