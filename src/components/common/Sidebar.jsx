import React from 'react'
import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  DollarSign,
  MessageSquare,
  Settings,
  FileText,
  UserCheck,
  BarChart3,
  Bell,
  Shield,
  ChevronRight
} from 'lucide-react'
import { useRole } from '../../context/RoleContext'

const Sidebar = ({ isOpen, onClose }) => {
  const { 
    canAccessDashboard,
    canAccessStudents,
    canAccessStaff,
    canAccessAcademics,
    canAccessFinance,
    canAccessMessaging,
    canAccessSystem,
    userRole
  } = useRole()

  const navigation = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: LayoutDashboard,
      canAccess: canAccessDashboard()
    },
    {
      name: 'Students',
      href: '/students',
      icon: Users,
      canAccess: canAccessStudents(),
      children: [
        { name: 'All Students', href: '/students' },
        { name: 'Add Student', href: '/students/add' },
        { name: 'Student Clearance', href: '/students/clearance' }
      ]
    },
    {
      name: 'Staff',
      href: '/staff',
      icon: UserCheck,
      canAccess: canAccessStaff(),
      children: [
        { name: 'All Staff', href: '/staff' },
        { name: 'Add Staff', href: '/staff/add' },
        { name: 'Staff Records', href: '/staff/records' }
      ]
    },
    {
      name: 'Academics',
      href: '/academics',
      icon: BookOpen,
      canAccess: canAccessAcademics(),
      children: [
        { name: 'Classes', href: '/academics/classes' },
        { name: 'Subjects', href: '/academics/subjects' },
        { name: 'Results', href: '/academics/results' },
        { name: 'Performance', href: '/academics/performance' }
      ]
    },
    {
      name: 'Finance',
      href: '/finance',
      icon: DollarSign,
      canAccess: canAccessFinance(),
      children: [
        { name: 'Fee Overview', href: '/finance/fees' },
        { name: 'Payments', href: '/finance/payments' },
        { name: 'Fee Structure', href: '/finance/structure' },
        { name: 'Reports', href: '/finance/reports' }
      ]
    },
    {
      name: 'Messaging',
      href: '/messaging',
      icon: MessageSquare,
      canAccess: canAccessMessaging(),
      children: [
        { name: 'Announcements', href: '/messaging/announcements' },
        { name: 'Messages', href: '/messaging/messages' },
        { name: 'Templates', href: '/messaging/templates' }
      ]
    },
    {
      name: 'System',
      href: '/system',
      icon: Settings,
      canAccess: canAccessSystem(),
      children: [
        { name: 'Settings', href: '/system/settings' },
        { name: 'Logs', href: '/system/logs' },
        { name: 'Approvals', href: '/system/approvals' }
      ]
    }
  ]

  const filteredNavigation = navigation.filter(item => item.canAccess)

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-secondary-200 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-secondary-200">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-white" />
              </div>
              <span className="text-lg font-semibold text-secondary-900">
                MIMS
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-lg hover:bg-secondary-100 lg:hidden"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
            {filteredNavigation.map((item) => (
              <div key={item.name}>
                <NavLink
                  to={item.href}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200 ${
                      isActive
                        ? 'bg-primary-100 text-primary-700'
                        : 'text-secondary-600 hover:bg-secondary-100 hover:text-secondary-900'
                    }`
                  }
                  onClick={onClose}
                >
                  <item.icon className="w-5 h-5 mr-3" />
                  {item.name}
                </NavLink>

                {/* Sub-navigation */}
                {item.children && (
                  <div className="ml-8 mt-1 space-y-1">
                    {item.children.map((child) => (
                      <NavLink
                        key={child.name}
                        to={child.href}
                        className={({ isActive }) =>
                          `block px-3 py-2 text-sm rounded-lg transition-colors duration-200 ${
                            isActive
                              ? 'bg-primary-50 text-primary-600'
                              : 'text-secondary-500 hover:bg-secondary-50 hover:text-secondary-700'
                          }`
                        }
                        onClick={onClose}
                      >
                        {child.name}
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* User info */}
          <div className="p-4 border-t border-secondary-200">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                <Users className="w-5 h-5 text-primary-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-secondary-900 truncate">
                  {userRole === 'admin' ? 'Administrator' : 
                   userRole === 'teacher' ? 'Teacher' :
                   userRole === 'bursar' ? 'Bursar' : 'Student'}
                </p>
                <p className="text-xs text-secondary-500 truncate">
                  {userRole?.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Sidebar
