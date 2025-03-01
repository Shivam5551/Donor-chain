//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract crowdfunding {
    string public name;
    string public description;
    uint public goal;
    uint public deadline;
    address public owner;
    enum cmpstate {
        Active,
        Successful,
        Failed
    }
    cmpstate public state;
    bool public paused;

    constructor(
        string memory _name,
        string memory _des,
        uint g,
        uint dl,
        address _owner
    ) {
        name = _name;
        description = _des;
        goal = g;
        deadline = block.timestamp + (dl * 1 days);
        owner = _owner;
        state = cmpstate.Active;
    }

    modifier notpaused() {
        require(!paused, "Contract is paused");
        _;
    }

    struct Tier {
        string name;
        uint amt;
        uint backers;
    }

    struct backer {
        uint totalcontribution;
        mapping(uint => bool) fundedTiers;
    }

    Tier[] public tiers;
    mapping(address => backer) public backers;

    modifier onlyowner() {
        require(msg.sender == owner, "Not the owner");
        _;
    }

    modifier cmpopen() {
        require(state == cmpstate.Active, "Campaign is not active");
        _;
    }

    function addTier(string memory namet, uint _amt) public onlyowner {
        require(_amt > 0.001 ether, "Amount should be greater than zero");
        tiers.push(Tier(namet, _amt, 0));
    }

    function removetier(uint index) public onlyowner {
        require(index < tiers.length, "tier doesn't exist");
        tiers[index] = tiers[tiers.length - 1];
        tiers.pop();
    }

    function checkandupdatestate() internal {
        if (state == cmpstate.Active) {
            if (block.timestamp >= deadline) {
                state = address(this).balance >= goal
                    ? cmpstate.Successful
                    : cmpstate.Failed;
            } else {
                state = address(this).balance >= goal
                    ? cmpstate.Successful
                    : cmpstate.Active;
            }
        }
    }

    function fund(uint256 tierindex) public payable cmpopen notpaused {
        require(tierindex < tiers.length, "Tier doesn't exist");
        require(msg.value == tiers[tierindex].amt, "Incorrect amount");
        tiers[tierindex].backers++;
        checkandupdatestate();
        backers[msg.sender].totalcontribution += msg.value;
        backers[msg.sender].fundedTiers[tierindex] = true;
    }

    function withdrawal() public onlyowner {
        checkandupdatestate();
        require(state == cmpstate.Successful, "Campaign not Successfull");
        uint _balance = address(this).balance;
        require(_balance > 0.001 ether, "No balance to withdraw");
        payable(owner).transfer(_balance);
    }

    function balance() public view returns (uint256) {
        return address(this).balance;
    }

    function refund() public {
        checkandupdatestate();
        require(state == cmpstate.Failed, "Refund not availaible.");
        uint amt = backers[msg.sender].totalcontribution;
        require(amt > 0.001 ether, "No money was donated");
        backers[msg.sender].totalcontribution = 0;
        payable(msg.sender).transfer(amt);
    }

    function hasfundedtier(
        address _backer,
        uint ti
    ) public view returns (bool) {
        return backers[_backer].fundedTiers[ti];
    }

    function gettiers() public view returns (Tier[] memory) {
        return tiers;
    }

    function tglpause() public onlyowner {
        paused = !paused;
    }

    function getcampaignstatus() public view returns (cmpstate) {
        if (state == cmpstate.Active && block.timestamp > deadline) {
            return
                address(this).balance >= goal
                    ? cmpstate.Successful
                    : cmpstate.Failed;
        }
        return state;
    }

    function adddead(uint _daytoadd) public onlyowner cmpopen {
        deadline += _daytoadd + 1 days;
    }
}
