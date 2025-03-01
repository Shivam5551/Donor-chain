// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/SquarePaymentStorage.sol";  // Adjust path to your contract

contract SquarePaymentStorageTest is Test {
    SquarePaymentStorage paymentStorage;

    function setUp() public {
        paymentStorage = new SquarePaymentStorage();
    }

    function testStorePayment() public {
        string memory transactionId = "txn_123";
        uint256 amount = 100;
        string memory currency = "USD";
        uint256 timestamp = block.timestamp;

        paymentStorage.storePayment(transactionId, amount, currency, timestamp);

        SquarePaymentStorage.Payment memory storedPayment = paymentStorage.getPayment(0);

        assertEq(storedPayment.transactionId, transactionId, "Transaction ID mismatch");
        assertEq(storedPayment.amount, amount, "Amount mismatch");
        assertEq(storedPayment.currency, currency, "Currency mismatch");
        assertEq(storedPayment.timestamp, timestamp, "Timestamp mismatch");

        assertEq(paymentStorage.getTotalPayments(), 1, "Total payments should be 1");
    }

    function testGetPaymentRevertsForInvalidIndex() public {
        vm.expectRevert("Invalid index");
        paymentStorage.getPayment(0);
    }
}
