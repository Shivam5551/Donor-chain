import { authMiddleware } from '../middleware/authMiddleware.js';
import express from 'express'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const orgRouter = express.Router();

// Organization Signup
orgRouter.post('/signup', async (req, res) => {
    try {
        const { charityName, email, password, state, charityId, charitySector } = req.body;
        let org = await prisma.organization.findUnique({ where: { email } });
        if (org) return res.status(400).json({ message: 'Organization already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        org = await prisma.organization.create({
            data: { charityName, email, password: hashedPassword, state, charityId, charitySector }
        });

        res.status(201).json({ success: true, message: 'Organization registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// Organization Signin
orgRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        const org = await prisma.organization.findUnique({ where: { email } });
        if (!org) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, org.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = jwt.sign({ orgId: org.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({ success: true, token, org: { id: org.id, charityName: org.charityName, email: org.email, isVerified: org.isVerified } });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

export default orgRouter;