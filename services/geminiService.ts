
import { GoogleGenAI } from "@google/genai";

/**
 * Generates a virtual try-on image using the Gemini 2.5 Flash Image model.
 * This model takes a product image and a descriptive prompt to generate
 * a realistic model photoshoot.
 */
export const generateVirtualTryOn = async (
  imageDataUrl: string,
  modelName: string,
  pose: string,
  background: string
): Promise<string> => {
  // Ensure the API key is available
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    throw new Error("Gemini API Key is not configured in the environment.");
  }

  try {
    // Initialize the AI client inside the call to ensure fresh configuration
    const ai = new GoogleGenAI({ apiKey });
    
    // Extract base64 data and mime type from the data URL
    // Format: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA..."
    const parts = imageDataUrl.split(',');
    if (parts.length < 2) {
      throw new Error("Invalid image format provided.");
    }
    
    const mimeTypePart = parts[0].match(/:(.*?);/);
    const mimeType = mimeTypePart ? mimeTypePart[1] : 'image/png';
    const base64Data = parts[1];

    // Construct the prompt for high-quality fashion generation
    const prompt = `Act as a high-end fashion photographer and AI stylist. 
Using the provided clothing item, generate a professional studio photoshoot.

TARGET MODEL: ${modelName}
POSE: ${pose}
SETTING: ${background} background

INSTRUCTIONS:
1. Fit the clothing item perfectly onto the model's body.
2. Maintain the original texture, color, fabric details, and design patterns of the garment.
3. Use high-end studio lighting to create realistic shadows and depth.
4. The result must look like a real, high-resolution commercial fashion photograph.
5. Return ONLY the generated image.`;

    // Call generateContent using the recommended structure for image editing/generation
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: [{
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType,
            },
          },
          {
            text: prompt,
          },
        ],
      }],
      config: {
        // We avoid responseMimeType and responseSchema as they are not supported for this model series
        temperature: 0.7,
        topP: 0.95,
      },
    });

    // Check for valid candidates and content parts
    const candidate = response.candidates?.[0];
    if (!candidate || !candidate.content || !candidate.content.parts) {
      throw new Error("The AI model did not return a valid response. Please try again.");
    }

    // Iterate through parts to find the generated image (inlineData)
    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.data) {
        // Return the base64 image string with the correct prefix
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    // If no image part was found, check if there was a text explanation (sometimes happens on safety blocks)
    const textResponse = candidate.content.parts.find(p => p.text)?.text