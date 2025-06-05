
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
        description: "Could not extract text from image",
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
        description: "Could not extract text from file",
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
