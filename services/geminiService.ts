
import { GoogleGenAI } from "@google/genai";
import { Model } from "../types";

/**
 * Generates a virtual try-on image using the Gemini 2.5 Flash Image model.
 * This model takes a product image and a descriptive prompt to generate
 * a realistic model photoshoot.
 */
export const generateVirtualTryOn = async (
  imageDataUrl: string,
  model: Model,
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
    const parts = imageDataUrl.split(',');
    if (parts.length < 2) {
      throw new Error("Invalid image format provided.");
    }
    
    const mimeTypePart = parts[0].match(/:(.*?);/);
    const mimeType = mimeTypePart ? mimeTypePart[1] : 'image/png';
    const base64Data = parts[1];

    const isKidsCategory = model.category.toLowerCase().includes('kids');

    // Construct the prompt for high-quality fashion generation
    const prompt = `Act as a high-end fashion photographer and AI stylist. 
Using the provided clothing item, generate a professional studio photoshoot.

TARGET MODEL: ${model.name}
CATEGORY: ${model.category}
POSE: ${pose}
SETTING: ${background} background

${isKidsCategory ? `
CRITICAL INSTRUCTIONS FOR KIDS CATEGORY:
1. When the category is 'kids', the system must generate only child images.
2. Do not generate adult or mature-looking subjects.
3. Always ensure the output is age-appropriate and matches the selected category.
4. If there is any ambiguity, default to clearly child-like appearance.
5. The subject must be a young child or juvenile model appropriate for kids clothing.` : ''}

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
        temperature: 0.4, // Reduced temperature for better adherence to safety and realism constraints
        topP: 0.9,
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

    // If no image part was found, check for a text explanation (safety blocks)
    const textPart = candidate.content.parts.find(p => p.text);
    if (textPart && textPart.text) {
      throw new Error(`Generation blocked: ${textPart.text}`);
    }

    throw new Error("No image data was found in the model's response.");
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    
    if (error.message?.includes("xhr error") || error.code === 500) {
      throw new Error("The AI service is temporarily unavailable. Please try again.");
    }
    
    throw error;
  }
};
