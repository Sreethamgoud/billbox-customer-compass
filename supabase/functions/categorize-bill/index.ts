
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

interface BillData {
  text: string;
  merchant?: string;
  amount?: number;
  date?: string;
}

interface CategorizationResult {
  category: string;
  confidence: number;
  reasoning: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { billData }: { billData: BillData } = await req.json();
    console.log('Received bill data for categorization:', billData);

    const openaiApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openaiApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create prompt for OpenAI
    const prompt = `
Analyze this bill/receipt and categorize it into one of these categories:
- Utilities (electricity, gas, water, internet, phone)
- Groceries (food, beverages, household items)
- Entertainment (movies, games, subscriptions, dining out)
- Transportation (gas, public transport, uber, parking)
- Healthcare (medical, dental, pharmacy, insurance)
- Shopping (clothing, electronics, general retail)
- Housing (rent, mortgage, home maintenance)
- Other

Bill Information:
Text: "${billData.text}"
${billData.merchant ? `Merchant: ${billData.merchant}` : ''}
${billData.amount ? `Amount: $${billData.amount}` : ''}
${billData.date ? `Date: ${billData.date}` : ''}

Respond with a JSON object containing:
- category: the most appropriate category from the list above
- confidence: a number from 0-100 indicating how confident you are
- reasoning: a brief explanation of why you chose this category

Example response:
{
  "category": "Utilities",
  "confidence": 95,
  "reasoning": "The bill appears to be from an electric company based on the text mentioning electricity usage and utility provider name."
}
`;

    console.log('Sending request to OpenAI...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openaiApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are a financial assistant that categorizes bills and receipts. Always respond with valid JSON.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.3,
        max_tokens: 200,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error('OpenAI API error:', errorData);
      throw new Error(`OpenAI API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI response:', data);

    const aiResponse = data.choices[0]?.message?.content;
    if (!aiResponse) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    let result: CategorizationResult;
    try {
      result = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Failed to parse OpenAI response:', aiResponse);
      // Fallback categorization
      result = {
        category: 'Other',
        confidence: 50,
        reasoning: 'Could not determine category from bill text'
      };
    }

    console.log('Categorization result:', result);

    return new Response(
      JSON.stringify(result),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );

  } catch (error) {
    console.error('Error in categorize-bill function:', error);
    
    return new Response(
      JSON.stringify({ 
        error: error.message,
        category: 'Other',
        confidence: 0,
        reasoning: 'Error occurred during categorization'
      }),
      { 
        status: 500,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        } 
      }
    );
  }
});
