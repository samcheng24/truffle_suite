// Require creds in .env
require('dotenv').config()

// Require web3 library and other cool stuff
const Web3 = require('web3')
const axios = require('axios')
const EthereumTx = require('ethereumjs-tx')
const log = require('ololog').configure({ time: true })
const ansi = require('ansicolor').nice

// Define network -- Testnet Ropsten
const testnet = `https://ropsten.infura.io/v3/${process.env.INFURA_ROPSTEN_ACCESS_TOKEN}`
const web3 = new Web3( new Web3.providers.HttpProvider(testnet) )

// Define Wallets
web3.eth.defaultAccount = process.env.WALLET_ADDRESS
const destinationAccount = process.env.DESTINATION_WALLET_ADDRESS

// Transaction Amount
const amountToSend = 0.01

// Get gas prices from https://ethgasstation.info/
const getCurrentGasPrices = async () => {
  let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
  let prices = {
    low: response.data.safeLow / 10,
    medium: response.data.average / 10,
    high: response.data.fast / 10
  }
 
  console.log("\r\n")
  log (`Current ETH Gas Prices (in GWEI):`.cyan)
  log(` * Low: ${prices.low} (transaction completes in < 30 minutes)`.green)
  log(` * Standard: ${prices.medium} (transaction completes in < 5 minutes)`.yellow)
  log(` * Fast: ${prices.high} (transaction completes in < 2 minutes)`.red)
 
  return prices
}

// Main
const main = async () => {
    // Get wallet balance
    let myBalanceInWei = web3.eth.getBalance(web3.eth.defaultAccount).toNumber()
    let myBalance = web3.fromWei(myBalanceInWei, 'ether')
    log(`Your wallet balance is currently ${myBalance} ETH`.green)

    /**
     * Get nonce --  ensure txn is not replicated
     *
     * With every new transaction you send using a specific wallet address,
     * you need to increase a nonce which is tied to the sender wallet.
     */
    let myNonce = web3.eth.getTransactionCount(web3.eth.defaultAccount)
    log(`The outgoing transaction count for your wallet address is: ${myNonce}`.magenta)

    // Get gas price
    let gasPricesInGwei = await getCurrentGasPrices()

    // Build txn
    let details = {
        "to" : destinationAccount,
        "value": web3.toHex( web3.toWei(amountToSend, 'ether') ),
        //"gas": 51000, // Default 21000 -- ORIGINAL
        "gasLimit" : web3.toHex(800000), // is the maximum amount of gas we are willing to pay for this transaction
        "gasPrice": gasPricesInGwei.low * 1000000000, // converts the gwei price to wei -- ORIGINAL
        // "gasPrice": web3.toHex(web3.toWei('10', 'gwei')), 
        "nonce": myNonce,
        "chainId": 3 // (EIP 155) , mainnet: 1, morden:2, ropsten:3, rinkeby: 4, kovan:42
    }
    const transaction = new EthereumTx(details)

    // Sign txn. Priv key is used to unlock wallet
    transaction.sign( Buffer.from(process.env.WALLET_PRIVATE_KEY, 'hex') )

    // serialize as prereq to send to infura
    const serializedTransaction = transaction.serialize()

    // Note that the Web3 library is able to automatically determine the "from" address based on your private key.
    // const addr = transaction.from.toString('hex')
    // log(`Based on your private key, your wallet address is ${addr}`)

    // Send!
    const transactionId = web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex') )

    const url = `https://ropsten.etherscan.io/tx/${transactionId}`
    log(url.cyan)

    log(`Note: please allow for 30 seconds before transaction appears on Etherscan`.magenta)

    process.exit()
}
   
function transactTransfer(){
  main()
};