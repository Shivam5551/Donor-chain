import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useWallet } from "../hooks/use-wallet";
import { sendDonation } from "../utils/web3";
import { Appbar } from "../components/Appbar.tsx";
import { Footer } from "../components/Footer";
import { generateCoupon, getAchievements } from "../utils/rewards.ts";
import axios from "axios";

export const DonateNow: React.FC = () => {
  const [searchParams] = useSearchParams();
  const receiver = searchParams.get("receiver");
  const { walletAddress, handleConnect } = useWallet();

  const [amount, setAmount] = useState<string>("1");
  const [message, setMessage] = useState<string>("");
  const [status, setStatus] = useState<{ type: "success" | "error" | "info"; message: string } | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string | null>(null);
  const [achievements, setAchievements] = useState<string[]>([]);
  console.log(status, coupon, achievements);

  const validateInput = () => {
    if (!walletAddress) {
      setStatus({ type: "error", message: "Please connect your wallet first." });
      return false;
    }

    if (!receiver) {
      setStatus({ type: "error", message: "Invalid receiver address." });
      return false;
    }

    const amountValue = Number(amount);
    if (!amount || isNaN(amountValue) || amountValue <= 0) {
      setStatus({ type: "error", message: "Enter a valid ETH amount." });
      return false;
    }

    return true;
  };

  const handleDonate = async () => {
    if (!validateInput()) return;

    try {
      setLoading(true);
      setStatus({ type: "info", message: "Processing donation..." });

      const txHash = await sendDonation(amount, message);
      setStatus({ type: "success", message: `Donation successful! Transaction Hash: ${txHash}` });

      const newCoupon = generateCoupon();
      const newAchievements = getAchievements(Number(amount));

      setCoupon(newCoupon);
      setAchievements(newAchievements);

      setAmount("1");
      setMessage("");
    } catch (error: any) {
      setStatus({ type: "error", message: `Transaction failed: ${error.message}` });
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    try {
      const sourceId = "Source-id"; // Replace with actual payment source ID
      const currency = "USD";

      const response = await axios.post("http://localhost:3000/api/v1/payment/pay", {
        sourceId,
        amount,
        currency,
      });

      const data = await response.data;
      console.log(data);

      if (data.success) {
        setStatus({ type: "success", message: `Payment Successful! Transaction ID: ${data.payment.id}` });
      } else {
        setStatus({ type: "error", message: "Payment Failed!" });
      }
    } catch (error: any) {
      console.error(error);
      setStatus({ type: "error", message: `Error: ${error.message}` });
    }
  };

  return (
    <div className="bg-white text-black min-h-screen flex flex-col">
      <Appbar />
      <div className="flex-1 mt-20 flex flex-col items-center justify-center p-6">
        <h1 className="text-3xl font-bold mb-4">Donate to Charity</h1>
        <p className="text-gray-500 mb-6 text-center max-w-md">
          Your contribution supports impactful causes. Every transaction is secured and transparent on the blockchain.
        </p>

        <div className="grid grid-cols-1 gap-6 w-full max-w-lg ">
          <div className="p-6 bg-gray-100 shadow-lg rounded-xl w-full">
            {receiver && (
              <p className="text-gray-600 mb-4">
                Donating to: <span className="font-mono text-green-600 break-all">{receiver}</span>
              </p>
            )}
            <input
              type="number"
              placeholder="Amount (ETH)"
              className="p-3 w-full rounded-lg bg-white border border-gray-300 text-black mb-4"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <input
              type="text"
              placeholder="Message (Optional)"
              className="p-3 w-full rounded-lg bg-white border border-gray-300 text-black mb-4"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />

            {!walletAddress ? (
              <button
                onClick={handleConnect}
                className="w-full bg-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
              >
                Connect Wallet
              </button>
            ) : (
              <>

                <button
                  onClick={handleDonate}
                  disabled={loading || Number(amount) <= 0.001}
                  className={`w-full px-6 py-3 rounded-lg font-semibold transition duration-200 ${loading || Number(amount) <= 0.001
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                  {loading ? "Processing..." : "Pay Using ETH"}
                </button>
              </>
            )}
            <button
              onClick={handlePayment}
              className="w-full px-6 py-3 mt-4 rounded-lg font-semibold bg-purple-600 hover:bg-purple-700 transition duration-200"
            >
              Pay Using Payment Gateway
            </button>

          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};
