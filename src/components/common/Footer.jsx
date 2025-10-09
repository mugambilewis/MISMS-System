import React from 'react'
import { Heart } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white border-t border-secondary-200 px-6 py-4">
      <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
        <div className="flex items-center space-x-2 text-sm text-secondary-600">
          <span>© {currentYear} School Management System</span>
          <span>•</span>
          <span>Made with</span>
          <Heart className="w-4 h-4 text-red-500" />
          <span>for education</span>
        </div>
        
        <div className="flex items-center space-x-4 text-sm text-secondary-600">
          <a href="#" className="hover:text-primary-600 transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-primary-600 transition-colors">
            Terms of Service
          </a>
          <a href="#" className="hover:text-primary-600 transition-colors">
            Support
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer

