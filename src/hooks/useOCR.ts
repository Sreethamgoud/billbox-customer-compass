
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useToast } from '@/hooks/use-toast';
import { parseOCRText, ParsedBillData } from '@/utils/ocrTextParser';

export interface ExtractedBillData extends ParsedBillData {
  text: string;
}

export const useOCR = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const { toast } = useToast();

  const extractTextFromFile = async (file: File): Promise<ExtractedBillData | null> => {
    try {
      setIsProcessing(true);
      setOcrProgress(0);
      console.log('Starting OCR processing...');

      // Check if file is PDF and reject it for now
      if (file.type === 'application/pdf') {
        throw new Error('PDF processing is not supported yet. Please upload an image file (JPG, PNG, WEBP).');
      }

      const { data: { text } } = await Tesseract.recognize(file, 'eng', {
        logger: (m) => {
          console.log('OCR Progress:', m);
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
      });

      console.log('OCR Result:', text);

      // Parse the extracted text
      const parsedData = parseOCRText(text);
      
      const extractedData: ExtractedBillData = {
        text,
        ...parsedData
      };

      console.log('Parsed bill data:', extractedData);

      toast({
        title: "Success",
        description: "Text extracted from bill successfully",
      });

      return extractedData;
    } catch (error: any) {
      console.error('OCR failed:', error);
      toast({
        title: "OCR Failed",
        description: error.message || "Could not extract text from image",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  const extractTextFromUrl = async (fileUrl: string): Promise<ExtractedBillData | null> => {
    try {
      setIsProcessing(true);
      setOcrProgress(0);
      console.log('Starting OCR processing from URL:', fileUrl);

      // Check if URL contains PDF and reject it
      if (fileUrl.toLowerCase().includes('.pdf')) {
        throw new Error('PDF processing is not supported yet. Please upload an image file (JPG, PNG, WEBP).');
      }

      const { data: { text } } = await Tesseract.recognize(fileUrl, 'eng', {
        logger: (m) => {
          console.log('OCR Progress:', m);
          if (m.status === 'recognizing text') {
            setOcrProgress(Math.round(m.progress * 100));
          }
        },
      });

      console.log('OCR Result:', text);

      // Parse the extracted text
      const parsedData = parseOCRText(text);
      
      const extractedData: ExtractedBillData = {
        text,
        ...parsedData
      };

      console.log('Parsed bill data:', extractedData);

      toast({
        title: "Success",
        description: "Text extracted from bill successfully",
      });

      return extractedData;
    } catch (error: any) {
      console.error('OCR failed:', error);
      toast({
        title: "OCR Failed",
        description: error.message || "Could not extract text from file",
        variant: "destructive",
      });
      return null;
    } finally {
      setIsProcessing(false);
      setOcrProgress(0);
    }
  };

  return {
    extractTextFromFile,
    extractTextFromUrl,
    isProcessing,
    ocrProgress,
  };
};
