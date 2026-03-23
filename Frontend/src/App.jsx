import React, { useEffect } from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './pages/Homepage.jsx'
import Signuppage from './pages/Signuppage.jsx'
import Loginpage from './pages/Loginpage.jsx'
import Settingpage from './pages/Settingpage.jsx'
import Profilepage from './pages/Profilepage.jsx'
import { useAuthStore } from './Store/useAuthStore.js'
import {Loader} from "lucide-react"
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './Store/useThemeStore.js'
const App = () => {

  const {authUser,checkAuth,isCheckingAuth,onlineUsers}=useAuthStore()
  const {theme}=useThemeStore()

  console.log({onlineUsers})
  useEffect(()=>{
    checkAuth()
  },[checkAuth])

  console.log({authUser})
  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin"/>
    </div>
  )
  return (
    <div data-theme={theme}>

      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <Homepage />:<Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signuppage/> : <Navigate to="/" />} />
        <Route path='/login' element={!authUser ? <Loginpage /> :<Navigate to="/" /> } />
        <Route path='/setting' element={<Settingpage />} />
        <Route path='/profile' element={authUser ? <Profilepage />:<Navigate to="/login" />} />
      </Routes>


    <Toaster/>
    </div>
  )
}

export default App
