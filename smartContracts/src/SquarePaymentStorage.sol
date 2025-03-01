// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract SquarePaymentStorage {
    struct Payment {
        string transactionId;
        uint256 amount;
        string currency;
        uint256 timestamp;
    }

    Payment[] public payments;

    event PaymentStored(
        string transactionId,
        uint256 amount,
        string currency,
        uint256 timestamp
    );

    function storePayment(
        string memory _transactionId,
        uint256 _amount,
        string memory _currency,
        uint256 _timestamp
    ) public {
        payments.push(Payment(_transactionId, _amount, _currency, _timestamp));
        emit PaymentStored(_transactionId, _amount, _currency, _timestamp);
    }

    function getPayment(uint256 index) public view returns (Payment memory) {
        require(index < payments.length, "Invalid index");
        return payments[index];
    }

    function getTotalPayments() public view returns (uint256) {
        return payments.length;
    }
}
