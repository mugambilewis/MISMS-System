import React from 'react'

const Input = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  error,
  leftIcon,
  rightIcon,
  placeholder,
  required
}) => {
  return (
    <div>
      {label && (
        <label htmlFor={name} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            {leftIcon}
          </div>
        )}

        <input
          id={name}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`block w-full rounded-lg border ${
            error ? 'border-red-500' : 'border-gray-300'
          } px-3 py-2 pl-${leftIcon ? '10' : '3'} pr-${rightIcon ? '10' : '3'} text-gray-900 
          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition`}
        />

        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            {rightIcon}
          </div>
        )}
      </div>

      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  )
}

export default Input

