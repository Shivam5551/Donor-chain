import { authMiddleware } from '../middleware/authMiddleware.js';
import express from 'express'
import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const userRouter = express.Router();

// User Signup
userRouter.post('/signup', async (req, res) => {
    try {
        const { fullName, email, password, state } = req.body;
        let user = await prisma.user.findUnique({ where: { email } });
        if (user) return res.status(400).json({ message: 'User already exists' });

        const hashedPassword = await bcrypt.hash(password, 10);
        user = await prisma.user.create({
            data: { fullName, email, password: hashedPassword, state }
        });

        res.status(201).json({ success: true, message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});

// User Signin
userRouter.post('/signin', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(req.body);
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return res.status(400).json({ message: 'Invalid credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

        const token = await jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.json({success: true, token, user: { id: user.id, fullName: user.fullName, email: user.email } });
    } catch (error) {
        console.log(error);
        
        res.status(500).json({ message: 'Server Error', error: error.message });
    }
});
export default userRouter;