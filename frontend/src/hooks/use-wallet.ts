import { useState, useEffect } from "react";
import { connectWallet, disconnectWallet, sendDonation } from "../utils/web3";
import { useError } from "./use-error";

export const useWallet = () => {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [isConnecting, setIsConnecting] = useState(false);
    const [paymentStatus, setPaymentStatus] = useState<string | null>(null);
    const { errorMessage, setErrorMessage } = useError();

    useEffect(() => {
        const checkWallet = async () => {
            if (window.ethereum) {
                try {
                    const accounts: string[] = await window.ethereum.request({ method: "eth_accounts" });
                    setWalletAddress(accounts[0] || null);
                } catch (error) {
                    console.error("Error fetching accounts:", error);
                }
            }
        };

        const handleAccountsChanged = (accounts: string[]) => {
            setWalletAddress(accounts[0] || null);
        };

        checkWallet();
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener("accountsChanged", handleAccountsChanged);
            }
        };
    }, []);

    const handleConnect = async () => {
        try {
            setIsConnecting(true);
            const address = await connectWallet();
            setWalletAddress(address);
        } catch (error) {
            setErrorMessage(error instanceof Error ? error.message : "Unable to connect to wallet");
        } finally {
            setIsConnecting(false);
        }
    };

    const handleDisconnect = async () => {
        try {
            await disconnectWallet();
            setWalletAddress(null);
        } catch (error) {
            setErrorMessage("Unable to disconnect wallet");
        }
    };

    const handlePayment = async (amount: string, message: string) => {
        try {
            setPaymentStatus("Processing...");
            const txHash = await sendDonation(amount, message);
            setPaymentStatus(`Success: Transaction Hash - ${txHash}`);
        } catch (error) {
            setPaymentStatus(error instanceof Error ? `Failed: ${error.message}` : "Payment failed");
        }
    };

    return { 
        walletAddress, 
        isConnecting, 
        handleConnect, 
        handleDisconnect, 
        handlePayment, 
        paymentStatus, 
        errorMessage, 
        setErrorMessage 
    };
};
