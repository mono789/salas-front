import React from 'react'
import Navbar from '../components/home/navbar'
import Footer from '../components/home/footer'
import Description from './description'
import Form from './form'

const Page = () => {
return (
    <div>
        <Navbar />
        <div className="flex justify-center items-start">
            <Form />
            <Description />
        </div>
        <Footer />
    </div>
)
}

export default Page
