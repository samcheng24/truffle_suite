// Option to run
// -- Browser Testing: Disable ALL const
// -- npm run test:browser

// Require creds in .env
require('dotenv').config()

const Web3 = require('web3')
const blockUtils = require('../blockUtils')
const { expect, assert, should } = require('chai')
const awaitTransactionMined = require ('await-transaction-mined');

// Define Wallets
const wallet1 = process.env.SRC_WALLET_ADDRESS
const wallet1key = process.env.SRC_WALLET_PRIVATE_KEY
const wallet2 = process.env.DEST_WALLET_ADDRESS
const wallet2key = process.env.DEST_WALLET_PRIVATE_KEY

// Define network -- Testnet Ropsten
const testnet = `https://ropsten.infura.io/v3/${process.env.INFURA_ROPSTEN_ACCESS_TOKEN}`
const web3 = new Web3( new Web3.providers.HttpProvider(testnet) )

/**
 * Test Group 1: Transact success
 *  * Test Case 1: wallet1->wallet2 OK
 *  * Test Case 2: wallet1->wallet2 OK
 *  * Test Case 3: 2 txn w/ same nonce -- 2nd one with 10% higher gas to succeed
 **/
describe('#buildAndSendRawTransaction()', function(){
    context('TC1: wallet1 -> wallet2', function() {
        it('should transact successfully', async function(){
            const amountToSend = 0.01
            let destBalanceBeforeTxn = blockUtils.getBalance(wallet2)
            console.log("\t* Wallet2 balance before txn:"+destBalanceBeforeTxn)

            const transactionId = await blockUtils.buildAndSendRawTransaction(
                wallet1,
                wallet1key,
                wallet2,
                amountToSend)
        
            const url = `https://ropsten.etherscan.io/tx/${transactionId}`
            console.log("\t* Transaction URL: "+ url)

            // Waiting for txn receipt
            const minedTxReceipt = await awaitTransactionMined.awaitTx(web3, transactionId)
            console.log("\t* Transaction Receipt: "+ JSON.stringify(minedTxReceipt))

            let destBalanceAfterTxn = Number(blockUtils.getBalance(wallet2)).toFixed(5)
            let expectedBalance = Number(Number(destBalanceBeforeTxn)+Number(amountToSend)).toFixed(5)
            console.log("\t* Wallet2 balance expected after txn:" + expectedBalance)

            expect(destBalanceAfterTxn).to.equal(expectedBalance)
        })
    })

    context('TC2: wallet2 -> wallet1', function() {
        it('should transact successfully', async function(){
            const amountToSend = 0.02
            let destBalanceBeforeTxn = blockUtils.getBalance(wallet1)
            console.log("\t* Wallet1 balance before txn:"+destBalanceBeforeTxn)

            const transactionId = await blockUtils.buildAndSendRawTransaction(
                wallet2,
                wallet2key,
                wallet1,
                amountToSend)
        
            const url = `https://ropsten.etherscan.io/tx/${transactionId}`
            console.log("\t* Transaction URL: "+ url)

            // Waiting for txn receipt
            const minedTxReceipt = await awaitTransactionMined.awaitTx(web3, transactionId)
            console.log("\t* Transaction Receipt: "+ JSON.stringify(minedTxReceipt))

            let destBalanceAfterTxn = Number(blockUtils.getBalance(wallet1)).toFixed(5)
            let expectedBalance = Number(Number(destBalanceBeforeTxn)+Number(amountToSend)).toFixed(5)
            console.log("\t* Wallet1 balance expected after txn:" + expectedBalance)

            expect(destBalanceAfterTxn).to.equal(expectedBalance)
        })
    })
})
    
/**
 * Test Group 2: Transact fail
 *  * Test Case 1: inexisting src wallet
 *  * Test Case 2: inexisting dest wallet
 *  * Test Case 3: 2 txn w/ same nonce & same gas -- 2nd one expect fail "Error: replacement transaction underpriced"
 *  * Test Case 4: Not enough gas
 **/

/**
 * Test Group 3: Selenium UI Testing - 
 *  * Test Case 1: inexisting src wallet
 *  * Test Case 2: inexisting dest wallet
 *  * Test Case 3: 2 txn w/ same nonce & same gas -- 2nd one expect fail "Error: replacement transaction underpriced"
 *  * Test Case 4: Not enough gas
 **/