import React, { useState } from 'react'
import { 
  Bell, 
  Search, 
  User, 
  Settings, 
  LogOut, 
  Menu,
  Sun,
  Moon
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import { useRole } from '../../context/RoleContext'

const Header = ({ onMenuToggle, sidebarOpen }) => {
  const { userProfile, signOut } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const { roleDisplayName, roleColor } = useRole()
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)

  const handleSignOut = async () => {
    await signOut()
  }

  const notifications = [
    {
      id: 1,
      title: 'New student registration',
      message: 'John Doe has been registered',
      time: '2 minutes ago',
      unread: true
    },
    {
      id: 2,
      title: 'Payment received',
      message: 'Payment of ₦50,000 received from Jane Smith',
      time: '1 hour ago',
      unread: true
    },
    {
      id: 3,
      title: 'System maintenance',
      message: 'Scheduled maintenance tonight at 11 PM',
      time: '3 hours ago',
      unread: false
    }
  ]

  const unreadCount = notifications.filter(n => n.unread).length

  return (
    <header className="bg-white border-b border-secondary-200 px-4 py-3">
      <div className="flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="p-2 rounded-lg hover:bg-secondary-100 lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>
          
          <div className="hidden lg:block">
            <h1 className="text-xl font-semibold text-secondary-900">
              School Management System
            </h1>
          </div>
        </div>

        {/* Center - Search */}
        <div className="flex-1 max-w-md mx-4 hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-secondary-400" />
            <input
              type="text"
              placeholder="Search students, staff, classes..."
              className="w-full pl-10 pr-4 py-2 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center space-x-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg hover:bg-secondary-100"
            title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
          >
            {theme === 'light' ? (
              <Moon className="w-5 h-5" />
            ) : (
              <Sun className="w-5 h-5" />
            )}
          </button>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="p-2 rounded-lg hover:bg-secondary-100 relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Notifications dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                <div className="p-4 border-b border-secondary-200">
                  <h3 className="text-lg font-semibold text-secondary-900">
                    Notifications
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 border-b border-secondary-100 hover:bg-secondary-50 ${
                        notification.unread ? 'bg-blue-50' : ''
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-2 h-2 rounded-full mt-2 ${
                          notification.unread ? 'bg-blue-500' : 'bg-transparent'
                        }`} />
                        <div className="flex-1">
                          <h4 className="text-sm font-medium text-secondary-900">
                            {notification.title}
                          </h4>
                          <p className="text-sm text-secondary-600 mt-1">
                            {notification.message}
                          </p>
                          <p className="text-xs text-secondary-500 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-4 border-t border-secondary-200">
                  <button className="text-sm text-primary-600 hover:text-primary-700 font-medium">
                    View all notifications
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-lg hover:bg-secondary-100"
            >
              <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-primary-600" />
              </div>
              <div className="hidden md:block text-left">
                <p className="text-sm font-medium text-secondary-900">
                  {userProfile?.first_name} {userProfile?.last_name}
                </p>
                <p className="text-xs text-secondary-500">
                  {roleDisplayName}
                </p>
              </div>
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-secondary-200 z-50">
                <div className="p-4 border-b border-secondary-200">
                  <p className="text-sm font-medium text-secondary-900">
                    {userProfile?.first_name} {userProfile?.last_name}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {userProfile?.email}
                  </p>
                  <span className={`inline-block px-2 py-1 text-xs font-medium rounded-full mt-1 ${
                    roleColor === 'red' ? 'bg-red-100 text-red-800' :
                    roleColor === 'blue' ? 'bg-blue-100 text-blue-800' :
                    roleColor === 'green' ? 'bg-green-100 text-green-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {roleDisplayName}
                  </span>
                </div>
                <div className="py-1">
                  <button className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                    <User className="w-4 h-4 mr-3" />
                    Profile
                  </button>
                  <button className="flex items-center w-full px-4 py-2 text-sm text-secondary-700 hover:bg-secondary-50">
                    <Settings className="w-4 h-4 mr-3" />
                    Settings
                  </button>
                  <hr className="my-1" />
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                  >
                    <LogOut className="w-4 h-4 mr-3" />
                    Sign out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
