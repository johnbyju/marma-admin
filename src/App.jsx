import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './index.css'
import CreateAccount from './components/Auth/CreateAccount/CreateAccount'
import Login from './components/Auth/Login/Login'
import CandidateDashboard from './components/JobList/Joblisting'
import EventDashboard from './components/event/Eventdashboard'
import Routing from './Routes/Routing'
import Root from './components/Auth/Root'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
    {/* <CreateAccount />
    <Login/>
    <CandidateDashboard/>
    <EventDashboard/> */}
    <BrowserRouter>
    <Root/>
    </BrowserRouter>
    </>
  )
}

export default App
