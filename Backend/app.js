import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import aiRoutes from './routes/ai.routes.js';

dotenv.config();

const app = express();

const allowedOrigins = process.env.FRONTEND_API_URL;

app.use(cors({
    origin: allowedOrigins,
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('API is running...');
});


app.use('/ai', aiRoutes);

export default app;