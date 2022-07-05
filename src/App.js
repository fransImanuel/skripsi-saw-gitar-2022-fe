import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import LandingRoute from './routes/LandingRoute';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ChooseRoute from './routes/ChooseRoute';
import ResultPage from './routes/ResultPageRoute';
import AllResultPage from './routes/AllResultPageRoute';
import LoginRoute from './routes/LoginRoute';
import AdminRoute from './routes/AdminRoute';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route Route path = "/" element = {< LandingRoute />} />
        <Route Route path = "/chooseguitar"  element = {< ChooseRoute />} />
        <Route Route path = "/resultguitar"  element = {< ResultPage />} />
        <Route Route path = "/allguitar"  element = {< AllResultPage />} />
        <Route Route path = "/login"  element = {< LoginRoute />} />
        <Route Route path = "/adminpage"  element = {< AdminRoute />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
