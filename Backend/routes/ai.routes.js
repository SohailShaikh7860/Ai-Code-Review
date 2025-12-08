import express from 'express';
import { generateAIContent } from '../controllers/ai.controllers.js';

const route = express.Router();

route.post('/generate', generateAIContent);

export default route;