
import { useState } from 'react';
import Tesseract from 'tesseract.js';
import { useToast } from '@/hooks/use-toast';
import { parseOCRText, ParsedBillData, combinePageTexts } from '@/utils/ocrTextParser';
import { processPDFToCanvases, canvasToBlob, PDFProcessingProgress } from '@/utils/pdfProcessor';

export interface ExtractedBillData extends ParsedBillData {
  text: string;
}

export const useOCR = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [ocrProgress, setOcrProgress] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>();
  const [totalPages, setTotalPages] = useState<number>();
  const { toast } = useToast();

  const extractTextFromFile = async (file: File): Promise<ExtractedBillData | null> => {
    try {
      setIsProcessing(true);
      setOcrProgress(0);
      setCurrentPage(undefined);
      setTotalPages(undefined);
      console.log('Starting OCR processing...');

      let extractedTexts: string[] = [];

      if (file.type === 'application/pdf') {
        // Handle PDF files
        console.log('Processing PDF file...');
        
        const canvases = await processPDFToCanvases(file, (progress: PDFProcessingProgress) => {
          setCurrentPage(progress.currentPage);
          setTotalPages(progress.totalPages);
          setOcrProgress(progress.progress * 0.3); // PDF processing is 30% of total
        });

        // Process each page with OCR
        for (let i = 0; i < canvases.length; i++) {
          const canvas = canvases[i];
          const blob = await canvasToBlob(canvas);
          
          setCurrentPage(i + 1);
          setTotalPages(canvases.length);
          
          const { data: { text } } = await Tesseract.recognize(blob, 'eng', {
            logger: (m) => {
              if (m.status === 'recognizing text') {
                const pageProgress = 30 + ((i / canvases.length) * 70) + (m.progress * (70 / canvases.length));
                setOcrProgress(Math.round(pageProgress));
              }
            },
          });
          
          extractedTexts.push(text);
          console.log(`OCR completed for page ${i + 1}`);
        }
      } else {
        // Handle image files
        console.log('Processing image file...');
        
        const { data: { text } } = await Tesseract.recognize(file, 'eng', {
          logger: (m) => {
            console.log('OCR Progress:', m);
            if (m.status === 'recognizing text') {
              setOcrProgress(Math.round(m.progress * 100));
            }
          },
        });
        
        extractedTexts.push(text);
      }

      // Combine all extracted text
      const combinedText = combinePageTexts(extractedTexts);
      console.log('Combined OCR Result:', combinedText);

      // Parse the extracted text
      const parsedData = parseOCRText(combinedText);
      
      const extractedData: ExtractedBillData = {
        text: combinedText,
        ...parsedData
      };

      console.log('Parsed bill data:', extractedData);

      toast({
        title: "Success",
        description: file.type === 'application/pdf' 
          ? `Text extracted from ${extractedTexts.length} page(s) successfully`
          : "Text extracted from bill successfully",
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
      setCurrentPage(undefined);
      setTotalPages(undefined);
    }
  };

  const extractTextFromUrl = async (fileUrl: string): Promise<ExtractedBillData | null> => {
    try {
      setIsProcessing(true);
      setOcrProgress(0);
      console.log('Starting OCR processing from URL:', fileUrl);

      // Check if URL is a PDF
      const isPdf = fileUrl.toLowerCase().includes('.pdf');
      
      if (isPdf) {
        // For PDF URLs, we need to fetch and process as blob
        const response = await fetch(fileUrl);
        const blob = await response.blob();
        const file = new File([blob], 'document.pdf', { type: 'application/pdf' });
        return await extractTextFromFile(file);
      } else {
        // Handle image URLs directly
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
      }
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
      setCurrentPage(undefined);
      setTotalPages(undefined);
    }
  };

  return {
    extractTextFromFile,
    extractTextFromUrl,
    isProcessing,
    ocrProgress,
    currentPage,
    totalPages,
  };
};
