import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import CreateAccount from './components/Auth/CreateAccount/CreateAccount'
import Login from './components/Auth/Login/Login'
import CandidateDashboard from './components/JobList/Joblisting'

function App() {

  return (
    <>
    <CreateAccount />
    <Login/>
    {/* <CandidateDashboard/> */}
    </>
  )
}

export default App
