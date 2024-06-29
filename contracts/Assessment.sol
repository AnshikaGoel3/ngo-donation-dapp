// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Assessment {
    address payable public owner;
    uint256 public totalDonations;
    uint256 public numberOfDonors;

    event DonationReceived(address indexed donor, uint256 amount);

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "You are not the owner");
        _;
    }

    receive() external payable {
        totalDonations += msg.value;
        numberOfDonors++;
        emit DonationReceived(msg.sender, msg.value);
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getTotalDonations() public view returns (uint256) {
        return totalDonations;
    }

    function getNumberOfDonors() public view returns (uint256) {
        return numberOfDonors;
    }
}
