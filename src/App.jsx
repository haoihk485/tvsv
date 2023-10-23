import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import Home from './page/Home'
import AdminHome from './page/admin/Home'
import Department from './page/admin/Department'
import User from './page/admin/User'
function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path='/admin' element={<AdminHome />} />
        <Route path='/admin/departments' element={<Department />} />
        <Route path='/admin/user' element={<User />} />
      </Routes>
    </>
  )
}

export default App
