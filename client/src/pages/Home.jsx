import React from 'react'
import Header from '../components/Header'

const Home = () => {
  return (
    <>
    <Header />
      <div>
        <div className="flex justify-center items-center h-screen" style={{ backgroundImage: 'url("http://www.pixelstalk.net/wp-content/uploads/2016/06/Light-Blue-HD-Backgrounds-Free-Download.jpg")' }}>
        <p className="text-center font-bold text-4xl text-slate-700">Welcome to MERN User Management app</p>
        </div>
      </div>
    </>
  )
}

export default Home
