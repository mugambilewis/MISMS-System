import React from 'react'
import { Loader2 } from 'lucide-react'

const Button = ({
  type = 'button',
  variant = 'primary',
  size = 'md',
  loading = false,
  className = '',
  children,
  ...props
}) => {
  const base =
    'inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2'
  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-100 text-gray-800 hover:bg-gray-200 focus:ring-gray-300',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-5 py-2.5 text-lg',
  }

  return (
    <button
      type={type}
      disabled={loading}
      className={`${base} ${variants[variant]} ${sizes[size]} ${className} ${
        loading ? 'opacity-70 cursor-not-allowed' : ''
      }`}
      {...props}
    >
      {loading && <Loader2 className="animate-spin w-5 h-5 mr-2" />}
      {children}
    </button>
  )
}

export default Button

