import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
})

// Database table names
export const TABLES = {
  USERS: 'users',
  STUDENTS: 'students',
  STAFF: 'staff',
  CLASSES: 'classes',
  SUBJECTS: 'subjects',
  ENROLLMENTS: 'enrollments',
  RESULTS: 'results',
  FEES: 'fees',
  PAYMENTS: 'payments',
  MESSAGES: 'messages',
  ANNOUNCEMENTS: 'announcements',
  SYSTEM_LOGS: 'system_logs',
  APPROVALS: 'approvals'
}

// User roles
export const USER_ROLES = {
  ADMIN: 'admin',
  TEACHER: 'teacher',
  BURSAR: 'bursar',
  STUDENT: 'student'
}

// User permissions
export const PERMISSIONS = {
  // Admin permissions
  MANAGE_USERS: 'manage_users',
  MANAGE_SYSTEM: 'manage_system',
  VIEW_ALL_DATA: 'view_all_data',
  APPROVE_ACTIONS: 'approve_actions',
  
  // Teacher permissions
  MANAGE_CLASSES: 'manage_classes',
  UPLOAD_RESULTS: 'upload_results',
  VIEW_STUDENT_RECORDS: 'view_student_records',
  
  // Bursar permissions
  MANAGE_FEES: 'manage_fees',
  PROCESS_PAYMENTS: 'process_payments',
  VIEW_FINANCIAL_REPORTS: 'view_financial_reports',
  
  // Student permissions
  VIEW_OWN_RECORDS: 'view_own_records',
  VIEW_RESULTS: 'view_results'
}

// Role-based permissions mapping
export const ROLE_PERMISSIONS = {
  [USER_ROLES.ADMIN]: [
    PERMISSIONS.MANAGE_USERS,
    PERMISSIONS.MANAGE_SYSTEM,
    PERMISSIONS.VIEW_ALL_DATA,
    PERMISSIONS.APPROVE_ACTIONS,
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.UPLOAD_RESULTS,
    PERMISSIONS.VIEW_STUDENT_RECORDS,
    PERMISSIONS.MANAGE_FEES,
    PERMISSIONS.PROCESS_PAYMENTS,
    PERMISSIONS.VIEW_FINANCIAL_REPORTS
  ],
  [USER_ROLES.TEACHER]: [
    PERMISSIONS.MANAGE_CLASSES,
    PERMISSIONS.UPLOAD_RESULTS,
    PERMISSIONS.VIEW_STUDENT_RECORDS
  ],
  [USER_ROLES.BURSAR]: [
    PERMISSIONS.MANAGE_FEES,
    PERMISSIONS.PROCESS_PAYMENTS,
    PERMISSIONS.VIEW_FINANCIAL_REPORTS
  ],
  [USER_ROLES.STUDENT]: [
    PERMISSIONS.VIEW_OWN_RECORDS,
    PERMISSIONS.VIEW_RESULTS
  ]
}
