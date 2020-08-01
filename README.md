# Running Node Web3 Eth transactions

## Requirements

- Node.js v10.22.0

## Setup

Install by running `yarn install`
Update env settings in `.env` file
  * INFURA_ACCESS_TOKEN -- Token of Infura under Ropsten Testnet
  * WALLET_ADDRESS -- Source wallet
  * WALLET_PRIVATE_KEY -- Source wallet private key
  * DESTINATION_WALLET_ADDRESS -- Destination wallet
Update params in `index.js`
  * amountToSend -- amount to transact // Move to config file!

## Processing Manual Transactions
Command -- `node index.js`

## Test Commands

| Description | Command |
|------|----|
| Running tests | `npm run test` |
| Live server | `npm run test:browser` |

# Useful Links
Metamask Wallet: chrome-extension://nkbihfbeogaeaoehlefnkodbefgpgknn/home.html#
Infura Node: https://infura.io/dashboard/ethereum/a470110671b54af0bc04b6c04b293731/settings
Explorer Etherscan: https://ropsten.etherscan.io/