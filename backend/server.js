import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';

dotenv.config();

connectDB();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);

import path from 'path';

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const __dirname = path.resolve(); // This is the root of the backend folder during npm start
  const frontendDistPath = path.join(__dirname, '../frontend/dist');
  
  app.use(express.static(frontendDistPath));

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(frontendDistPath, 'index.html'))
  );
} else {
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'E-Commerce API is running' });
  });
}

// Custom Error Handlers
app.use((req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});
