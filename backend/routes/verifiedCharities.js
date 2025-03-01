import { authMiddleware } from "../middleware/authMiddleware.js";
import express from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
const verifiedCharity = express.Router();

// Search for a verified charity
verifiedCharity.get('/search', authMiddleware, async (req, res) => {
    try {
        const { q } = req.query;
        if (!q) return res.status(400).json({ message: "Search query is required" });
        
        const charities = await prisma.organization.findMany({
            where: {
                isVerified: true,
                OR: [
                    { charityName: { contains: q, mode: "insensitive" } },
                    { charitySector: { contains: q, mode: "insensitive" } }
                ]
            },
            select: { id: true, charityName: true, charitySector: true, state: true }
        });
        
        res.json(charities);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

// Get verified charities in bulk with pagination
verifiedCharity.get('/bulk', authMiddleware, async (req, res) => {
    try {
        const { page = 1, limit = 10 } = req.query;
        const skip = (parseInt(page) - 1) * parseInt(limit);
        
        const charities = await prisma.organization.findMany({
            where: { isVerified: true },
            skip,
            take: parseInt(limit),
            select: { id: true, charityName: true, charitySector: true, state: true }
        });

        res.json(charities);
    } catch (error) {
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

export default verifiedCharity;
