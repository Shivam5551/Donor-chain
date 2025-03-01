// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MonthlyDonation {
    address public organization;
    uint256 public constant MONTH = 30 days;

    struct Pledge {
        uint256 amount; // Amount pledged in ETH
        uint256 nextPaymentTimestamp;
    }
    mapping(address => uint256) public pledgerIndex; 
    mapping(address => Pledge) public pledges;

    event PledgeCreated(address indexed donor, uint256 amount);
    event DonationProcessed(address indexed donor, uint256 amount);
    event FundsWithdrawn(address indexed organization, uint256 amount);
    event PledgeCancelled(address indexed donor);
    event Fundonetime(address indexed donor,uint amount);
    address[] public pledgers;

    constructor(address _organization) {
        require(_organization != address(0), "Invalid organization address");
        organization = _organization;
    }

    // 🟢 Donor makes a pledge (sends ETH)
    function pledge() external payable {
        require(msg.value > 0.001 ether, "Must pledge ETH");
        require(pledges[msg.sender].amount == 0, "Pledge already exists");

        //Adding pledger into the array
        pledgerIndex[msg.sender] = pledgers.length;  // Save their index
        pledgers.push(msg.sender);

        //pledges money
        pledges[msg.sender] = Pledge({
            amount: msg.value,
            nextPaymentTimestamp: block.timestamp + MONTH
        });

        emit PledgeCreated(msg.sender, msg.value);
    }

    // 🟢 Process donation (send ETH to organization)
    function processDonation(address donor) external {
        Pledge storage userPledge = pledges[donor];
        require(userPledge.amount > 0, "No active pledge");
        require(block.timestamp >= userPledge.nextPaymentTimestamp, "Not due yet");

        // Reset the next payment date
        userPledge.nextPaymentTimestamp += MONTH;

        // Send ETH to the organization
        payable(organization).transfer(userPledge.amount);

        emit DonationProcessed(donor, userPledge.amount);
    }

    // 🟢 Withdraw funds (if needed, instead of processing donations individually)
    function withdrawFunds() external {
        require(msg.sender == organization, "Only organization can withdraw");
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds available");

        payable(organization).transfer(balance);

        emit FundsWithdrawn(organization, balance);
    }

    // 🔍 View contract balance
    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }


    function cancelPledge() external {
        
        Pledge storage user_pledge = pledges[msg.sender];
        require(user_pledge.amount > 0, "No active pledge");


        uint256 index = pledgerIndex[msg.sender];  // Direct lookup
        uint256 lastIndex = pledgers.length - 1;

        // If not the last element, swap with the last element
        if (index < lastIndex) {
        address lastPledger = pledgers[lastIndex];
        pledgers[index] = lastPledger;  // Move last element to the deleted spot
        pledgerIndex[lastPledger] = index;  // Update index of swapped pledger
        }

        // Remove last element
        pledgers.pop();

        
        // Delete the pledge
        delete pledges[msg.sender];
        delete pledgerIndex[msg.sender];

        emit PledgeCancelled(msg.sender);
    }

    //Function for making a one time donation
    function pay() external payable{
        require(msg.value>0.001 ether,"Amount should be more than 0.001 ether");
        payable(organization).transfer(msg.value);
        emit Fundonetime(msg.sender,msg.value);
    }

    function getPledgersCount() external view returns (uint256) {
    return pledgers.length;
}

}
