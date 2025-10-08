import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import { RoleProvider } from './context/RoleContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute from './routes/ProtectedRoute'
import RoleBasedAccess from './routes/RoleBasedAccess'

// Layouts
import AdminLayout from './layouts/AdminLayout'
import AuthLayout from './layouts/AuthLayout'
import BlankLayout from './layouts/BlankLayout'

// Pages
import LoginForm from './pages/auth/LoginForm'
import Dashboard from './pages/dashboard/Dashboard'
import NotFound from './pages/errors/NotFound'

// Student Management
import StudentList from './pages/students/StudentList'
import AddStudent from './pages/students/AddStudent'
import StudentProfile from './pages/students/StudentProfile'

// Staff Management
import StaffList from './pages/staff/StaffList'
import AddStaff from './pages/staff/AddStaff'

// Academic Management
import Classes from './pages/academics/Classes'
import Subjects from './pages/academics/Subjects'
import Results from './pages/academics/Results'

// Financial Management
import FeeOverview from './pages/finance/FeeOverview'
import Payments from './pages/finance/Payments'

// Messaging
import Announcements from './pages/messaging/Announcements'
import Messages from './pages/messaging/Messages'

// System
import Settings from './pages/system/Settings'
import Logs from './pages/system/Logs'

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <RoleProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={
              <AuthLayout>
                <LoginForm />
              </AuthLayout>
            } />
            
            {/* Protected routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <AdminLayout>
                  <Routes>
                    {/* Dashboard */}
                    <Route index element={<Navigate to="/dashboard" replace />} />
                    <Route path="dashboard" element={<Dashboard />} />
                    
                    {/* Student Management */}
                    <Route path="students" element={
                      <RoleBasedAccess requiredPermissions={['view_student_records', 'manage_users']}>
                        <StudentList />
                      </RoleBasedAccess>
                    } />
                    <Route path="students/add" element={
                      <RoleBasedAccess requiredPermissions={['manage_users']}>
                        <AddStudent />
                      </RoleBasedAccess>
                    } />
                    <Route path="students/:id" element={
                      <RoleBasedAccess requiredPermissions={['view_student_records', 'manage_users']}>
                        <StudentProfile />
                      </RoleBasedAccess>
                    } />
                    
                    {/* Staff Management */}
                    <Route path="staff" element={
                      <RoleBasedAccess requiredPermissions={['manage_users']}>
                        <StaffList />
                      </RoleBasedAccess>
                    } />
                    <Route path="staff/add" element={
                      <RoleBasedAccess requiredPermissions={['manage_users']}>
                        <AddStaff />
                      </RoleBasedAccess>
                    } />
                    
                    {/* Academic Management */}
                    <Route path="academics/classes" element={
                      <RoleBasedAccess requiredPermissions={['manage_classes']}>
                        <Classes />
                      </RoleBasedAccess>
                    } />
                    <Route path="academics/subjects" element={
                      <RoleBasedAccess requiredPermissions={['manage_classes']}>
                        <Subjects />
                      </RoleBasedAccess>
                    } />
                    <Route path="academics/results" element={
                      <RoleBasedAccess requiredPermissions={['upload_results', 'view_student_records']}>
                        <Results />
                      </RoleBasedAccess>
                    } />
                    
                    {/* Financial Management */}
                    <Route path="finance/fees" element={
                      <RoleBasedAccess requiredPermissions={['manage_fees', 'view_financial_reports']}>
                        <FeeOverview />
                      </RoleBasedAccess>
                    } />
                    <Route path="finance/payments" element={
                      <RoleBasedAccess requiredPermissions={['process_payments', 'view_financial_reports']}>
                        <Payments />
                      </RoleBasedAccess>
                    } />
                    
                    {/* Messaging */}
                    <Route path="messaging/announcements" element={
                      <RoleBasedAccess requiredPermissions={['view_student_records', 'manage_users']}>
                        <Announcements />
                      </RoleBasedAccess>
                    } />
                    <Route path="messaging/messages" element={
                      <RoleBasedAccess requiredPermissions={['view_student_records', 'manage_users']}>
                        <Messages />
                      </RoleBasedAccess>
                    } />
                    
                    {/* System */}
                    <Route path="system/settings" element={
                      <RoleBasedAccess requiredPermissions={['manage_system']}>
                        <Settings />
                      </RoleBasedAccess>
                    } />
                    <Route path="system/logs" element={
                      <RoleBasedAccess requiredPermissions={['manage_system']}>
                        <Logs />
                      </RoleBasedAccess>
                    } />
                  </Routes>
                </AdminLayout>
              </ProtectedRoute>
            } />
            
            {/* Error routes */}
            <Route path="*" element={
              <BlankLayout>
                <NotFound />
              </BlankLayout>
            } />
          </Routes>
        </RoleProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}

export default App
