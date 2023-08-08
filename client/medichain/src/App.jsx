import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter, Route ,Routes ,Link} from "react-router-dom";
import PatientDashboard from "./components/Dashboards";
import {Login} from './components/login';

function App() {
  const [count, setCount] = useState(0)

  return (
      <div className="wrapper">
      <h1 className='text-yellow'>Application</h1>
      {/* <Login/> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element = {<Login />}></Route>
          <Route path="/dashboard" element = {<PatientDashboard />}>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App
