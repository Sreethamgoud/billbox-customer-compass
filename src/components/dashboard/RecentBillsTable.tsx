
import React from 'react';
import { Link } from 'react-router-dom';
import ChartCard from '../ChartCard';
import Table from '../Table';

interface Bill {
  id: number;
  name: string;
  amount: number;
  dueDate: string;
  status: 'paid' | 'due' | 'upcoming';
  category: string;
}

interface RecentBillsTableProps {
  bills: Bill[];
  isLoading: boolean;
}

const RecentBillsTable: React.FC<RecentBillsTableProps> = ({ bills, isLoading }) => {
  const billColumns = [
    { key: 'name', label: 'Bill Name' },
    { key: 'amount', label: 'Amount', render: (value: number) => `$${value}` },
    { key: 'dueDate', label: 'Due Date' },
    { 
      key: 'status', 
      label: 'Status',
      render: (status: string) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          status === 'paid' ? 'bg-green-100 text-green-800' :
          status === 'due' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'
        }`}>
          {status}
        </span>
      )
    }
  ];

  return (
    <ChartCard 
      title="Recent Bills"
      actions={
        <Link to="/reports" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
          View All
        </Link>
      }
    >
      {isLoading ? (
        <div className="h-48 bg-gray-100 rounded-lg flex items-center justify-center">
          <span className="text-gray-500">Loading bills...</span>
        </div>
      ) : (
        <Table columns={billColumns} data={bills} sortable />
      )}
    </ChartCard>
  );
};

export default RecentBillsTable;
