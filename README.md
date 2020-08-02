# Running Node Web3 Eth transactions

## Requirements
- Node.js v10.22.0

# Quick start
1.1 Build Docker Image  
     > docker build . -f Dockerfile-manual -t truffle_suite:v1

1.2 Run Docker Image
     > docker container run -p 4000:3000 truffle_suite:v1
    
1.3 Check out the generated reports in:
  - run commands to explore around the system

| Description | Command |
|------|----|
| TransactManual Transactions | `npm start` |
| Running tests | `npm test` |
| Running tests w/ reports | `npm run test:report` |
| Live server (WIP) | `npm run test:browser` |

  - Report HTML file. Inside container under DIR:
    > ./mochawesome-report/mochawesome.html

2.1 Build Docker Image as Automated
   > docker container run -p 4000:3000 truffle_suite:v2

2.2 Run Docker Image  
   > docker container run -p 4000:3000 truffle_suite:v2

Caveat: 
* Upon `docker run`, there is no front end UI. Live-server to show test results are a WIP which lives in ./public/index.html
* Other tests under `index.test.js` are implemented 2/11 Test Cases. These are WIP as I prioritized understanding the context and building the end-end solution first. I would be glad to improve on this further!

# Code Structure
* `index.js` - Main file for processing manual transactions
* `index.test.js` - Test file (WIP)
  * `amountToSend` -- amount to transact
* `blockUtils.js` - Connection layer for blockchain connectivity
* `.env` file - where all env variables are located
  * INFURA_ACCESS_TOKEN -- Token of Infura under Ropsten Testnet
  * SRC_WALLET_ADDRESS -- Source wallet
  * SRC WALLET_PRIVATE_KEY -- Source wallet private key
  * DEST_WALLET_ADDRESS -- Destination wallet
  * DEST_WALLET_ADDRESS_KEY -- Destination wallet private key  

# Useful Links
* Metamask Wallet: chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#
* Infura Node: https://infura.io/dashboard/ethereum/a470110671b54af0bc04b6c04b293731/settings
* Explorer Etherscan: https://ropsten.etherscan.io/