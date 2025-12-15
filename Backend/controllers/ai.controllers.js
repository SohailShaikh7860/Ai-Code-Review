import { generateContent } from "../services/ai.services.js";
import { generateCodeReview } from "../services/hugging_Face.js";


export const generateAIContent = async (req, res) => {
    const { code } = req.body;

    if(!code) {
        return res.status(400).json({error: "Code is required"});
    }

    try{
       
       const aiResponse = await generateContent(code);
       
       res.status(200).json({
           success: true,
           review: aiResponse,
           provider: "Gemini AI",
           timestamp: new Date().toISOString()
       });
    } catch(error){
        console.error("Gemini AI Error:", error);
        
        if (error.status === 429 || error.status === 503) {
            try {
                console.log("Falling back to Hugging Face...");
                const hfResponse = await generateCodeReview(code);
                
                return res.status(200).json({
                    success: true,
                    review: hfResponse,
                    provider: "Hugging Face",
                    timestamp: new Date().toISOString()
                });
            } catch (hfError) {
                console.error("Hugging Face Error:", hfError);
                return res.status(500).json({
                    success: false,
                    error: "Both AI services are unavailable. Please try again later.",
                    code: 500
                });
            }
        }
        
        res.status(500).json({
            success: false,
            error: error.message || "Failed to generate content",
            code: error.status || 500
        });
    }
}