import express from "express";
import { SquareClient, SquareEnvironment } from "square";
import dotenv from "dotenv";
import crypto from "crypto"; // ✅ Import crypto for idempotencyKey

dotenv.config();

async function mainPayment({ amount }) {
    const client = new SquareClient({
        environment: SquareEnvironment.Sandbox,
        token: "EAAAl48nWIm89PIIL3eR1LkT2akbGJZCpm4lpDGgGTMaKZgA9MZLzqhrIJbQkUr8",
    });

    const res = await client.payments.create({
        idempotencyKey: crypto.randomUUID(),
        acceptPartialAuthorization: false,
        sourceId: "CASH",
        cashDetails: {
            buyerSuppliedMoney: {
                currency: "USD",
                amount: BigInt("1500000000"),
            },
        },
        amountMoney: {
            amount: BigInt(amount),
            currency: "USD",
        },
    });
    console.log(res);   
    // ✅ Convert BigInt values to Number
    const formattedResponse = {
        ...res.payment,
        amountMoney: {
            ...res.payment.amountMoney,
            amount: Number(res.payment.amountMoney.amount),
        },
        totalMoney: {
            ...res.payment.totalMoney,
            amount: Number(res.payment.totalMoney.amount),
        },
        cashDetails: {
            ...res.payment.cashDetails,
            buyerSuppliedMoney: {
                ...res.payment.cashDetails.buyerSuppliedMoney,
                amount: Number(res.payment.cashDetails.buyerSuppliedMoney.amount),
            },
            changeBackMoney: {
                ...res.payment.cashDetails.changeBackMoney,
                amount: Number(res.payment.cashDetails.changeBackMoney.amount),
            },
        },
    };

    return formattedResponse;
}

const paymentRouter = express.Router();

paymentRouter.post("/pay", async (req, res) => {
    try {
        const { sourceId, amount, currency } = req.body;
        console.log(req.body);

        const response = await mainPayment({ amount });
        console.log(response);

        res.json({ success: true, payment: response });
    } catch (error) {
        console.error("Payment Error:", error);
        res.status(500).json({ success: false, error: error.message });
    }
});

export default paymentRouter;
