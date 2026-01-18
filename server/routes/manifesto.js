import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all manifesto items
router.get('/', async (req, res) => {
    try {
        const manifesto = await req.prisma.manifesto.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(manifesto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch manifesto items' });
    }
});

// Get manifesto by category
router.get('/category/:category', async (req, res) => {
    try {
        const manifesto = await req.prisma.manifesto.findMany({
            where: { category: req.params.category },
            orderBy: { progress: 'desc' }
        });
        res.json(manifesto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch manifesto items' });
    }
});

// Get overall progress stats
router.get('/stats', async (req, res) => {
    try {
        const items = await req.prisma.manifesto.findMany();
        const total = items.length;
        const avgProgress = total > 0
            ? items.reduce((acc, item) => acc + item.progress, 0) / total
            : 0;
        const completed = items.filter(item => item.status === 'completed').length;
        const inProgress = items.filter(item => item.status === 'in_progress').length;
        const pending = items.filter(item => item.status === 'pending' || item.status === 'started').length;

        res.json({
            total,
            avgProgress: Math.round(avgProgress * 10) / 10,
            completed,
            inProgress,
            pending
        });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch stats' });
    }
});

// Create manifesto item (protected)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { policy, category, status, progress, details } = req.body;
        const manifesto = await req.prisma.manifesto.create({
            data: { policy, category, status, progress: parseInt(progress), details }
        });
        res.status(201).json(manifesto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create manifesto item' });
    }
});

// Update manifesto item (protected)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { policy, category, status, progress, details } = req.body;
        const manifesto = await req.prisma.manifesto.update({
            where: { id: parseInt(req.params.id) },
            data: {
                policy,
                category,
                status,
                progress: parseInt(progress),
                details
            }
        });
        res.json(manifesto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update manifesto item' });
    }
});

// Update progress only (protected)
router.patch('/:id/progress', authenticateToken, async (req, res) => {
    try {
        const { progress, status } = req.body;
        const manifesto = await req.prisma.manifesto.update({
            where: { id: parseInt(req.params.id) },
            data: {
                progress: parseInt(progress),
                status: status || (progress >= 100 ? 'completed' : progress > 0 ? 'in_progress' : 'pending')
            }
        });
        res.json(manifesto);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update progress' });
    }
});

// Delete manifesto item (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await req.prisma.manifesto.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ message: 'Manifesto item deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete manifesto item' });
    }
});

export default router;
