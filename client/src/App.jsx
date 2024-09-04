import { BrowserRouter , Routes , Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Profile from './pages/Profile'
import PrivateRoute from './components/PrivateRoute'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Login from './pages/admin/Login'
import AdminPrivateRoute from './components/AdminPrivateRoute'
import AdminHome from './pages/admin/AdminHome'
import AddUser from './pages/admin/AddUser'
import EditUser from './pages/admin/EditUser'

function App() {
  return (
    <BrowserRouter>
      <ToastContainer />
      
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/sign-in" element={<Signin />} />
        <Route path="/sign-up" element={<Signup />} />
        <Route element={<PrivateRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>
        <Route path='/admin' element={<Login />} />
        <Route element={<AdminPrivateRoute />} >
          <Route path='/admin/home' element={<AdminHome />} />
          <Route path='/admin/addUser' element={<AddUser />} />
          <Route path='/admin/editUser/:id' element={<EditUser />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App
