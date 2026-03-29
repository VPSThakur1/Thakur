import React from 'react'
import {Routes, Route} from 'react-router-dom'
import Start from './pages/Start'
import Userlogin from './pages/Userlogin'
import UserSignup from './pages/UserSignup'
import CaptainSignup from './pages/CaptainSignup'
import Captainlogin from './pages/Captainlogin'
import Home from './pages/Home'
import UserProtectedWrapper from './pages/UserProtectedWrapper'
import UserLogout from './pages/UserLogout'
import CaptainHome from './pages/CaptainHome'
import CaptainProtectedWrapper from './pages/CaptainProtectedWrapper'
import Riding from './pages/Riding'
import CaptainRiding from './pages/CaptainRiding'


const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Start />}/>
        <Route path='/riding' element={<Riding />}/>
        <Route path='/user-login' element={<Userlogin />}/>
        <Route path='/user-signup' element={<UserSignup />}/>
        <Route path='/captain-signup' element={<CaptainSignup />}/>
        <Route path='/captain-login' element={<Captainlogin />}/>
        <Route path='/captain-riding' element={<CaptainRiding />}/>
        <Route path='/home' element={
          <UserProtectedWrapper>
            <Home />
          </UserProtectedWrapper>
        }/>
        <Route path='/users/logout' element={
          <UserProtectedWrapper>
            <UserLogout />
          </UserProtectedWrapper>
        }/>
        <Route path='/captain-home' element= {
          <CaptainProtectedWrapper>
            <CaptainHome />
          </CaptainProtectedWrapper>
        }/>
      </Routes>
    </div>
  )
}

export default App