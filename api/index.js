import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import Taskrouter from './routes/Task.route.js'

dotenv.config()

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())

const allowedOrigins = [
  'http://localhost:5173',
  'https://task-manager-seven-black.vercel.app',
  'https://task-manager-iy7peces9-eishita-pariks-projects.vercel.app', // ✅ NEW frontend URL
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


// routes
app.use('/api/task', Taskrouter)

mongoose.connect(process.env.MONGODB_CONN)
  .then(() => {
    console.log('✅ Database connected.')
  })
  .catch(err => {
    console.log('❌ Database connection failed.', err)
  })

app.listen(PORT, () => {
  console.log('🚀 Server running on port:', PORT)
})
