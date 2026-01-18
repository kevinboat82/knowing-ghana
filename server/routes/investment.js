import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get all investment sectors
router.get('/', async (req, res) => {
    try {
        const investments = await req.prisma.investment.findMany({
            orderBy: { id: 'asc' }
        });
        res.json(investments);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch investments' });
    }
});

// Get single investment
router.get('/:id', async (req, res) => {
    try {
        const investment = await req.prisma.investment.findUnique({
            where: { id: parseInt(req.params.id) }
        });
        if (!investment) {
            return res.status(404).json({ error: 'Investment sector not found' });
        }
        res.json(investment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch investment' });
    }
});

// Create investment sector (protected)
router.post('/', authenticateToken, async (req, res) => {
    try {
        const { title, desc, roi } = req.body;
        const investment = await req.prisma.investment.create({
            data: { title, desc, roi }
        });
        res.status(201).json(investment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to create investment sector' });
    }
});

// Update investment sector (protected)
router.put('/:id', authenticateToken, async (req, res) => {
    try {
        const { title, desc, roi } = req.body;
        const investment = await req.prisma.investment.update({
            where: { id: parseInt(req.params.id) },
            data: { title, desc, roi }
        });
        res.json(investment);
    } catch (error) {
        res.status(500).json({ error: 'Failed to update investment sector' });
    }
});

// Delete investment sector (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await req.prisma.investment.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ message: 'Investment sector deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete investment sector' });
    }
});

export default router;
