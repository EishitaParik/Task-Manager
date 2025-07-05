import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Taskrouter from './routes/Task.route.js'

dotenv.config()

const PORT = process.env.PORT

const app = express()

app.use(express.json())

// ✅ CORS configuration (for localhost + Vercel frontend)
const allowedOrigins = [
  'http://localhost:5173',
  'https://task-manager-7ns0.onrender.com'
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('❌ Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// ✅ Handle preflight requests
app.options('*', cors());

// ✅ Routes
app.use('/api/task', Taskrouter);

// ✅ MongoDB connection
mongoose.connect(process.env.MONGODB_CONN).then(() => {
  console.log('✅ Database connected.');
}).catch(err => {
  console.log('❌ Database connection failed.', err);
});

// ✅ Start server
app.listen(PORT, () => {
  console.log('🚀 Server running on port:', PORT);
});