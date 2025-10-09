import React from 'react'
import Card from '../../components/common/Card'

const FeeOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-secondary-900">Fee Overview</h1>
        <p className="text-secondary-600 mt-1">Manage school fees and financial records</p>
      </div>
      <Card>
        <div className="text-center py-12">
          <h3 className="text-lg font-semibold text-secondary-900 mb-2">Fee Management</h3>
          <p className="text-secondary-600">Fee structure and payment tracking features will be implemented here</p>
        </div>
      </Card>
    </div>
  )
}

export default FeeOverview

