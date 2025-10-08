import React, { useState } from 'react'
import { Plus, Search, Filter, Download } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Input from '../../components/common/Input'
import Table from '../../components/common/Table'
import Card from '../../components/common/Card'

const StudentList = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRows, setSelectedRows] = useState([])

  // Mock data - in real app, this would come from API
  const students = [
    {
      id: 1,
      student_id: 'STU2024001',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@school.com',
      class: 'JSS 1A',
      status: 'Active',
      admission_date: '2024-01-15'
    },
    {
      id: 2,
      student_id: 'STU2024002',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@school.com',
      class: 'JSS 1B',
      status: 'Active',
      admission_date: '2024-01-16'
    },
    {
      id: 3,
      student_id: 'STU2024003',
      first_name: 'Michael',
      last_name: 'Johnson',
      email: 'michael.johnson@school.com',
      class: 'SSS 1A',
      status: 'Active',
      admission_date: '2024-01-17'
    }
  ]

  const columns = [
    {
      key: 'student_id',
      title: 'Student ID',
      sortable: true
    },
    {
      key: 'first_name',
      title: 'Name',
      sortable: true,
      render: (value, row) => `${row.first_name} ${row.last_name}`
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true
    },
    {
      key: 'class',
      title: 'Class',
      sortable: true
    },
    {
      key: 'status',
      title: 'Status',
      sortable: true,
      render: (value) => (
        <span className={`inline-flex px-2 py-1 text-xs font-medium rounded-full ${
          value === 'Active' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'admission_date',
      title: 'Admission Date',
      sortable: true
    }
  ]

  const actions = (row) => (
    <div className="flex space-x-2">
      <Link
        to={`/students/${row.id}`}
        className="text-primary-600 hover:text-primary-700 text-sm font-medium"
      >
        View
      </Link>
      <button className="text-secondary-600 hover:text-secondary-700 text-sm font-medium">
        Edit
      </button>
    </div>
  )

  const handleRowSelect = (row, isSelected) => {
    if (isSelected) {
      setSelectedRows([...selectedRows, row])
    } else {
      setSelectedRows(selectedRows.filter(r => r.id !== row.id))
    }
  }

  const handleSelectAll = (isSelected) => {
    if (isSelected) {
      setSelectedRows(students)
    } else {
      setSelectedRows([])
    }
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Students</h1>
          <p className="text-secondary-600 mt-1">
            Manage student records and information
          </p>
        </div>
        <Button
          as={Link}
          to="/students/add"
          variant="primary"
          icon={<Plus className="w-5 h-5" />}
        >
          Add Student
        </Button>
      </div>

      {/* Filters and Search */}
      <Card>
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search students..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              leftIcon={<Search className="w-4 h-4" />}
            />
          </div>
          <div className="flex space-x-2">
            <Button variant="outline" icon={<Filter className="w-4 h-4" />}>
              Filter
            </Button>
            <Button variant="outline" icon={<Download className="w-4 h-4" />}>
              Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Students Table */}
      <Table
        data={students}
        columns={columns}
        actions={actions}
        selectable
        selectedRows={selectedRows}
        onRowSelect={handleRowSelect}
        onSelectAll={handleSelectAll}
        emptyMessage="No students found"
      />
    </div>
  )
}

export default StudentList
