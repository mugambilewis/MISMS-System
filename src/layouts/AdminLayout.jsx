import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/common/Header'
import Sidebar from '../components/common/Sidebar'
import Footer from '../components/common/Footer'

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  const closeSidebar = () => {
    setSidebarOpen(false)
  }

  return (
    <div className="min-h-screen bg-secondary-50">
      {/* Sidebar */}
      <Sidebar isOpen={sidebarOpen} onClose={closeSidebar} />
      
      {/* Main content */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Header */}
        <Header onMenuToggle={toggleSidebar} sidebarOpen={sidebarOpen} />
        
        {/* Page content */}
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
        
        {/* Footer */}
        <Footer />
      </div>
    </div>
  )
}

export default AdminLayout

