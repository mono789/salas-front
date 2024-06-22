import React from 'react';
import Navbar from '../home/navbar';
import Sidebar from '../home/sidebar';
import List from './list';
import Footer from '../home/footer';

const Page = () => {
  return (
    <div>
      <Navbar />
      <div style={{ display: 'flex'}}>
        <Sidebar />
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <div style={{ textAlign: 'justify' }}>
            <List />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Page;

