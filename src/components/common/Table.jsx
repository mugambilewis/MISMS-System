import React from 'react'
import { ChevronUp, ChevronDown } from 'lucide-react'

const Table = ({
  data = [],
  columns = [],
  loading = false,
  emptyMessage = 'No data available',
  className = '',
  headerClassName = '',
  bodyClassName = '',
  rowClassName = '',
  onSort,
  sortColumn,
  sortDirection = 'asc',
  pagination = null,
  actions = null,
  selectable = false,
  selectedRows = [],
  onRowSelect = null,
  onSelectAll = null
}) => {
  const handleSort = (column) => {
    if (onSort && column.sortable !== false) {
      const direction = sortColumn === column.key && sortDirection === 'asc' ? 'desc' : 'asc'
      onSort(column.key, direction)
    }
  }

  const handleRowSelect = (row, isSelected) => {
    if (onRowSelect) {
      onRowSelect(row, isSelected)
    }
  }

  const handleSelectAll = (isSelected) => {
    if (onSelectAll) {
      onSelectAll(isSelected)
    }
  }

  const isRowSelected = (row) => {
    return selectedRows.some(selected => selected.id === row.id)
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-secondary-200">
        <div className="p-8 text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-2 text-sm text-secondary-600">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`bg-white rounded-lg shadow-sm border border-secondary-200 ${className}`}>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-secondary-200">
          <thead className={`bg-secondary-50 ${headerClassName}`}>
            <tr>
              {selectable && (
                <th className="px-6 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={data.length > 0 && selectedRows.length === data.length}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={`px-6 py-3 text-left text-xs font-medium text-secondary-500 uppercase tracking-wider ${
                    column.sortable !== false ? 'cursor-pointer hover:bg-secondary-100' : ''
                  }`}
                  onClick={() => handleSort(column)}
                >
                  <div className="flex items-center space-x-1">
                    <span>{column.title}</span>
                    {column.sortable !== false && (
                      <div className="flex flex-col">
                        <ChevronUp
                          className={`w-3 h-3 ${
                            sortColumn === column.key && sortDirection === 'asc'
                              ? 'text-primary-600'
                              : 'text-secondary-400'
                          }`}
                        />
                        <ChevronDown
                          className={`w-3 h-3 -mt-1 ${
                            sortColumn === column.key && sortDirection === 'desc'
                              ? 'text-primary-600'
                              : 'text-secondary-400'
                          }`}
                        />
                      </div>
                    )}
                  </div>
                </th>
              ))}
              {actions && (
                <th className="px-6 py-3 text-right text-xs font-medium text-secondary-500 uppercase tracking-wider">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className={`bg-white divide-y divide-secondary-200 ${bodyClassName}`}>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0) + (actions ? 1 : 0)}
                  className="px-6 py-12 text-center text-sm text-secondary-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              data.map((row, index) => (
                <tr
                  key={row.id || index}
                  className={`hover:bg-secondary-50 ${rowClassName}`}
                >
                  {selectable && (
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={isRowSelected(row)}
                        onChange={(e) => handleRowSelect(row, e.target.checked)}
                        className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-secondary-300 rounded"
                      />
                    </td>
                  )}
                  {columns.map((column) => (
                    <td
                      key={column.key}
                      className="px-6 py-4 whitespace-nowrap text-sm text-secondary-900"
                    >
                      {column.render
                        ? column.render(row[column.key], row, index)
                        : row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      {actions(row, index)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      
      {pagination && (
        <div className="px-6 py-3 border-t border-secondary-200">
          {pagination}
        </div>
      )}
    </div>
  )
}

// Pagination component
export const Pagination = ({
  currentPage,
  totalPages,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange,
  itemsPerPageOptions = [10, 25, 50, 100],
  showItemsPerPage = true,
  className = ''
}) => {
  const startItem = (currentPage - 1) * itemsPerPage + 1
  const endItem = Math.min(currentPage * itemsPerPage, totalItems)

  const getPageNumbers = () => {
    const pages = []
    const maxVisiblePages = 5
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      const start = Math.max(1, currentPage - 2)
      const end = Math.min(totalPages, start + maxVisiblePages - 1)
      
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }
    }
    
    return pages
  }

  return (
    <div className={`flex items-center justify-between ${className}`}>
      <div className="flex items-center space-x-2">
        {showItemsPerPage && (
          <>
            <span className="text-sm text-secondary-700">Show</span>
            <select
              value={itemsPerPage}
              onChange={(e) => onItemsPerPageChange(parseInt(e.target.value))}
              className="px-2 py-1 text-sm border border-secondary-300 rounded focus:outline-none focus:ring-2 focus:ring-primary-500"
            >
              {itemsPerPageOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <span className="text-sm text-secondary-700">per page</span>
          </>
        )}
      </div>
      
      <div className="flex items-center space-x-2">
        <span className="text-sm text-secondary-700">
          Showing {startItem} to {endItem} of {totalItems} results
        </span>
        
        <div className="flex items-center space-x-1">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 text-sm border border-secondary-300 rounded hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {getPageNumbers().map((page) => (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              className={`px-3 py-1 text-sm border rounded ${
                page === currentPage
                  ? 'bg-primary-600 text-white border-primary-600'
                  : 'border-secondary-300 hover:bg-secondary-50'
              }`}
            >
              {page}
            </button>
          ))}
          
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-sm border border-secondary-300 rounded hover:bg-secondary-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  )
}

export default Table
