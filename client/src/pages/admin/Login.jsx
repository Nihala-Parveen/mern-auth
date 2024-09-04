import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector , useDispatch } from 'react-redux'
import { adminLogin, adminLoginFailure } from '../../redux/admin/adminSlice.js'
import AdminHeader from '../../components/AdminHeader.jsx'

const Login = () => {
  const [ formData , setFormData ] = useState({})
  const [ error , setError ] = useState('')

  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const { admin , isLogged } = useSelector((state) => state.admin)

  useEffect(() => {
    if(isLogged) {        
        navigate("/admin/home")
    }
  } , [] )

  const handleChange = (e) => {
    setFormData({ ...formData , [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
        const res = await fetch("/api/admin/login" , {
            method : "POST" ,
            headers : {
                "Content-Type": "application/json"
            } ,
            body : JSON.stringify(formData)
        })
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
    
        // Safely parse the response
        const text = await res.text();
        const data = text ? JSON.parse(text) : {};

        dispatch(adminLogin(data))
        
        if(data.success === false) {
            dispatch(adminLoginFailure(data))
            return
        }
        navigate("/admin/home")
    } catch (error) {
        console.log(error);
        
        dispatch(adminLoginFailure(error))
    }
  }

  return (
    <>
      <AdminHeader />
      <div className="p-3 max-w-lg mx-auto">
        <h1 className="text-3xl text-center font-semibold my-7">
          Admin Sign In
        </h1>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="string"
            placeholder="Name"
            id="name"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="bg-slate-100 p-3 rounded-lg"
            onChange={handleChange}
          />
          <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
            Sign In
          </button>
        </form>
      </div>
    </>
  );
}

export default Login
