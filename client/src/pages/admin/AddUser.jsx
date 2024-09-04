import React, { useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import { useNavigate } from 'react-router-dom'

function AddUser() {
  const [ formData , setFormData ] = useState({
    username : "" ,
    email : "" , 
    password : ""
  })

  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData , [e.target.id] : e.target.value })
  }

  const handleSubmit = async(e) => {
    e.preventDefault()
    const res = await fetch("/api/admin/addUser" , {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
    })
    navigate('/admin/home')
  }
  return (
    <>
      <AdminHeader />
      <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">Add User</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          id="username"
          placeholder="Username"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="email"
          id="email"
          placeholder="Email"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="bg-slate-100 rounded-lg p-3"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
          Add User
        </button>
      </form>
    </div>
    </>
  )
}

export default AddUser
