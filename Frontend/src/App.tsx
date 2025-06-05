// import { useState } from 'react'
import { Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import Send from "./pages/Send";

import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (

    <div className="bg-gray-100 flex flex-col items-center w-screen h-screen">
      {/* <Navbar/> */}
      <Routes>
         <Route index element={<Signup/>}/>
         <Route path="/signin" element={<Signin/>}/>
         <Route path="/dashboard" element={<Dashboard/>}/>
         <Route path="/send" element={<Send/>} />
      </Routes>

    </div>

  )
}

export default App
