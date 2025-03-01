// import Web3 from "web3";
// import { SquareupContract_ABI, SquareupContract_Address } from "./SquareContract";
// export async function getTotalPayments(): Promise<number> {
//     try {
//       const web3 = new Web3(window.ethereum);
//       const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
//       return await contract.methods.getTotalPayments().call();
//     } catch (error) {
//       console.error("Error fetching total payments:", error);
//       throw error;
//       }
//   }
  
//   // Get User Payment Count
//   export async function getUserPaymentCount(userAddress: string): Promise<number> {
//     try {
//       const web3 = new Web3(window.ethereum);
//       const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
//       return await contract.methods.getUserPaymentCount(userAddress).call();
//     } catch (error) {
//       console.error("Error fetching user payment count:", error);
//       throw error;
//     }
  
//   // export async function getUserPayment(userAddress: string, index: number) {
//   //   try {
//   //     const web3 = new Web3(window.ethereum);
//   //     const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
//   //     return await contract.methods.getUserPayment(userAddress, index).call();
//   //   } catch (error) {
//   //     console.error("Error fetching user payment:", error);
//   //     throw error;
//   //   }
//   // }
  
// //   Store a Payment
//   export async function storePayment(
//     userAddress: string,
//     transactionId: string,
//     amount: number,
//     goal: number,
//     remainingBalance: number,
//     currency: string,
//     versionToken: string
//   ): Promise<void> {
//     if (!window.ethereum) {
//       throw new Error("MetaMask is not installed");
//     }
//     try {
//       const web3 = new Web3(window.ethereum);
//       const contract = new web3.eth.Contract(SquareupContract_ABI, SquareupContract_Address);
//       const accounts = await web3.eth.getAccounts();
//       await contract.methods.storePayment(transactionId, amount, goal, remainingBalance, currency, versionToken).send({ from: accounts[0] });
//     } catch (error) {
//       console.error("Error storing payment:", error);
//       throw error;
//     }
//   }
  