import React, { forwardRef } from 'react'

const Select = forwardRef(({
  label,
  error,
  helperText,
  required = false,
  disabled = false,
  placeholder = 'Select an option',
  value,
  onChange,
  onBlur,
  options = [],
  className = '',
  selectClassName = '',
  labelClassName = '',
  ...props
}, ref) => {
  const baseSelectClasses = 'w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors duration-200 appearance-none bg-white'
  
  const selectClasses = error
    ? `${baseSelectClasses} border-red-300 focus:ring-red-500 focus:border-red-500`
    : `${baseSelectClasses} border-secondary-300 focus:ring-primary-500 focus:border-primary-500`

  const disabledClasses = disabled ? 'bg-secondary-50 cursor-not-allowed' : ''

  const finalSelectClasses = `${selectClasses} ${disabledClasses} ${selectClassName}`

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className={`block text-sm font-medium text-secondary-700 ${labelClassName}`}>
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          disabled={disabled}
          className={finalSelectClasses}
          {...props}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        
        {/* Custom dropdown arrow */}
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <svg className="w-5 h-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
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

Select.displayName = 'Select'

export default Select
