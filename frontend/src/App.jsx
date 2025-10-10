import { useEffect, useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './pages/CharPage'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Explore from './pages/Explore'
import { Routes, Route, Navigate } from 'react-router-dom'
import {useAuthStore} from './store/useAuthstore'
import { Loader } from 'lucide-react'
import { Toaster } from 'react-hot-toast'
function App() {
  const{authUser,checkAuth,isCheckingAuth}=useAuthStore();
  useEffect(()=>{
    checkAuth();
  },[checkAuth]);
//console.log(authUser);
if(isCheckingAuth && !authUser){
  return <div className="flex justify-center items-center h-screen" >
    <Loader className='animate-spin' size={40} />
    </div>

} 
  return (
    <>

      <div>
        <Navbar/>
        <Routes>
          <Route path="/home" element={<Explore />} />
          <Route path='/' element={authUser ? <Homepage/> : <Navigate to="/login" />} />
          <Route path='/signup' element={<Signup/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />}/>
          <Route path='/settings' element={authUser ? <Settings/> : <Navigate to="/login" />}/>
        </Routes>
        <Toaster/>
      </div>
    </>
  )
}

export default App
