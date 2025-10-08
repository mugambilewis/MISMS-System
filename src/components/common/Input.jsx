import React, { forwardRef } from 'react'

const Input = forwardRef(({
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  type = 'text',
  placeholder,
  value,
  onChange,
  onBlur,
  className = '',
  inputClassName = '',
  labelClassName = '',
  leftIcon = null,
  rightIcon = null,
  ...props
}, ref) => {
  const baseInputClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200'
  
  const inputClasses = error
    ? `${baseInputClasses} border-red-300 focus:ring-red-500 focus:border-red-500`
    : `${baseInputClasses} border-secondary-300 focus:ring-primary-500 focus:border-primary-500`

  const disabledClasses = disabled ? 'bg-secondary-50 cursor-not-allowed' : 'bg-white'

  const finalInputClasses = `${inputClasses} ${disabledClasses} ${inputClassName}`

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className={`block text-sm font-medium text-secondary-700 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <span className="text-secondary-400 text-sm">
              {leftIcon}
            </span>
          </div>
        )}
        
        <input
          ref={ref}
          type={type}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          disabled={disabled}
          className={`${finalInputClasses} ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''}`}
          {...props}
        />
        
        {rightIcon && (
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <span className="text-secondary-400 text-sm">
              {rightIcon}
            </span>
          </div>
        )}
      </div>
      
      {error && (
        <p className="text-sm text-red-600">
          {error}
        </p>
      )}
      
      {helperText && !error && (
        <p className="text-sm text-secondary-500">
          {helperText}
        </p>
      )}
    </div>
  )
})

Input.displayName = 'Input'

export default Input
