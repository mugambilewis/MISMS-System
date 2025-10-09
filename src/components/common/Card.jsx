import React from 'react'

const Card = ({
  children,
  title,
  subtitle,
  headerActions,
  className = '',
  headerClassName = '',
  bodyClassName = '',
  footer,
  footerClassName = '',
  padding = 'default',
  shadow = 'sm',
  border = true,
  ...props
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-4',
    default: 'p-6',
    lg: 'p-8'
  }

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl'
  }

  const borderClasses = border ? 'border border-secondary-200' : ''

  const cardClasses = `bg-white rounded-lg ${shadowClasses[shadow]} ${borderClasses} ${className}`
  const headerClasses = `px-6 py-4 border-b border-secondary-200 ${headerClassName}`
  const bodyClasses = `${paddingClasses[padding]} ${bodyClassName}`
  const footerClasses = `px-6 py-4 border-t border-secondary-200 ${footerClassName}`

  return (
    <div className={cardClasses} {...props}>
      {(title || subtitle || headerActions) && (
        <div className={headerClasses}>
          <div className="flex items-center justify-between">
            <div>
              {title && (
                <h3 className="text-lg font-semibold text-secondary-900">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-sm text-secondary-600 mt-1">
                  {subtitle}
                </p>
              )}
            </div>
            {headerActions && (
              <div className="flex items-center space-x-2">
                {headerActions}
              </div>
            )}
          </div>
        </div>
      )}
      
      <div className={bodyClasses}>
        {children}
      </div>
      
      {footer && (
        <div className={footerClasses}>
          {footer}
        </div>
      )}
    </div>
  )
}

// Card variants
export const StatCard = ({
  title,
  value,
  change,
  changeType = 'neutral',
  icon,
  className = '',
  ...props
}) => {
  const changeColorClasses = {
    positive: 'text-green-600',
    negative: 'text-red-600',
    neutral: 'text-secondary-600'
  }

  const changeIcon = {
    positive: '↗',
    negative: '↘',
    neutral: '→'
  }

  return (
    <Card className={`${className}`} {...props}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-secondary-600">
            {title}
          </p>
          <p className="text-2xl font-bold text-secondary-900">
            {value}
          </p>
          {change && (
            <p className={`text-sm ${changeColorClasses[changeType]}`}>
              <span className="inline-flex items-center">
                {changeIcon[changeType]} {change}
              </span>
            </p>
          )}
        </div>
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 text-lg">
                {icon}
              </span>
            </div>
          </div>
        )}
      </div>
    </Card>
  )
}

export const InfoCard = ({
  title,
  description,
  icon,
  action,
  className = '',
  ...props
}) => {
  return (
    <Card className={`${className}`} {...props}>
      <div className="flex items-start space-x-3">
        {icon && (
          <div className="flex-shrink-0">
            <div className="w-10 h-10 bg-primary-100 rounded-lg flex items-center justify-center">
              <span className="text-primary-600 text-xl">
                {icon}
              </span>
            </div>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-secondary-900">
            {title}
          </h4>
          <p className="text-sm text-secondary-600 mt-1">
            {description}
          </p>
          {action && (
            <div className="mt-3">
              {action}
            </div>
          )}
        </div>
      </div>
    </Card>
  )
}

export default Card

