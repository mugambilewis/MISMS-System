import React from 'react'
import { Navigate } from 'react-router-dom'
import { useRole } from '../context/RoleContext'
import { useAuth } from '../context/AuthContext'
import LoadingSpinner from '../components/common/LoadingSpinner'

const RoleBasedAccess = ({ 
  children, 
  requiredPermissions = [], 
  requiredRole = null,
  fallbackPath = '/dashboard',
  showUnauthorized = false 
}) => {
  const { hasAnyPermission, userRole } = useRole()
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  // Check role-based access
  if (requiredRole && userRole !== requiredRole) {
    if (showUnauthorized) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have permission to access this page.
            </p>
            <Navigate to={fallbackPath} replace />
          </div>
        </div>
      )
    }
    return <Navigate to={fallbackPath} replace />
  }

  // Check permission-based access
  if (requiredPermissions.length > 0 && !hasAnyPermission(requiredPermissions)) {
    if (showUnauthorized) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h1>
            <p className="text-gray-600 mb-4">
              You don't have the required permissions to access this page.
            </p>
            <Navigate to={fallbackPath} replace />
          </div>
        </div>
      )
    }
    return <Navigate to={fallbackPath} replace />
  }

  return children
}

// Higher-order component for role-based access
export const withRoleAccess = (Component, options = {}) => {
  return (props) => (
    <RoleBasedAccess {...options}>
      <Component {...props} />
    </RoleBasedAccess>
  )
}

// Specific role-based components
export const AdminOnly = ({ children }) => (
  <RoleBasedAccess requiredRole="admin" fallbackPath="/dashboard">
    {children}
  </RoleBasedAccess>
)

export const TeacherOnly = ({ children }) => (
  <RoleBasedAccess requiredRole="teacher" fallbackPath="/dashboard">
    {children}
  </RoleBasedAccess>
)

export const BursarOnly = ({ children }) => (
  <RoleBasedAccess requiredRole="bursar" fallbackPath="/dashboard">
    {children}
  </RoleBasedAccess>
)

export const StudentOnly = ({ children }) => (
  <RoleBasedAccess requiredRole="student" fallbackPath="/dashboard">
    {children}
  </RoleBasedAccess>
)

export default RoleBasedAccess

