import express from 'express';
import userRoute from './user.js';
import orgRoute from './orgRoute.js'
import verifiedCharity from './verifiedCharities.js';
import paymentRouter from './payment.js';

export const router = express.Router();


router.use('/user', userRoute);
router.use('/org', orgRoute);
router.use('/verified', verifiedCharity);
router.use('/payment', paymentRouter);