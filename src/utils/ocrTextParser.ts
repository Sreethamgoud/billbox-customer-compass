
export interface ParsedBillData {
  merchant?: string;
  amount?: number;
  date?: string;
}

export const parseOCRText = (text: string): ParsedBillData => {
  const result: ParsedBillData = {};

  // Clean up the text
  const cleanText = text.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
  const lines = text.split('\n').filter(line => line.trim().length > 0);

  // Extract amount (looking for currency patterns)
  const amountPatterns = [
    /\$\s*(\d{1,3}(?:,\d{3})*\.?\d{0,2})/g,
    /(\d{1,3}(?:,\d{3})*\.\d{2})\s*\$/g,
    /total[:\s]*\$?\s*(\d{1,3}(?:,\d{3})*\.?\d{0,2})/gi,
    /amount[:\s]*\$?\s*(\d{1,3}(?:,\d{3})*\.?\d{0,2})/gi,
    /(\d{1,3}(?:,\d{3})*\.\d{2})/g
  ];

  for (const pattern of amountPatterns) {
    const matches = [...cleanText.matchAll(pattern)];
    if (matches.length > 0) {
      const amounts = matches
        .map(match => parseFloat(match[1].replace(/,/g, '')))
        .filter(amount => !isNaN(amount) && amount > 0);
      
      if (amounts.length > 0) {
        // Take the largest reasonable amount (likely the total)
        result.amount = Math.max(...amounts.filter(amount => amount < 10000));
        break;
      }
    }
  }

  // Extract date patterns
  const datePatterns = [
    /(\d{1,2}\/\d{1,2}\/\d{2,4})/,
    /(\d{1,2}-\d{1,2}-\d{2,4})/,
    /(\w{3,9}\s+\d{1,2},?\s+\d{2,4})/i,
    /(\d{2}\/\d{2}\/\d{4})/,
    /(\d{4}-\d{2}-\d{2})/
  ];

  for (const pattern of datePatterns) {
    const match = cleanText.match(pattern);
    if (match) {
      result.date = match[1];
      break;
    }
  }

  // Extract merchant name (try multiple strategies)
  if (lines.length > 0) {
    // Strategy 1: First meaningful line
    const firstLine = lines[0].trim();
    if (firstLine.length > 2 && firstLine.length < 50 && !firstLine.match(/^\d/)) {
      result.merchant = firstLine;
    }
    
    // Strategy 2: Look for lines that don't contain numbers or common receipt words
    if (!result.merchant) {
      const excludeWords = /\b(receipt|bill|invoice|total|amount|date|time|tax|subtotal|payment|card|cash)\b/i;
      for (const line of lines.slice(0, 5)) {
        const cleanLine = line.trim();
        if (
          cleanLine.length > 3 && 
          cleanLine.length < 50 && 
          !cleanLine.match(/^\d/) &&
          !excludeWords.test(cleanLine) &&
          !cleanLine.includes('$')
        ) {
          result.merchant = cleanLine;
          break;
        }
      }
    }
  }

  // Clean up merchant name
  if (result.merchant) {
    result.merchant = result.merchant
      .replace(/[^\w\s&'-]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 50);
  }

  return result;
};

// New function to combine text from multiple pages
export const combinePageTexts = (pageTexts: string[]): string => {
  return pageTexts
    .filter(text => text.trim().length > 0)
    .join('\n\n--- PAGE BREAK ---\n\n');
};
