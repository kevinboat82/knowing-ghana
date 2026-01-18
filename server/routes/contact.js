import express from 'express';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Submit contact form (public)
router.post('/', async (req, res) => {
    try {
        const { name, email, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const contact = await req.prisma.contact.create({
            data: { name, email, message }
        });
        res.status(201).json({ message: 'Message sent successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to send message' });
    }
});

// Get all contact submissions (protected - admin only)
router.get('/', authenticateToken, async (req, res) => {
    try {
        const contacts = await req.prisma.contact.findMany({
            orderBy: { createdAt: 'desc' }
        });
        res.json(contacts);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch contacts' });
    }
});

// Delete contact (protected)
router.delete('/:id', authenticateToken, async (req, res) => {
    try {
        await req.prisma.contact.delete({
            where: { id: parseInt(req.params.id) }
        });
        res.json({ message: 'Contact deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete contact' });
    }
});

export default router;
