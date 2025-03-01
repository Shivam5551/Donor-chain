# Donor-chain
Donor-Chain is a next-generation donation platform that combines the convenience of traditional fiat payments via SquareUp with the transparency and immutability of the Ethereum blockchain. Every donation made on Donor-Chain is permanently recorded on the blockchain, ensuring public accountability and building trust between donors and charities.

🌟 Key Features
✅ Fiat Donations via SquareUp
Donors can contribute using credit/debit cards, Google Pay, Apple Pay, and other payment methods supported by SquareUp.

✅ Blockchain-Powered Transparency
Each successful donation is recorded on the Ethereum blockchain, where anyone can verify the donation details — fostering complete transparency.

✅ Hybrid Model
Leverages fiat payments for ease of access and blockchain for public verification — the best of both worlds.

✅ Smart Contract Integration
A Solidity smart contract logs essential donation data directly on-chain:

Donor hash (optional, for privacy)
Amount (in fiat)
Charity ID
Timestamp
✅ Simple User Experience
Users select a charity, complete a quick donation via SquareUp, and instantly see their donation logged on-chain.

🔗 Tech Stack
Layer	Technology
Frontend	React (or preferred frontend framework)
Backend	Node.js/Express (for SquareUp &amp; blockchain interaction)
Blockchain	Ethereum (smart contract built with Foundry)
Payment	SquareUp Payments API
Wallet Support	MetaMask (for charities to verify records)
Smart Contract Deployment	Foundry
⚙️ How It Works
User selects a verified charity and enters donation amount.

Payment is processed via SquareUp (supporting card, Apple Pay, Google Pay, etc.).

Upon successful payment, the backend records the donation details onto the Ethereum blockchain.

A Solidity smart contract logs:

Donor hash (optional)
Charity ID
Donation amount (fiat)
Timestamp
Donors and the public can view all donations using blockchain explorers (like Etherscan).

📜 Smart Contract Overview
The smart contract stores:

Field	Description
Donor ID	Hashed identifier of the donor (for privacy)
Charity ID	Unique identifier of the selected charity
Amount	Donation amount (in fiat currency units)
Timestamp	Block timestamp at the time of recording.
