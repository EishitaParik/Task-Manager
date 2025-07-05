import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import Taskrouter from './routes/Task.route.js';

dotenv.config();

const PORT = process.env.PORT || 10000;
const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173',
  'https://task-manager-seven-black.vercel.app', // your frontend
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use('/api/task', Taskrouter);

mongoose.connect(process.env.MONGODB_CONN)
  .then(() => console.log('✅ MongoDB connected'))
  .catch((err) => console.log('❌ MongoDB error', err));

app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
