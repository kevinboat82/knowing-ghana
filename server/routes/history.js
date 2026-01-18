import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all history events
router.get('/', async (req, res) => {
    try {
        const history = await req.prisma.history.findMany({
            orderBy: { year: 'asc' }
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history' });
    }
});

// Get single history event
router.get('/:id', async (req, res) => {
    try {
        const history = await req.prisma.history.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!history) {
            return res.status(404).json({ error: 'History event not found' });
        }
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch history event' });
    }
});

// Create history event (protected)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { year, title, desc, image } = req.body;
        const history = await req.prisma.history.create({
            data: { year, title, desc, image }
        });
        res.status(201).json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create history event' });
    }
});

// Update history event (protected)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { year, title, desc, image } = req.body;
        const history = await req.prisma.history.update({
            where: { id: parseInt(req.params.id) },
            data: { year, title, desc, image }
        });
        res.json(history);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update history event' });
    }
});

// Delete history event (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await req.prisma.history.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ message: 'History event deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete history event' });
    }
});

export default router;
