import React, { useEffect, useState } from 'react'
import AdminHeader from '../../components/AdminHeader'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'

const EditUser = () => {
  const [ username , setUsername ] = useState('')
  const [ email , setEmail ] = useState('')

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect( () => {
    axios.get(`/api/admin/editUser/${id}`)
      .then((res) => {
        setUsername(res.data.username)
        setEmail(res.data.email)
      })
      .catch((err) => {
        console.log(err)       
      })
  } ,[id])

  const handleSubmit = async(e) => {
    e.preventDefault()
    axios.post(`/api/admin/editUser/${id}` , {username , email})
    .then((res) => {
      if(res.data.success) {
        navigate('/admin/home')
      }
    })
    .catch((err)=>{
      console.log(err);
      
    })
  }

  return (
    <>
    <AdminHeader />
    <div className="p-3 max-w-lg mx-auto">
    <h1 className="text-3xl font-semibold text-center my-7">Edit User</h1>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        value={username}
        type="text"
        id="username"
        placeholder="Username"
        className="bg-slate-100 rounded-lg p-3"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        value={email}
        type="email"
        id="email"
        placeholder="Email"
        className="bg-slate-100 rounded-lg p-3"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80">
        Edit User
      </button>
    </form>
  </div>
  </>

  )
}

export default EditUser
