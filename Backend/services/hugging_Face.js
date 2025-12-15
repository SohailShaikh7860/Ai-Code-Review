import { InferenceClient } from "@huggingface/inference";

const client = new InferenceClient(process.env.HUGGINGFACEHUB_API_TOKEN);

async function generateCodeReview(code) {
  const systemPrompt = `You are a Senior Code Reviewer. Analyze code and provide structured markdown feedback.

Format your response with these sections:
## Syntax Issues
## Code Quality  
## Performance
## Security
## Recommendations

Be concise, direct, and actionable.`;

  try {
    const chatCompletion = await client.chatCompletion({
      model: "Qwen/Qwen2.5-Coder-32B-Instruct",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Review this code:\n\n\`\`\`\n${code}\n\`\`\`` }
      ],
      max_tokens: 1024,
      temperature: 0.3,
    });

    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error('Hugging Face Error:', error.message);
    
    if (error.message?.includes('429')) {
      throw new Error("Hugging Face quota exceeded. Try again later.");
    }
    
    throw error;
  }
}

export { generateCodeReview };