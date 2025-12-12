import { generateContent } from "../services/ai.services.js";


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
           timestamp: new Date().toISOString()
       });
    }catch(error){
        console.error("Error generating content:", error);
        res.status(500).json({
            success: false,
            error: error.message || "Failed to generate content",
            code: error.status || 500
        });
    }
}