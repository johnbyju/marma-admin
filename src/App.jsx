import { useState } from 'react'
import viteLogo from '/vite.svg'
import './index.css'
import CreateAccount from './components/Auth/CreateAccount/CreateAccount'
import Login from './components/Auth/Login/Login'
import CandidateDashboard from './components/JobList/Joblisting'
import Root from './components/Auth/Root'
import { BrowserRouter } from 'react-router-dom'

function App() {

  return (
    <>
    <BrowserRouter>
    <Root/>
    </BrowserRouter>
    </>
  )
}

export default App
