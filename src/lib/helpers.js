// Utility functions for the school management system

// Date utilities
export const dateUtils = {
  formatDate(date, format = 'YYYY-MM-DD') {
    if (!date) return ''
    
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, '0')
    const day = String(d.getDate()).padStart(2, '0')
    
    switch (format) {
      case 'YYYY-MM-DD':
        return `${year}-${month}-${day}`
      case 'DD/MM/YYYY':
        return `${day}/${month}/${year}`
      case 'MM/DD/YYYY':
        return `${month}/${day}/${year}`
      case 'DD-MM-YYYY':
        return `${day}-${month}-${year}`
      default:
        return d.toLocaleDateString()
    }
  },

  formatDateTime(date) {
    if (!date) return ''
    return new Date(date).toLocaleString()
  },

  getAge(birthDate) {
    if (!birthDate) return 0
    const today = new Date()
    const birth = new Date(birthDate)
    let age = today.getFullYear() - birth.getFullYear()
    const monthDiff = today.getMonth() - birth.getMonth()
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--
    }
    
    return age
  },

  isDateInRange(date, startDate, endDate) {
    const d = new Date(date)
    const start = new Date(startDate)
    const end = new Date(endDate)
    return d >= start && d <= end
  },

  addDays(date, days) {
    const result = new Date(date)
    result.setDate(result.getDate() + days)
    return result
  },

  getDaysDifference(date1, date2) {
    const d1 = new Date(date1)
    const d2 = new Date(date2)
    const diffTime = Math.abs(d2 - d1)
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24))
  }
}

// String utilities
export const stringUtils = {
  capitalize(str) {
    if (!str) return ''
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  },

  capitalizeWords(str) {
    if (!str) return ''
    return str.split(' ').map(word => this.capitalize(word)).join(' ')
  },

  generateId(prefix = '') {
    const timestamp = Date.now().toString(36)
    const randomStr = Math.random().toString(36).substr(2, 5)
    return prefix ? `${prefix}_${timestamp}_${randomStr}` : `${timestamp}_${randomStr}`
  },

  generateStudentId() {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0')
    return `STU${year}${random}`
  },

  generateStaffId() {
    const year = new Date().getFullYear()
    const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0')
    return `STAFF${year}${random}`
  },

  slugify(str) {
    if (!str) return ''
    return str
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '')
  },

  truncate(str, length = 50) {
    if (!str) return ''
    return str.length > length ? str.substring(0, length) + '...' : str
  }
}

// Number utilities
export const numberUtils = {
  formatCurrency(amount, currency = 'USD') {
    if (amount === null || amount === undefined) return '0.00'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency
    }).format(amount)
  },

  formatNumber(num, decimals = 2) {
    if (num === null || num === undefined) return '0'
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals
    }).format(num)
  },

  calculatePercentage(part, total) {
    if (!total || total === 0) return 0
    return Math.round((part / total) * 100)
  },

  roundToDecimal(num, decimals = 2) {
    return Math.round(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
  }
}

// Validation utilities
export const validationUtils = {
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  },

  isValidPhone(phone) {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/
    return phoneRegex.test(phone.replace(/\s/g, ''))
  },

  isValidPassword(password) {
    // At least 8 characters, 1 uppercase, 1 lowercase, 1 number
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/
    return passwordRegex.test(password)
  },

  isRequired(value) {
    return value !== null && value !== undefined && value.toString().trim() !== ''
  },

  isMinLength(value, minLength) {
    return value && value.toString().length >= minLength
  },

  isMaxLength(value, maxLength) {
    return !value || value.toString().length <= maxLength
  }
}

// File utilities
export const fileUtils = {
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes'
    
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  },

  getFileExtension(filename) {
    return filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2)
  },

  isValidImageType(file) {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif']
    return validTypes.includes(file.type)
  },

  isValidDocumentType(file) {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain'
    ]
    return validTypes.includes(file.type)
  }
}

// Grade calculation utilities
export const gradeUtils = {
  calculateGPA(grades) {
    if (!grades || grades.length === 0) return 0
    
    const totalPoints = grades.reduce((sum, grade) => sum + grade.points, 0)
    const totalCredits = grades.reduce((sum, grade) => sum + grade.credits, 0)
    
    return totalCredits > 0 ? totalPoints / totalCredits : 0
  },

  getGradeLetter(percentage) {
    if (percentage >= 90) return 'A'
    if (percentage >= 80) return 'B'
    if (percentage >= 70) return 'C'
    if (percentage >= 60) return 'D'
    return 'F'
  },

  getGradePoints(percentage) {
    if (percentage >= 90) return 4.0
    if (percentage >= 80) return 3.0
    if (percentage >= 70) return 2.0
    if (percentage >= 60) return 1.0
    return 0.0
  }
}

// Status utilities
export const statusUtils = {
  getPaymentStatus(balance, totalFees) {
    if (balance <= 0) return 'paid'
    if (balance < totalFees) return 'partial'
    return 'pending'
  },

  getStudentStatus(enrollmentDate, isActive) {
    if (!isActive) return 'inactive'
    const currentDate = new Date()
    const enrollment = new Date(enrollmentDate)
    return currentDate >= enrollment ? 'active' : 'pending'
  }
}

// Export all utilities as a single object
export const utils = {
  date: dateUtils,
  string: stringUtils,
  number: numberUtils,
  validation: validationUtils,
  file: fileUtils,
  grade: gradeUtils,
  status: statusUtils
}
