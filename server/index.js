import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { PrismaClient } from '@prisma/client';

// Routes
import historyRoutes from './routes/history.js';
import manifestoRoutes from './routes/manifesto.js';
import investmentRoutes from './routes/investment.js';
import authRoutes from './routes/auth.js';
import contactRoutes from './routes/contact.js';

dotenv.config();

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the React app
import path from 'path';
import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the React app build directory (../dist)
app.use(express.static(path.join(__dirname, '../dist')));

// Make prisma available to routes
app.use((req, res, next) => {
    req.prisma = prisma;
    next();
});

// Routes
app.use('/api/history', historyRoutes);
app.use('/api/manifesto', manifestoRoutes);
app.use('/api/investments', investmentRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/contact', contactRoutes);

// Health check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Knowing Ghana API is running' });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// Header check for API calls
app.use('/api', (req, res, next) => {
    next();
});

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(PORT, () => {
    console.log(`🇬🇭 Knowing Ghana Server running on port ${PORT}`);
});

export { prisma };
