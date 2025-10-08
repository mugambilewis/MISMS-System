import React from 'react'
import { Outlet } from 'react-router-dom'
import { GraduationCap } from 'lucide-react'

const AuthLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 to-secondary-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
        </div>
        
        <h2 className="mt-6 text-center text-3xl font-bold text-secondary-900">
          School Management System
        </h2>
        <p className="mt-2 text-center text-sm text-secondary-600">
          Welcome back! Please sign in to your account
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow-lg sm:rounded-lg sm:px-10">
          <Outlet />
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-secondary-500">
          © {new Date().getFullYear()} School Management System. All rights reserved.
        </p>
      </div>
    </div>
  )
}

export default AuthLayout
