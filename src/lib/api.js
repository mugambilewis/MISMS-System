import { supabase, TABLES } from './supabaseClient'

// Generic API service for CRUD operations
export const apiService = {
  // Generic create function
  async create(table, data) {
    try {
      const { data: result, error } = await supabase
        .from(table)
        .insert([{ ...data, created_at: new Date().toISOString() }])
        .select()

      if (error) throw error
      return { data: result[0], error: null }
    } catch (error) {
      console.error(`Create ${table} error:`, error)
      return { data: null, error }
    }
  },

  // Generic read function
  async read(table, filters = {}, options = {}) {
    try {
      let query = supabase.from(table).select(options.select || '*')

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== null && value !== undefined) {
          query = query.eq(key, value)
        }
      })

      // Apply ordering
      if (options.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending !== false })
      }

      // Apply pagination
      if (options.limit) {
        query = query.limit(options.limit)
      }
      if (options.offset) {
        query = query.range(options.offset, options.offset + (options.limit || 10) - 1)
      }

      const { data, error } = await query

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error(`Read ${table} error:`, error)
      return { data: null, error }
    }
  },

  // Generic update function
  async update(table, id, updates) {
    try {
      const { data, error } = await supabase
        .from(table)
        .update({
          ...updates,
          updated_at: new Date().toISOString()
        })
        .eq('id', id)
        .select()

      if (error) throw error
      return { data: result[0], error: null }
    } catch (error) {
      console.error(`Update ${table} error:`, error)
      return { data: null, error }
    }
  },

  // Generic delete function
  async delete(table, id) {
    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id)

      if (error) throw error
      return { error: null }
    } catch (error) {
      console.error(`Delete ${table} error:`, error)
      return { error }
    }
  },

  // Get single record by ID
  async getById(table, id) {
    try {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .single()

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error(`Get ${table} by ID error:`, error)
      return { data: null, error }
    }
  },

  // Search function
  async search(table, searchTerm, searchColumns = []) {
    try {
      let query = supabase.from(table).select('*')

      if (searchColumns.length > 0) {
        const searchConditions = searchColumns.map(column => 
          `${column}.ilike.%${searchTerm}%`
        ).join(',')
        query = query.or(searchConditions)
      }

      const { data, error } = await query

      if (error) throw error
      return { data, error: null }
    } catch (error) {
      console.error(`Search ${table} error:`, error)
      return { data: null, error }
    }
  }
}

// Specific API services for different entities
export const studentService = {
  async getAll(filters = {}) {
    return apiService.read(TABLES.STUDENTS, filters, {
      orderBy: 'created_at',
      ascending: false
    })
  },

  async getById(id) {
    return apiService.getById(TABLES.STUDENTS, id)
  },

  async create(studentData) {
    return apiService.create(TABLES.STUDENTS, studentData)
  },

  async update(id, updates) {
    return apiService.update(TABLES.STUDENTS, id, updates)
  },

  async delete(id) {
    return apiService.delete(TABLES.STUDENTS, id)
  },

  async search(searchTerm) {
    return apiService.search(TABLES.STUDENTS, searchTerm, [
      'first_name', 'last_name', 'student_id', 'email'
    ])
  }
}

export const staffService = {
  async getAll(filters = {}) {
    return apiService.read(TABLES.STAFF, filters, {
      orderBy: 'created_at',
      ascending: false
    })
  },

  async getById(id) {
    return apiService.getById(TABLES.STAFF, id)
  },

  async create(staffData) {
    return apiService.create(TABLES.STAFF, staffData)
  },

  async update(id, updates) {
    return apiService.update(TABLES.STAFF, id, updates)
  },

  async delete(id) {
    return apiService.delete(TABLES.STAFF, id)
  }
}

export const classService = {
  async getAll(filters = {}) {
    return apiService.read(TABLES.CLASSES, filters, {
      orderBy: 'name'
    })
  },

  async getById(id) {
    return apiService.getById(TABLES.CLASSES, id)
  },

  async create(classData) {
    return apiService.create(TABLES.CLASSES, classData)
  },

  async update(id, updates) {
    return apiService.update(TABLES.CLASSES, id, updates)
  },

  async delete(id) {
    return apiService.delete(TABLES.CLASSES, id)
  }
}

export const subjectService = {
  async getAll(filters = {}) {
    return apiService.read(TABLES.SUBJECTS, filters, {
      orderBy: 'name'
    })
  },

  async getById(id) {
    return apiService.getById(TABLES.SUBJECTS, id)
  },

  async create(subjectData) {
    return apiService.create(TABLES.SUBJECTS, subjectData)
  },

  async update(id, updates) {
    return apiService.update(TABLES.SUBJECTS, id, updates)
  },

  async delete(id) {
    return apiService.delete(TABLES.SUBJECTS, id)
  }
}

export const feeService = {
  async getAll(filters = {}) {
    return apiService.read(TABLES.FEES, filters, {
      orderBy: 'created_at',
      ascending: false
    })
  },

  async getById(id) {
    return apiService.getById(TABLES.FEES, id)
  },

  async create(feeData) {
    return apiService.create(TABLES.FEES, feeData)
  },

  async update(id, updates) {
    return apiService.update(TABLES.FEES, id, updates)
  },

  async delete(id) {
    return apiService.delete(TABLES.FEES, id)
  }
}

export const paymentService = {
  async getAll(filters = {}) {
    return apiService.read(TABLES.PAYMENTS, filters, {
      orderBy: 'created_at',
      ascending: false
    })
  },

  async getById(id) {
    return apiService.getById(TABLES.PAYMENTS, id)
  },

  async create(paymentData) {
    return apiService.create(TABLES.PAYMENTS, paymentData)
  },

  async update(id, updates) {
    return apiService.update(TABLES.PAYMENTS, id, updates)
  },

  async delete(id) {
    return apiService.delete(TABLES.PAYMENTS, id)
  }
}

export const messageService = {
  async getAll(filters = {}) {
    return apiService.read(TABLES.MESSAGES, filters, {
      orderBy: 'created_at',
      ascending: false
    })
  },

  async getById(id) {
    return apiService.getById(TABLES.MESSAGES, id)
  },

  async create(messageData) {
    return apiService.create(TABLES.MESSAGES, messageData)
  },

  async update(id, updates) {
    return apiService.update(TABLES.MESSAGES, id, updates)
  },

  async delete(id) {
    return apiService.delete(TABLES.MESSAGES, id)
  }
}
