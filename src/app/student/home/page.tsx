import React from 'react'
import Navbar from './navbar'
import Sidebar from './sidebar'
import Rooms from './rooms'

const Page = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Rooms />
      </div>
      
    </div>
  )
}

export default Page