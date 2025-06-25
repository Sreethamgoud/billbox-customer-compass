
import * as pdfjsLib from 'pdfjs-dist';
import 'pdfjs-dist/build/pdf.worker.entry';

// Set up PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.js',
  import.meta.url
).toString();

export interface PDFProcessingProgress {
  currentPage: number;
  totalPages: number;
  progress: number;
}

export const processPDFToCanvases = async (
  file: File,
  onProgress?: (progress: PDFProcessingProgress) => void
): Promise<HTMLCanvasElement[]> => {
  const arrayBuffer = await file.arrayBuffer();
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
  const canvases: HTMLCanvasElement[] = [];
  
  console.log(`Processing PDF with ${pdf.numPages} pages`);

  for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 2.0 }); // Higher scale for better OCR
    
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    
    if (!context) {
      throw new Error('Could not get canvas context');
    }
    
    canvas.height = viewport.height;
    canvas.width = viewport.width;
    
    const renderContext = {
      canvasContext: context,
      viewport: viewport,
    };
    
    await page.render(renderContext).promise;
    canvases.push(canvas);
    
    // Report progress
    if (onProgress) {
      onProgress({
        currentPage: pageNum,
        totalPages: pdf.numPages,
        progress: Math.round((pageNum / pdf.numPages) * 100),
      });
    }
    
    console.log(`Processed page ${pageNum} of ${pdf.numPages}`);
  }
  
  return canvases;
};

export const canvasToBlob = (canvas: HTMLCanvasElement): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (blob) {
        resolve(blob);
      } else {
        reject(new Error('Failed to convert canvas to blob'));
      }
    }, 'image/png');
  });
};
