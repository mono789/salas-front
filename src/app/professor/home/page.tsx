import React from 'react'
import Footer from './footer'
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
      <Footer />
    </div>
  )
}

export default Page