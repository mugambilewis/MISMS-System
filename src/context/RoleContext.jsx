import React, { createContext, useContext } from 'react'
import { useAuth } from './AuthContext'
import { PERMISSIONS, ROLE_PERMISSIONS } from '../lib/supabaseClient'

const RoleContext = createContext({})

export const useRole = () => {
  const context = useContext(RoleContext)
  if (!context) {
    throw new Error('useRole must be used within a RoleProvider')
  }
  return context
}

export const RoleProvider = ({ children }) => {
  const { userProfile } = useAuth()

  const hasPermission = (permission) => {
    if (!userProfile?.role) return false
    return ROLE_PERMISSIONS[userProfile.role]?.includes(permission) || false
  }

  const hasAnyPermission = (permissions) => {
    if (!userProfile?.role) return false
    return permissions.some(permission => hasPermission(permission))
  }

  const hasAllPermissions = (permissions) => {
    if (!userProfile?.role) return false
    return permissions.every(permission => hasPermission(permission))
  }

  const canManageUsers = () => {
    return hasPermission(PERMISSIONS.MANAGE_USERS)
  }

  const canManageSystem = () => {
    return hasPermission(PERMISSIONS.MANAGE_SYSTEM)
  }

  const canViewAllData = () => {
    return hasPermission(PERMISSIONS.VIEW_ALL_DATA)
  }

  const canApproveActions = () => {
    return hasPermission(PERMISSIONS.APPROVE_ACTIONS)
  }

  const canManageClasses = () => {
    return hasPermission(PERMISSIONS.MANAGE_CLASSES)
  }

  const canUploadResults = () => {
    return hasPermission(PERMISSIONS.UPLOAD_RESULTS)
  }

  const canViewStudentRecords = () => {
    return hasPermission(PERMISSIONS.VIEW_STUDENT_RECORDS)
  }

  const canManageFees = () => {
    return hasPermission(PERMISSIONS.MANAGE_FEES)
  }

  const canProcessPayments = () => {
    return hasPermission(PERMISSIONS.PROCESS_PAYMENTS)
  }

  const canViewFinancialReports = () => {
    return hasPermission(PERMISSIONS.VIEW_FINANCIAL_REPORTS)
  }

  const canViewOwnRecords = () => {
    return hasPermission(PERMISSIONS.VIEW_OWN_RECORDS)
  }

  const canViewResults = () => {
    return hasPermission(PERMISSIONS.VIEW_RESULTS)
  }

  // Role-based access control for different modules
  const canAccessDashboard = () => {
    return userProfile?.role && ['admin', 'teacher', 'bursar', 'student'].includes(userProfile.role)
  }

  const canAccessStudents = () => {
    return hasAnyPermission([
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.VIEW_STUDENT_RECORDS,
      PERMISSIONS.VIEW_OWN_RECORDS
    ])
  }

  const canAccessStaff = () => {
    return hasPermission(PERMISSIONS.MANAGE_USERS)
  }

  const canAccessAcademics = () => {
    return hasAnyPermission([
      PERMISSIONS.MANAGE_CLASSES,
      PERMISSIONS.UPLOAD_RESULTS,
      PERMISSIONS.VIEW_STUDENT_RECORDS
    ])
  }

  const canAccessFinance = () => {
    return hasAnyPermission([
      PERMISSIONS.MANAGE_FEES,
      PERMISSIONS.PROCESS_PAYMENTS,
      PERMISSIONS.VIEW_FINANCIAL_REPORTS
    ])
  }

  const canAccessMessaging = () => {
    return hasAnyPermission([
      PERMISSIONS.MANAGE_USERS,
      PERMISSIONS.VIEW_STUDENT_RECORDS
    ])
  }

  const canAccessSystem = () => {
    return hasPermission(PERMISSIONS.MANAGE_SYSTEM)
  }

  // Get user's role display name
  const getRoleDisplayName = () => {
    if (!userProfile?.role) return 'Unknown'
    
    const roleNames = {
      admin: 'Administrator',
      teacher: 'Teacher',
      bursar: 'Bursar',
      student: 'Student'
    }
    
    return roleNames[userProfile.role] || userProfile.role
  }

  // Get user's role color for UI
  const getRoleColor = () => {
    if (!userProfile?.role) return 'gray'
    
    const roleColors = {
      admin: 'red',
      teacher: 'blue',
      bursar: 'green',
      student: 'purple'
    }
    
    return roleColors[userProfile.role] || 'gray'
  }

  const value = {
    userRole: userProfile?.role,
    roleDisplayName: getRoleDisplayName(),
    roleColor: getRoleColor(),
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    
    // Specific permission checks
    canManageUsers,
    canManageSystem,
    canViewAllData,
    canApproveActions,
    canManageClasses,
    canUploadResults,
    canViewStudentRecords,
    canManageFees,
    canProcessPayments,
    canViewFinancialReports,
    canViewOwnRecords,
    canViewResults,
    
    // Module access checks
    canAccessDashboard,
    canAccessStudents,
    canAccessStaff,
    canAccessAcademics,
    canAccessFinance,
    canAccessMessaging,
    canAccessSystem
  }

  return (
    <RoleContext.Provider value={value}>
      {children}
    </RoleContext.Provider>
  )
}

