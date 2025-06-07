
import React from 'react';
import { Upload, Camera, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface FileUploadSectionProps {
  selectedFile: File | null;
  isProcessing: boolean;
  onFileSelect: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onProcessBill: () => void;
}

const FileUploadSection: React.FC<FileUploadSectionProps> = ({
  selectedFile,
  isProcessing,
  onFileSelect,
  onProcessBill,
}) => {
  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
        <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <div className="space-y-2">
          <Label 
            htmlFor="bill-upload" 
            className="text-lg font-medium cursor-pointer block hover:text-blue-600 transition-colors"
          >
            Choose a bill image
          </Label>
          <Input
            id="bill-upload"
            type="file"
            accept="image/jpeg,image/png,image/webp,image/jpg"
            onChange={onFileSelect}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          />
          <p className="text-sm text-gray-500">
            Supports JPG, PNG, WEBP files up to 10MB
          </p>
          <p className="text-xs text-amber-600">
            Note: PDF support coming soon! Please use image files for now.
          </p>
        </div>
      </div>

      {selectedFile && (
        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <FileText className="h-8 w-8 text-blue-500" />
            <div>
              <p className="font-medium">{selectedFile.name}</p>
              <p className="text-sm text-gray-500">
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>
            </div>
          </div>
          <Button
            onClick={onProcessBill}
            disabled={isProcessing}
            className="ml-4 min-w-[120px] min-h-[44px]"
          >
            {isProcessing ? 'Processing...' : 'Process Bill'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default FileUploadSection;
