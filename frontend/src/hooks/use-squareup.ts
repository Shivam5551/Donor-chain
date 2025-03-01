import { useState, useEffect } from "react";
import Web3 from "web3";
import { SquareupContract_ABI, SquareupContract_Address } from "../utils/SquareContract";


export const useSquareup = () => {
    const [totalPayments, setTotalPayments] = useState<number | null>(null);
    const [userPaymentCount, setUserPaymentCount] = useState<number | null>(null);
    const [userPayments, setUserPayments] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (window.ethereum) {
            fetchTotalPayments();
        }
    }, []);

    const fetchTotalPayments = async () => {
        try {
            setLoading(true);
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
            const total = await contract.methods.getTotalPayments().call();
            setTotalPayments(Number(total));
        } catch (err) {
            setError("Error fetching total payments");
            console.error("Error fetching total payments:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPaymentCount = async (userAddress: string) => {
        try {
            setLoading(true);
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
            const count = await contract.methods.getUserPaymentCount(userAddress).call();
            setUserPaymentCount(Number(count));
        } catch (err) {
            setError("Error fetching user payment count");
            console.error("Error fetching user payment count:", err);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserPayments = async (userAddress: string) => {
        try {
            setLoading(true);
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
            const count = await contract.methods.getUserPaymentCount(userAddress).call();
            const payments = [];
            for (let i = 0; i < count; i++) {
                const payment = await contract.methods.getUserPayment(userAddress, i).call();
                payments.push(payment);
            }
            setUserPayments(payments);
        } catch (err) {
            setError("Error fetching user payments");
            console.error("Error fetching user payments:", err);
        } finally {
            setLoading(false);
        }
    };

    const storePayment = async (
        userAddress: string,
        transactionId: string,
        amount: number,
        goal: number,
        remainingBalance: number,
        currency: string,
        versionToken: string
    ) => {
        try {
            if (!window.ethereum) {
                throw new Error("MetaMask is not installed");
            }
            setLoading(true);
            const web3 = new Web3(window.ethereum);
            const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
            const accounts = await web3.eth.getAccounts();
            await contract.methods.storePayment(transactionId, amount, goal, remainingBalance, currency, versionToken).send({ from: accounts[0] });
        } catch (err) {
            setError("Error storing payment");
            console.error("Error storing payment:", err);
        } finally {
            setLoading(false);
        }
    };

    return {
        totalPayments,
        userPaymentCount,
        userPayments,
        fetchTotalPayments,
        fetchUserPaymentCount,
        fetchUserPayments,
        storePayment,
        loading,
        error,
    };
};
