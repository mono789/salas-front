import React from 'react'
import Sidebar from './sidebar'
import Rooms from './rooms'

const Page = () => {
  return (
    <div>
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <Rooms />
      </div>

    </div>
  )
}

export default Page