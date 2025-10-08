import React from 'react'
import { Link } from 'react-router-dom'
import { Home, ArrowLeft } from 'lucide-react'
import Button from '../../components/common/Button'

const NotFound = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-secondary-50">
      <div className="max-w-md w-full text-center">
        <div className="mb-8">
          <h1 className="text-9xl font-bold text-primary-600">404</h1>
          <h2 className="text-2xl font-semibold text-secondary-900 mt-4">
            Page Not Found
          </h2>
          <p className="text-secondary-600 mt-2">
            Sorry, we couldn't find the page you're looking for.
          </p>
        </div>

        <div className="space-y-4">
          <Button
            as={Link}
            to="/dashboard"
            variant="primary"
            size="lg"
            icon={<Home className="w-5 h-5" />}
            className="w-full"
          >
            Go to Dashboard
          </Button>
          
          <Button
            onClick={() => window.history.back()}
            variant="outline"
            size="lg"
            icon={<ArrowLeft className="w-5 h-5" />}
            className="w-full"
          >
            Go Back
          </Button>
        </div>

        <div className="mt-8 text-sm text-secondary-500">
          <p>
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  )
}

export default NotFound
