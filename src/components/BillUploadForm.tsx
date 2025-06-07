
import React, { useState } from 'react';
import { Upload, Camera, FileText, Check, X, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { useBillProcessing, ProcessedBillData } from '@/hooks/useBillProcessing';

const BillUploadForm: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [processedData, setProcessedData] = useState<ProcessedBillData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const { processUploadedBill, saveBill, isProcessing, uploadProgress, ocrProgress } = useBillProcessing();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Check file type
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        alert('Please upload an image file (JPG, PNG, WEBP). PDF support coming soon!');
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
      return uploadProgress * 0.4; // Upload is 40% of total
    }
    if (uploadProgress === 100 && ocrProgress > 0) {
      return 40 + (ocrProgress * 0.4); // OCR is 40% of total
    }
    if (uploadProgress === 100 && ocrProgress === 100 && isProcessing) {
      return 80; // AI processing is remaining 20%
    }
    return 0;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto relative z-10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Camera className="h-5 w-5" />
          Upload & Process Bill
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6 relative z-10">
        {/* File Upload Section */}
        {!processedData && (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center relative">
              <Upload className="h-12 w-12 mx-auto text-gray-400 mb-4" />
              <div className="space-y-2">
                <label htmlFor="bill-upload" className="text-lg font-medium cursor-pointer block hover:text-blue-600 focus-within:text-blue-600 transition-colors">
                  Choose a bill image
                </label>
                <input
                  id="bill-upload"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/jpg"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
                  aria-label="Upload bill image"
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
              <div className="space-y-4">
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
                  <button
                    type="button"
                    onClick={handleProcessBill}
                    disabled={isProcessing}
                    className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] ml-4 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed rounded-md transition-colors cursor-pointer relative z-30"
                    aria-label="Process uploaded bill"
                  >
                    {isProcessing ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      'Process Bill'
                    )}
                  </button>
                </div>

                {isProcessing && (
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{getProgressMessage()}</span>
                      <span className="text-gray-600">{Math.round(getOverallProgress())}%</span>
                    </div>
                    <Progress value={getOverallProgress()} className="w-full" />
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Processed Data Edit Section */}
        {processedData && isEditing && (
          <div className="space-y-4 relative z-10">
            <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg border border-green-200">
              <Check className="h-5 w-5 text-green-600" />
              <span className="text-green-800 font-medium">
                Bill processed successfully! Review and edit the details below.
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Bill Name</Label>
                <Input
                  id="name"
                  value={processedData.name}
                  onChange={(e) => handleFieldChange('name', e.target.value)}
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <Label htmlFor="amount">Amount ($)</Label>
                <Input
                  id="amount"
                  type="number"
                  step="0.01"
                  value={processedData.amount}
                  onChange={(e) => handleFieldChange('amount', parseFloat(e.target.value) || 0)}
                  className="min-h-[44px]"
                />
              </div>

              <div>
                <Label htmlFor="category">Category</Label>
                <Select 
                  value={processedData.category} 
                  onValueChange={(value) => handleFieldChange('category', value)}
                >
                  <SelectTrigger className="min-h-[44px] cursor-pointer focus:ring-2 focus:ring-blue-500">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="relative z-50">
                    <SelectItem value="Utilities" className="cursor-pointer min-h-[44px]">Utilities</SelectItem>
                    <SelectItem value="Groceries" className="cursor-pointer min-h-[44px]">Groceries</SelectItem>
                    <SelectItem value="Entertainment" className="cursor-pointer min-h-[44px]">Entertainment</SelectItem>
                    <SelectItem value="Transportation" className="cursor-pointer min-h-[44px]">Transportation</SelectItem>
                    <SelectItem value="Healthcare" className="cursor-pointer min-h-[44px]">Healthcare</SelectItem>
                    <SelectItem value="Shopping" className="cursor-pointer min-h-[44px]">Shopping</SelectItem>
                    <SelectItem value="Housing" className="cursor-pointer min-h-[44px]">Housing</SelectItem>
                    <SelectItem value="Other" className="cursor-pointer min-h-[44px]">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="due_date">Due Date</Label>
                <Input
                  id="due_date"
                  type="date"
                  value={processedData.due_date}
                  onChange={(e) => handleFieldChange('due_date', e.target.value)}
                  className="min-h-[44px]"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={processedData.description || ''}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                rows={3}
                className="min-h-[88px]"
              />
            </div>

            {processedData.confidence && (
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-sm text-blue-800">
                  <strong>AI Confidence:</strong> {processedData.confidence}%
                </p>
                <p className="text-sm text-blue-700 mt-1">
                  {processedData.reasoning}
                </p>
              </div>
            )}

            <div className="flex gap-3 relative z-30">
              <button
                type="button"
                onClick={handleSaveBill}
                className="flex-1 inline-flex items-center justify-center min-h-[44px] px-4 py-2 bg-green-600 text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 rounded-md transition-colors cursor-pointer"
                aria-label="Save processed bill"
              >
                <Check className="h-4 w-4 mr-2" />
                Save Bill
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedFile(null);
                  setProcessedData(null);
                  setIsEditing(false);
                }}
                className="inline-flex items-center justify-center min-h-[44px] min-w-[44px] px-4 py-2 border border-gray-300 bg-white text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md transition-colors cursor-pointer"
                aria-label="Cancel editing"
              >
                <X className="h-4 w-4 mr-2" />
                Cancel
              </button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default BillUploadForm;
