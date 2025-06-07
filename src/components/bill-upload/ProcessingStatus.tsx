
import React from 'react';
import { Check } from 'lucide-react';

interface ProcessingStatusProps {
  show: boolean;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({ show }) => {
  if (!show) return null;

  return (
    <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
      <Check className="h-5 w-5 text-green-600" />
      <span className="text-green-800 font-medium">
        Bill processed successfully! Review and edit the details below.
      </span>
    </div>
  );
};

export default ProcessingStatus;
