import React from 'react'
import { BrowserRouter,Routes ,Route } from 'react-router-dom'
// import Login from '../components/Auth/Login/Login'
import CreateAccount from '../components/Auth/CreateAccount/CreateAccount'

const Routing = () => {
  return (
    <>
    <BrowserRouter>
    <Routes>
      {/* <Route path='/' element={<Login/>} /> */}
      <Route path='/signup' element={<CreateAccount/>} />
    </Routes>
    </BrowserRouter>
    </>
  )
}

export default Routing