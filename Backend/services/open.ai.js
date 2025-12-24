import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export async function generateCodeReviewOpenAI(code) {
  try {
    const response = await client.chat.completions.create({
      model: "gpt-5-mini",
      messages: [
        {
          role: "system",
          content: `You are a Senior Code Reviewer. Analyze the code and provide a concise, structured review.

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
- Consider edge cases`
        },
        {
          role: "user",
          content: `Please review the following code:\n\n${code}`
        }
      ],
      max_completion_tokens: 1024,
      temperature: 1
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API Error:", error);
    throw error;
  }
}