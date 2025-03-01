//SPDX-License-Identifier:MIT
pragma solidity ^0.8.0;
import {crowdfunding} from "./crowdfunding.sol";

contract Crowdfundingfactory {
    address public owner;
    bool public paused;

    struct Campaign {
        address campaignadd;
        address owner;
        string name;
        uint creationdate;
    }

    Campaign[] public camp;
    mapping(address => Campaign[]) public usercamp;

    modifier onlyowner() {
        require(msg.sender == owner, "Notowner");
        _;
    }

    modifier notpaused() {
        require(!paused, "Factory is paused.");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createcampaign(
        string memory _name,
        string memory _desc,
        uint goal,
        uint duration
    ) external notpaused {
        crowdfunding newCampaign = new crowdfunding(
            _name,
            _desc,
            goal,
            duration,
            msg.sender
        );
        address _campaignadd = address(newCampaign);

        Campaign memory campaign = Campaign({
            campaignadd: _campaignadd,
            owner: msg.sender,
            name: _name,
            creationdate: block.timestamp
        });

        camp.push(campaign);
        usercamp[msg.sender].push(campaign);
    }

    function getusercampaigns(
        address _user
    ) external view returns (Campaign[] memory) {
        return usercamp[_user];
    }

    function getallcamp() external view returns (Campaign[] memory) {
        return camp;
    }

    function tglpause() external onlyowner {
        paused = !paused;
    }
}
