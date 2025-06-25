
import React, { useState } from 'react';
import { Camera } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useBillProcessing, ProcessedBillData } from '@/hooks/useBillProcessing';
import FileUploadSection from '@/components/bill-upload/FileUploadSection';
import ProcessingProgress from '@/components/bill-upload/ProcessingProgress';
import ProcessingStatus from '@/components/bill-upload/ProcessingStatus';
import BillEditForm from '@/components/bill-upload/BillEditForm';

const BillUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedBillData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { processUploadedBill, saveBill, isProcessing, uploadProgress, ocrProgress, currentPage, totalPages } = useBillProcessing();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload an image file (JPG, PNG, WEBP) or PDF document.');
        return;
      }
      
      // Check file size (10MB limit)
      if (file.size > 10 * 1024 * 1024) {
        alert('File size must be less than 10MB.');
        return;
      }
      
      setSelectedFile(file);
      setProcessedData(null);
      setIsEditing(false);
    }
  };

  const handleProcessBill = async () => {
    if (!selectedFile) return;

    const result = await processUploadedBill(selectedFile);
    if (result) {
      setProcessedData(result);
      setIsEditing(true);
    }
  };

  const handleSaveBill = async () => {
    if (!processedData) return;
    
    await saveBill(processedData);
    
    // Reset form
    setSelectedFile(null);
    setProcessedData(null);
    setIsEditing(false);
    
    // Reset file input
    const fileInput = document.getElementById('bill-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  const handleFieldChange = (field: keyof ProcessedBillData, value: any) => {
    if (processedData) {
      setProcessedData({ ...processedData, [field]: value });
    }
  };

  const handleCancel = () => {
    setSelectedFile(null);
    setProcessedData(null);
    setIsEditing(false);
    
    // Reset file input
    const fileInput = document.getElementById('bill-upload') as HTMLInputElement;
    if (fileInput) fileInput.value = '';
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Upload & Process Bill
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* File Upload Section */}
        {!processedData && (
          <>
            <FileUploadSection
              selectedFile={selectedFile}
              isProcessing={isProcessing}
              onFileSelect={handleFileSelect}
              onProcessBill={handleProcessBill}
            />
            <ProcessingProgress
              isProcessing={isProcessing}
              uploadProgress={uploadProgress}
              ocrProgress={ocrProgress}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </>
        )}

        {/* Processed Data Edit Section */}
        {processedData && isEditing && (
          <>
            <ProcessingStatus show={true} />
            <BillEditForm
              processedData={processedData}
              onFieldChange={handleFieldChange}
              onSaveBill={handleSaveBill}
              onCancel={handleCancel}
            />
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default BillUploadForm;
