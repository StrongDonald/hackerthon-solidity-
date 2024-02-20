pragma solidity ^0.8.7;
// SPDX-License-Identifier: MIT

import "hardhat/console.sol";

import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract HackerThon  {
    address public owner;
    uint256 public balance;
    mapping(address=>bool) isBlacklisted;
    // IERC20 LapToken = 0x64c4D0831a17B897AE976F2B949b40Fe68310118;
    // IERC20 CyCToken = 0xA118c2C047125f6F61D6a2EbcFaB69a31f8BFdaF;
    // IERC20 SuSToken = 0xE6c593428506d40838F7Aa0094255c03371F9d7d;

    event TransferReceived(address _from, uint _amount);
    event TransferSent(address _from, address _destAddr, uint _amount);
    
    constructor() {
        owner = msg.sender;
    }
    
    receive() payable external {
        balance += msg.value;
        emit TransferReceived(msg.sender, msg.value);
    }    
    
    function withdraw(uint amount, address payable destAddr) public {
        require(msg.sender == owner, "Only owner can withdraw funds"); 
        require(amount <= balance, "Insufficient funds");
        
        destAddr.transfer(amount);
        balance -= amount;
        emit TransferSent(msg.sender, destAddr, amount);
    }
    
    // IERC20 Token is the contract address of the token (1st param).
    // address to is the address of the reciever of token
    function transferLaptopERC20(IERC20 token, uint256 amount) public {
        uint256 erc20balance = token.balanceOf(address(this));

        require((amount * 10 ** 18) <= erc20balance, "balance is low");
        require(!isBlacklisted[msg.sender], "user already blacklisted");
        isBlacklisted[msg.sender] = true;

        token.transfer(msg.sender, amount * 10 ** 18);
        emit TransferSent(msg.sender, msg.sender, amount * 10 ** 18);
    }    

    function transferCyclesERC20(IERC20 token, uint256 amount) public {
        uint256 erc20balance = token.balanceOf(address(this));

        require((amount * 10 ** 18) <= erc20balance, "balance is low");
        require(!isBlacklisted[msg.sender], "user already blacklisted");
        isBlacklisted[msg.sender] = true;

        token.transfer(msg.sender, amount * 10 ** 18);
        emit TransferSent(msg.sender, msg.sender, amount * 10 ** 18);
    }   

    function transferSubsidyERC20(IERC20 token, uint256 amount) public {
        uint256 erc20balance = token.balanceOf(address(this));

        require((amount * 10 ** 18) <= erc20balance, "balance is low");
        require(!isBlacklisted[msg.sender], "user already blacklisted");
        isBlacklisted[msg.sender] = true;

        token.transfer(msg.sender, amount * 10 ** 18);
        emit TransferSent(msg.sender, msg.sender, amount * 10 ** 18);
    }   
}