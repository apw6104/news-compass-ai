
// Temporary storage for API key
let geminiApiKey = '';

// Function to set the API key
export const setGeminiApiKey = (key: string) => {
  geminiApiKey = key;
};

export const detectFakeNews = async (title: string, content: string, source: string): Promise<number> => {
  try {
    // If no API key is set, return default value
    if (!geminiApiKey) {
      console.warn('No Gemini API key provided');
      return 0.5;
    }

    const prompt = `Analyze this news article for credibility. Return only a number between 0 and 1, where 0 means completely reliable and 1 means likely fake news.

Title: ${title}
Content: ${content}
Source: ${source}

Consider factors like:
- Sensationalism in the title
- Emotional language
- Source credibility
- Presence of verifiable facts
- Writing style and professionalism`;

    const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${geminiApiKey}`
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          topK: 1,
          topP: 1,
          maxOutputTokens: 1024,
        },
      })
    });

    if (!response.ok) {
      throw new Error('Failed to analyze with Gemini AI');
    }

    const data = await response.json();
    const result = data.candidates[0]?.content?.parts[0]?.text;
    
    // Extract the number from the response
    const score = parseFloat(result);
    return isNaN(score) ? 0.5 : Math.min(Math.max(score, 0), 1);
  } catch (error) {
    console.error('Error in fake news detection:', error);
    return 0.5; // Default score on error
  }
};
