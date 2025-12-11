import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_KEY });

async function generateContent(prompt) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash-exp",
      contents: prompt,
      systemInstruction: `You are a Senior Code Reviewer. Analyze the code and provide a concise, structured review.

Focus on:
1. **Syntax Errors** - Identify any syntax issues
2. **Code Quality** - Readability, naming, structure
3. **Performance** - Inefficiencies, optimizations
4. **Security** - Vulnerabilities, unsafe patterns

Format your response as clean, concise markdown:
- Use headers (##) for sections
- Use bullet points for issues
- Keep explanations brief and actionable
- Only include code examples if critical
- Be direct and professional

Example response:
## Syntax Issues
- Missing parameters in function definition
- Missing return statement

## Fixed Code
\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

## Recommendations
- Add input validation
- Consider edge cases`,
      maxOutputTokens: 1024,
    });

    return response.text;
  } catch (error) {
    throw error;
  }
}

export { generateContent };
