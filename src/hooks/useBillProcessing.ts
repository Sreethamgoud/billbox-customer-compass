
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useFileUpload } from './useFileUpload';
import { useOCR, ExtractedBillData } from './useOCR';
import { useBillMutations } from './useBillMutations';
import { useToast } from '@/hooks/use-toast';

export interface ProcessedBillData {
  name: string;
  amount: number;
  category: string;
  description?: string;
  due_date: string;
  file_url?: string;
  confidence?: number;
  reasoning?: string;
}

export const useBillProcessing = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { uploadFile, isUploading, uploadProgress } = useFileUpload();
  const { extractTextFromUrl, isProcessing: isOCRProcessing, ocrProgress } = useOCR();
  const { createBill } = useBillMutations();
  const { toast } = useToast();

  const processUploadedBill = async (file: File): Promise<ProcessedBillData | null> => {
    try {
      setIsProcessing(true);
      console.log('Starting bill processing pipeline...');

      // Step 1: Upload file to storage
      console.log('Step 1: Uploading file...');
      const fileUrl = await uploadFile(file);
      if (!fileUrl) {
        throw new Error('Failed to upload file');
      }

      // Step 2: Extract text using OCR from the uploaded file URL
      console.log('Step 2: Extracting text with OCR...');
      const extractedData = await extractTextFromUrl(fileUrl);
      if (!extractedData) {
        throw new Error('Failed to extract text from file');
      }

      // Step 3: Categorize using AI
      console.log('Step 3: Categorizing with AI...');
      const { data: categorization, error } = await supabase.functions.invoke('categorize-bill', {
        body: { billData: extractedData },
      });

      if (error) {
        console.error('Categorization error:', error);
        throw error;
      }

      console.log('AI categorization result:', categorization);

      // Step 4: Create processed bill data
      const processedData: ProcessedBillData = {
        name: extractedData.merchant || 'Uploaded Bill',
        amount: extractedData.amount || 0,
        category: categorization.category || 'Other',
        description: `AI extracted from receipt. ${categorization.reasoning || ''}`,
        due_date: extractedData.date 
          ? formatDateForInput(extractedData.date) 
          : new Date().toISOString().split('T')[0],
        file_url: fileUrl,
        confidence: categorization.confidence,
        reasoning: categorization.reasoning,
      };

      console.log('Processed bill data:', processedData);

      toast({
        title: "Bill Processed Successfully",
        description: `Categorized as ${categorization.category} with ${categorization.confidence}% confidence`,
      });

      return processedData;
    } catch (error: any) {
      console.error('Bill processing failed:', error);
      toast({
        title: "Processing Failed",
        description: error.message,
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  const formatDateForInput = (dateString: string): string => {
    try {
      // Try to parse various date formats
      let date: Date;
      
      if (dateString.match(/^\d{1,2}\/\d{1,2}\/\d{2,4}$/)) {
        // MM/DD/YYYY or M/D/YY format
        date = new Date(dateString);
      } else if (dateString.match(/^\d{1,2}-\d{1,2}-\d{2,4}$/)) {
        // MM-DD-YYYY format
        date = new Date(dateString.replace(/-/g, '/'));
      } else if (dateString.match(/^\w{3,9}\s+\d{1,2},?\s+\d{2,4}$/i)) {
        // "January 15, 2024" format
        date = new Date(dateString);
      } else {
        // Try as-is
        date = new Date(dateString);
      }

      if (isNaN(date.getTime())) {
        // If parsing failed, return today's date
        return new Date().toISOString().split('T')[0];
      }

      return date.toISOString().split('T')[0];
    } catch (error) {
      console.error('Date parsing error:', error);
      return new Date().toISOString().split('T')[0];
    }
  };

  const saveBill = async (billData: ProcessedBillData) => {
    try {
      await createBill.mutateAsync({
        name: billData.name,
        amount: billData.amount,
        due_date: billData.due_date,
        status: 'upcoming' as const,
        category: billData.category,
        description: billData.description,
        file_url: billData.file_url,
      });

      toast({
        title: "Success",
        description: "Bill saved successfully",
      });
    } catch (error: any) {
      console.error('Failed to save bill:', error);
      toast({
        title: "Save Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return {
    processUploadedBill,
    saveBill,
    isProcessing: isProcessing || isUploading || isOCRProcessing,
    uploadProgress,
    ocrProgress,
  };
};
