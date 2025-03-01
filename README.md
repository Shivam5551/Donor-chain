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
Timestamp	Block timestamp at the time of recording
📂 Project Structure
bash
Copy
Edit
/contracts        - Solidity smart contracts for donation logging
/client           - Frontend React app for user interface
/server           - Node.js backend for SquareUp integration &amp; blockchain handling
🚀 Getting Started (Development Setup)
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/Supreme2160/Hackathon-Contracts.git
cd Hackathon-Contracts
2. Install Dependencies
bash
Copy
Edit
npm install
3. Setup Environment Variables
Create a .env file in /server:

ini
Copy
Edit
SQUARE_ACCESS_TOKEN=your_squareup_access_token
SQUARE_LOCATION_ID=your_squareup_location_id
ETH_RPC_URL=https://mainnet.infura.io/v3/your_infura_project_id
PRIVATE_KEY=your_wallet_private_key (for submitting transactions)
CONTRACT_ADDRESS=deployed_contract_address_on_chain
4. Run the Backend
bash
Copy
Edit
cd server
npm start
5. Run the Frontend
bash
Copy
Edit
cd client
npm start
📈 Roadmap
 Integrate SquareUp for fiat donations
 Create Solidity smart contract for transparent donation logging
 Basic charity selection &amp; donation flow UI
 Charity verification and KYC system
 On-chain donation leaderboard
 Multi-chain support (Polygon, Arbitrum, Base)
 Email receipts containing blockchain donation links
🔗 Example Donation Flow
Donor selects "Clean Water Foundation" as the recipient.
Donor contributes $100 via SquareUp.
Backend confirms payment and logs the donation to Ethereum.
Smart contract logs the following:
Field	Example Value
Charity ID	CLEAN_WATER_001
Donor Hash	0x9f6e...8a4b
Amount	100 USD
Timestamp	block.timestamp
Donor receives confirmation with a link to view the donation on Etherscan.
📬 Contact &amp; Contributing
Contributions, feedback, and suggestions are welcome! Feel free to:

Fork the repository and open a pull request.
Open an issue to suggest features or report bugs.
📜 License
This project is licensed under the MIT License.

✉️ Contact
For questions, collaborations, or support, reach out via GitHub.