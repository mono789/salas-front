import React from 'react'
import Footer from './components/home/footer'
import Navbar from './components/home/navbar'
import Sidebar from './components/home/sidebar'
import Rooms from './components/home/rooms'

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
