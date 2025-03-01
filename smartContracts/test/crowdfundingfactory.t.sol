// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "forge-std/Test.sol";
import "../src/crowdfundingfactory.sol";
import "../src/crowdfunding.sol"; // Needed to typecast to `crowdfunding`

contract CrowdfundingFactoryTest is Test {
    Crowdfundingfactory factory;

    address owner = address(this);
    address user1 = address(0x123);
    address user2 = address(0x456);

    function setUp() public {
        factory = new Crowdfundingfactory();
    }

    function testCreateCampaign() public {
        vm.startPrank(user1);

        factory.createcampaign(
            "Campaign 1",
            "Description 1",
            100 ether,
            30 days
        );

        Crowdfundingfactory.Campaign[] memory campaigns = factory
            .getusercampaigns(user1);
        assertEq(campaigns.length, 1, "User1 should have 1 campaign");
        assertEq(campaigns[0].name, "Campaign 1", "Campaign name should match");

        vm.stopPrank();
    }

    function testMultipleUserCampaigns() public {
        vm.startPrank(user1);
        factory.createcampaign(
            "User1 Campaign 1",
            "Description 1",
            100 ether,
            30 days
        );
        factory.createcampaign(
            "User1 Campaign 2",
            "Description 2",
            200 ether,
            60 days
        );
        vm.stopPrank();

        vm.startPrank(user2);
        factory.createcampaign(
            "User2 Campaign 1",
            "Description 3",
            150 ether,
            45 days
        );
        vm.stopPrank();

        Crowdfundingfactory.Campaign[] memory user1Campaigns = factory
            .getusercampaigns(user1);
        assertEq(user1Campaigns.length, 2, "User1 should have 2 campaigns");

        Crowdfundingfactory.Campaign[] memory user2Campaigns = factory
            .getusercampaigns(user2);
        assertEq(user2Campaigns.length, 1, "User2 should have 1 campaign");
    }

    function testGetAllCampaigns() public {
        vm.startPrank(user1);
        factory.createcampaign("Campaign 1", "Desc 1", 100 ether, 30 days);
        vm.stopPrank();

        vm.startPrank(user2);
        factory.createcampaign("Campaign 2", "Desc 2", 200 ether, 45 days);
        vm.stopPrank();

        Crowdfundingfactory.Campaign[] memory allCampaigns = factory
            .getallcamp();
        assertEq(
            allCampaigns.length,
            2,
            "There should be 2 campaigns in total"
        );
    }

    function testPause() public {
        // Ensure factory is not paused initially
        assertEq(
            factory.paused(),
            false,
            "Factory should not be paused initially"
        );

        // Only owner can toggle pause
        factory.tglpause();
        assertEq(
            factory.paused(),
            true,
            "Factory should be paused after toggle"
        );

        // Non-owner trying to toggle should fail
        vm.prank(user1);
        vm.expectRevert("Notowner");
        factory.tglpause();
    }

    function testCreateCampaignFailsWhenPaused() public {
        // Owner pauses the factory
        factory.tglpause();
        assertEq(factory.paused(), true, "Factory should be paused");

        // Campaign creation should fail when paused
        vm.prank(user1);
        vm.expectRevert("Factory is paused.");
        factory.createcampaign("Paused Campaign", "Desc", 100 ether, 30 days);
    }
}
