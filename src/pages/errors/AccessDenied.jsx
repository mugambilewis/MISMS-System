import React from 'react'
import { Link } from 'react-router-dom'

const AccessDenied = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
        <p className="text-gray-600 mb-6">You don't have permission to view this page.</p>
        <Link to="/" className="text-blue-600 hover:text-blue-500 font-medium">Go home</Link>
      </div>
    </div>
  )
}

export default AccessDenied


