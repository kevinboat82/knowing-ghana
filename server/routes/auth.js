import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const admin = await req.prisma.admin.findUnique({
            where: { username }
        });

        if (!admin) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const validPassword = await bcrypt.compare(password, admin.password);
        if (!validPassword) {
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        const token = jwt.sign(
            { id: admin.id, username: admin.username },
            process.env.JWT_SECRET,
            { expiresIn: '24h' }
        );

        res.json({ token, username: admin.username });
    } catch (error) {
        res.status(500).json({ error: 'Login failed' });
    }
});

// Register (for initial setup only)
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingAdmin = await req.prisma.admin.findUnique({
            where: { username }
        });

        if (existingAdmin) {
            return res.status(400).json({ error: 'Admin already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const admin = await req.prisma.admin.create({
            data: {
                username,
                password: hashedPassword
            }
        });

        res.status(201).json({ message: 'Admin created successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Verify token
router.get('/verify', async (req, res) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token) {
        return res.status(401).json({ valid: false });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        res.json({ valid: true, user: verified });
    } catch (err) {
        res.status(403).json({ valid: false });
    }
});

export default router;
