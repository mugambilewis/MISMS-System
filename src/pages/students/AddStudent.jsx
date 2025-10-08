import React from 'react'
import { ArrowLeft } from 'lucide-react'
import { Link } from 'react-router-dom'
import Button from '../../components/common/Button'
import Card from '../../components/common/Card'

const AddStudent = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center space-x-4">
        <Button
          as={Link}
          to="/students"
          variant="outline"
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Back to Students
        </Button>
        <div>
          <h1 className="text-2xl font-bold text-secondary-900">Add New Student</h1>
          <p className="text-secondary-600 mt-1">
            Register a new student in the system
          </p>
        </div>
      </div>

      <Card>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">
            Student Registration Form
          </h3>
          <p className="text-secondary-600">
            This form will be implemented with comprehensive student registration fields
          </p>
        </div>
      </Card>
    </div>
  )
}

export default AddStudent
