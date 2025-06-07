
import React from 'react';
import { Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

interface ProcessingProgressProps {
  isProcessing: boolean;
  uploadProgress: number;
  ocrProgress: number;
}

const ProcessingProgress: React.FC<ProcessingProgressProps> = ({
  isProcessing,
  uploadProgress,
  ocrProgress,
}) => {
  const getProgressMessage = () => {
    if (uploadProgress > 0 && uploadProgress < 100) {
      return `Uploading file... ${uploadProgress}%`;
    }
    if (ocrProgress > 0 && ocrProgress < 100) {
      return `Extracting text... ${ocrProgress}%`;
    }
    if (isProcessing) {
      return 'Processing with AI...';
    }
    return '';
  };

  const getOverallProgress = () => {
    if (uploadProgress > 0 && uploadProgress < 100) {
      return uploadProgress * 0.4;
    }
    if (uploadProgress === 100 && ocrProgress > 0) {
      return 40 + (ocrProgress * 0.4);
    }
    if (uploadProgress === 100 && ocrProgress === 100 && isProcessing) {
      return 80;
    }
    return 0;
  };

  if (!isProcessing) return null;

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Loader2 className="h-4 w-4 animate-spin" />
        <div className="flex justify-between text-sm flex-1">
          <span className="text-gray-600">{getProgressMessage()}</span>
          <span className="text-gray-600">{Math.round(getOverallProgress())}%</span>
        </div>
      </div>
      <Progress value={getOverallProgress()} className="w-full" />
    </div>
  );
};

export default ProcessingProgress;
