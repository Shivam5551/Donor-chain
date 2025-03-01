// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "forge-std/Test.sol";
import "../src/MonthlyDonation.sol";

contract MonthlyDonationTest is Test {
    MonthlyDonation public donationContract;
    address public organization = address(100);  // Mock organization address
    address public donor1 = address(101);
    address public donor2 = address(102);

    function setUp() public {
        donationContract = new MonthlyDonation(organization);
    }

    function testPledge() public {
        vm.startPrank(donor1);
        vm.deal(donor1, 10 ether);

        donationContract.pledge{value: 1 ether}();

        (uint256 amount, uint256 nextPayment) = donationContract.pledges(donor1);

        assertEq(amount, 1 ether);
        assertGt(nextPayment, block.timestamp); // nextPayment should be in the future
        assertEq(donationContract.pledgers(0), donor1);  // Check pledger is added
        vm.stopPrank();
    }

    function testProcessDonation() public {
        vm.startPrank(donor1);
        vm.deal(donor1, 10 ether);

        donationContract.pledge{value: 1 ether}();

        // Fast forward 31 days (simulate a month passing)
        vm.warp(block.timestamp + 31 days);

        // Process donation
        vm.stopPrank();
        donationContract.processDonation(donor1);

        // Check balance of organization
        assertEq(organization.balance, 1 ether);
    }

    function testCancelPledge() public {
        vm.startPrank(donor1);
        vm.deal(donor1, 10 ether);

        donationContract.pledge{value: 1 ether}();

        donationContract.cancelPledge();

        (uint256 amount, ) = donationContract.pledges(donor1);
        assertEq(amount, 0);  // Should be zero after cancellation
        assertEq(donationContract.getPledgersCount(),0);  // Should remove pledger from array

        vm.stopPrank();
    }

    function testOneTimeDonation() public {
        vm.startPrank(donor2);
        vm.deal(donor2, 10 ether);

        donationContract.pay{value: 2 ether}();

        // Check organization received funds
        assertEq(organization.balance, 2 ether);

        vm.stopPrank();
    }

    function testWithdrawFundsByOrganization() public {
        vm.startPrank(donor1);
        vm.deal(donor1, 10 ether);
        donationContract.pledge{value: 1 ether}();
        vm.stopPrank();

        // Process donation
        vm.warp(block.timestamp + 31 days);
        donationContract.processDonation(donor1);

        // Check org can withdraw any remaining funds (in this case, should be 0)
        vm.prank(organization);
        donationContract.withdrawFunds();

        assertEq(organization.balance, 1 ether);  // Confirm org has received funds
    }
}
