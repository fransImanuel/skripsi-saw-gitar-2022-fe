import React, {useEffect} from 'react';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';

export default function LoginRoute() {
  let navigate = useNavigate();
  let loginInfo = JSON.parse(sessionStorage.getItem("adminlogin"));
  
  useEffect(() => {
    if (loginInfo) {
      navigate('/adminpage')
    }
  },[])

  return (
    <div  >
      <Navbar/>
      <LoginForm/>
    </div>
  );
}