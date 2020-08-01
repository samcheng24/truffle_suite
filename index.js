// Require creds in .env
require('dotenv').config()

// Require web3 library and other cool stuff
const log = require('ololog').configure({ time: true })
const ansi = require('ansicolor').nice
const blockUtils = require('./blockUtils');

// Define Wallets
const wallet1 = process.env.SRC_WALLET_ADDRESS
const wallet1key = process.env.SRC_WALLET_PRIVATE_KEY
const wallet2 = process.env.DEST_WALLET_ADDRESS
const wallet2key = process.env.DEST_WALLET_PRIVATE_KEY

// Transaction Amount
const amountToSend = 0.01

// Main
const main = async () => {
    // Get wallet balance
    let myBalance = await blockUtils.getBalance(wallet1)
    log(`Your wallet balance is currently ${myBalance} ETH`.green)

    // console.log(blockUtils)
    /**
     * Get nonce --  ensure txn is not replicated
     *
     * With every new transaction you send using a specific wallet address,
     * you need to increase a nonce which is tied to the sender wallet.
     */
    let myNonce = blockUtils.getNonce(wallet1)
    log(`The outgoing transaction count for your wallet address is: ${myNonce}`.magenta)

    // Get gas price
    let gasPricesInGwei = await blockUtils.getCurrentGasPrices()
    console.log("\r\n")
    log (`Current ETH Gas Prices (in GWEI):`.cyan)
    log(` * Low: ${gasPricesInGwei.low} (transaction completes in < 30 minutes)`.green)
    log(` * Standard: ${gasPricesInGwei.medium} (transaction completes in < 5 minutes)`.yellow)
    log(` * Fast: ${gasPricesInGwei.high} (transaction completes in < 2 minutes)`.red)

    // Build txn
    // const rawSignedTransaction = await blockUtils.buildTransaction(
    //   wallet1,
    //   wallet1key,
    //   wallet2,
    //   amountToSend)

    // const transactionId = await blockUtils.sendRawTransaction(rawSignedTransaction)

    const transactionId = await blockUtils.buildAndSendRawTransaction(
      wallet1,
      wallet1key,
      wallet2,
      amountToSend)

    const url = `https://ropsten.etherscan.io/tx/${transactionId}`
    log(url.cyan)

    log(`Note: please allow for 30 seconds before transaction appears on Etherscan`.magenta)

    process.exit()
}

main()