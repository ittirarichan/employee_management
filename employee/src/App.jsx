import React from 'react';
import { BrowserRouter,Routes,Route } from 'react-router-dom'
import EmpList from './Components/EmpList';
import AddEmp from './Components/AddEmp';
import './App.css'
import Layout from './Components/Nav';
import About from './Components/About';

function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route Path='/' element={<Layout/>} >
      <Route index element={<EmpList/>}/>
      <Route Path='addemp' element={<AddEmp/>}/>
      <Route path='add' element={<About/>}/>

      </Route>
    </Routes>
    </BrowserRouter>
    {/* <AddEmp/> */}

    </>
  )
}

export default App
