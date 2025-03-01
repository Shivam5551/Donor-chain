import Web3 from "web3";

declare global {
  interface Window {
    ethereum: any;
  }
}

// Updated contract address
export const CONTRACT_ADDRESS = "0x7114FcE3F0385731D814C7962B82459C198A4096";

// Updated ABI from the provided key
const CONTRACT_ABI = [
  {
    "inputs": [{ "internalType": "address", "name": "_organization", "type": "address" }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      { "indexed": true, "internalType": "address", "name": "donor", "type": "address" },
      { "indexed": false, "internalType": "uint256", "name": "amount", "type": "uint256" }
    ],
    "name": "DonationProcessed",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "pay",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "pledge",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{ "internalType": "address", "name": "donor", "type": "address" }],
    "name": "processDonation",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getContractBalance",
    "outputs": [{ "internalType": "uint256", "name": "", "type": "uint256" }],
    "stateMutability": "view",
    "type": "function"
  }
];

// Connect wallet function
export async function connectWallet(): Promise<string | null> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed.");
  }

  try {
    const accounts: string[] = await window.ethereum.request({ method: "eth_requestAccounts" });
    return accounts[0] || null;
  } catch (error) {
    console.error("Error connecting wallet:", error);
    return null;
  }
}

// Disconnect wallet function
export async function disconnectWallet(): Promise<boolean> {
  try {
    if (window.ethereum) {
      await window.ethereum.request({
        method: "wallet_requestPermissions",
        params: [{ eth_accounts: {} }],
      });
    }
    return true;
  } catch (error) {
    console.error("Error disconnecting wallet:", error);
    return false;
  }
}

// Get balance of an address
export async function getBalance(address: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask is not installed");
  }

  try {
    const web3 = new Web3(window.ethereum);
    const balance = await web3.eth.getBalance(address);
    if (balance && typeof balance === 'string') {
      if (balance && typeof balance === 'string') {
        return web3.utils.fromWei(balance, "ether"); // Convert from Wei to ETH
      } else {
        throw new Error("Invalid balance type");
      }
    } else {
      throw new Error("Invalid balance type");
    }
  } catch (error) {
    console.error("Error fetching balance:", error);
    return "0";
  }
}

// Send donation function
export async function sendDonation(amount: string, _message: string): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  try {
    const web3 = new Web3(window.ethereum);
    const accounts = await web3.eth.getAccounts();
    const sender = accounts[0];

    if (!sender) {
      throw new Error("No connected wallet");
    }

    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const value = web3.utils.toWei(amount, "ether");

    const tx = await contract.methods.pay().send({
      from: sender,
      value: value,
    });

    return tx.transactionHash;
  } catch (error) {
    throw new Error(error instanceof Error ? `Transaction failed: ${error.message}` : "Transaction failed");
  }
}

// Get contract balance
export async function getContractBalance(): Promise<string> {
  if (!window.ethereum) {
    throw new Error("MetaMask not installed");
  }

  try {
    const web3 = new Web3(window.ethereum);
    const contract = new web3.eth.Contract(CONTRACT_ABI, CONTRACT_ADDRESS);
    const balance: string = await contract.methods.getContractBalance().call();
    return web3.utils.fromWei(balance, "ether");
  } catch (error) {
    console.error("Error fetching contract balance:", error);
    return "0";
  }
}
