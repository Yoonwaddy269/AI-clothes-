
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
    // Initialize the AI client
    const ai = new GoogleGenAI({ apiKey });
    
    // Extract base64 data and mime type from the data URL
    const parts = imageDataUrl.split(',');
    if (parts.length < 2) {
      throw new Error("Invalid image format provided.");
    }
    
    const mimeTypePart = parts[0].match(/:(.*?);/);
    const mimeType = mimeTypePart ? mimeTypePart[1] : 'image/png';
    const base64Data = parts[1];

    const age = model.ageCategory.toLowerCase();
    const gender = model.gender.toLowerCase();

    // Construct the prompt with strict demographic enforcement
    const prompt = `Act as a world-class fashion photographer. 
Generate a professional fashion photoshoot using the provided clothing item.

DEMOGRAPHIC TARGET:
- AGE CATEGORY: ${model.ageCategory}
- GENDER: ${model.gender}
- MODEL PERSONA: ${model.name}

SCENE SETTINGS:
- POSE: ${pose}
- BACKGROUND: ${background} studio background

CRITICAL CONSTRAINTS:
1. AGE ACCURACY: If category is 'Kids', generate a child (~5-10 years old). If 'Youth', generate a teenager (~13-18 years old). If 'Adult', generate a mature adult. NEVER MIX THESE.
2. GENDER ACCURACY: The model must clearly represent the selected gender (${model.gender}).
3. CLOTHING INTEGRITY: Fit the provided garment perfectly onto the model. Maintain all original colors, patterns, and fabric textures.
4. LIGHTING: Use high-end commercial studio lighting with soft shadows.
5. REALISM: The final output must be indistinguishable from a real photograph.

Return ONLY the generated image. Do not include any text or descriptions.`;

    // Call generateContent for image editing/generation
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
        temperature: 0.5,
        topP: 0.9,
      },
    });

    const candidate = response.candidates?.[0];
    if (!candidate || !candidate.content || !candidate.content.parts) {
      throw new Error("The AI model did not return a valid response.");
    }

    for (const part of candidate.content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return `data:image/png;base64,${part.inlineData.data}`;
      }
    }

    const textPart = candidate.content.parts.find(p => p.text);
    if (textPart && textPart.text) {
      throw new Error(`AI Feedback: ${textPart.text}`);
    }

    throw new Error("No image was generated.");
  } catch (error: any) {
    console.error("Gemini Generation Error:", error);
    throw error;
  }
};
