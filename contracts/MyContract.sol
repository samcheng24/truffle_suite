//SPDX-License-Identifier: MIT
pragma solidity >= 0.5.0 < 0.7.0;

contract MyContract {
  string message;
  
  constructor(string memory myMessage) public {
    message = myMessage;
  }
  
  function getMessage() public view returns(string memory) {
    return message;
  }
}

