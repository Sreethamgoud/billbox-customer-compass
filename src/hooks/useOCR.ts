
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useToast } from '@/hooks/use-toast';

export interface ExtractedBillData {
  text: string;
  amount?: number;
  date?: string;
  merchant?: string;
  category?: string;
}

export const useOCR = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const extractTextFromImage = async (file: File): Promise<ExtractedBillData | null> => {
    try {
      setIsProcessing(true);
      console.log('Starting OCR processing...');

      const { data: { text } } = await Tesseract.recognize(file, 'eng', {
        logger: (m) => console.log('OCR Progress:', m),
      });

      console.log('OCR Result:', text);

      // Basic text parsing for common bill patterns
      const extractedData: ExtractedBillData = { text };

      // Extract amount (looking for currency patterns)
      const amountMatch = text.match(/\$?\s*(\d+\.?\d*)/g);
      if (amountMatch) {
        const amounts = amountMatch.map(a => parseFloat(a.replace(/\$|\s/g, '')));
        extractedData.amount = Math.max(...amounts.filter(a => !isNaN(a) && a > 0));
      }

      // Extract date patterns
      const dateMatch = text.match(/(\d{1,2}\/\d{1,2}\/\d{2,4})|(\d{1,2}-\d{1,2}-\d{2,4})|(\w{3,9}\s+\d{1,2},?\s+\d{2,4})/i);
      if (dateMatch) {
        extractedData.date = dateMatch[0];
      }

      // Extract potential merchant name (usually first line or after common patterns)
      const lines = text.split('\n').filter(line => line.trim().length > 0);
      if (lines.length > 0) {
        extractedData.merchant = lines[0].trim();
      }

      toast({
        title: "Success",
        description: "Text extracted from bill image",
      });

      return extractedData;
    } catch (error: any) {
      console.error('OCR failed:', error);
      toast({
        title: "OCR Failed",
        description: "Could not extract text from image",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
    }
  };

  return {
    extractTextFromImage,
    isProcessing,
  };
};
