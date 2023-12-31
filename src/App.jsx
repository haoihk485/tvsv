import { Routes, Route } from 'react-router-dom'
import Login from './page/Login'
import Register from './page/Register'
import Home from './page/Home'
import User from './page/admin/User'
import AdminHome from './page/admin/Home'
import Department from './page/admin/Department'
import Field from './page/admin/Field'
import Admin from './page/admin/Admin'
import Test from './page/Test'
import DepartmentHead from './page/departmentHead/DepartmentHead'
import Counsellor from './page/departmentHead/Counsellor'
import DepartmentField from './page/departmentHead/Field'
import Question from './page/departmentHead/Question'
function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/test' element={<Test />} />


        <Route path='/admin' element={<Admin />}>
          <Route path='departments' element={<Department />} />
          <Route path='users' element={<User />} />
          <Route path='fields' element={<Field />} />
          <Route path='home' element={<AdminHome />} />
        </Route>
        <Route path='/departmentHead' element={<DepartmentHead />}>
          <Route path='counsellors' element={<Counsellor />} />
          <Route path='fields' element={<DepartmentField />} />
          <Route path='questions' element={<Question />} />
          <Route path='departments' element={<Department />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
