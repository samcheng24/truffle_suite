// Require creds in .env
require('dotenv').config()

const Web3 = require('web3')
const axios = require('axios')
const EthereumTx = require('ethereumjs-tx')
const log = require('ololog').configure({ time: true })

// Define network -- Testnet Ropsten
const testnet = `https://ropsten.infura.io/v3/${process.env.INFURA_ROPSTEN_ACCESS_TOKEN}`
const web3 = new Web3( new Web3.providers.HttpProvider(testnet) )
web3.eth.defaultAccount = process.env.SRC_WALLET_ADDRESS // Default Wallet

const getNonce = (account) => {
    return web3.eth.getTransactionCount(account)
}

// Get gas prices from https://ethgasstation.info/
const getCurrentGasPrices = async () => {
    let response = await axios.get('https://ethgasstation.info/json/ethgasAPI.json')
    let prices = {
      low: response.data.safeLow / 10,
      medium: response.data.average / 10,
      high: response.data.fast / 10
    }
    return prices
}

const buildTransaction = async (srcAddress, srcAddressKey, destAddress, amountToSend) => {
    web3.eth.defaultAccount=srcAddress;

    let myNonce = getNonce(srcAddress)
    let gasPricesInGwei = await getCurrentGasPrices()

    let details = {
        "to" : destAddress,
        "value": web3.toHex( web3.toWei(amountToSend, 'ether') ),
        "gasLimit" : web3.toHex(800000), // is the maximum amount of gas we are willing to pay for this transaction
        "gasPrice": gasPricesInGwei.low * 1000000000, // converts the gwei price to wei -- ORIGINAL
        "nonce": myNonce,
        "chainId": 3 // (EIP 155) , mainnet: 1, morden:2, ropsten:3, rinkeby: 4, kovan:42
    }

    let transaction = new EthereumTx(details);
    // Sign txn. Priv key is used to unlock wallet
    transaction.sign( Buffer.from(srcAddressKey, 'hex') )
    
    return transaction;
}

const sendRawTransaction = async (transaction) => {
    // serialize as prereq to send to infura
    const serializedTransaction = transaction.serialize()
    
    // Note that the Web3 library is able to automatically determine the "from" address based on your private key.
    // const addr = transaction.from.toString('hex')
    // log(`Based on your private key, your wallet address is ${addr}`)

    // Send!    
    //log("Sending Transaction hash: "+serializedTransaction.toString('hex'))
    return await web3.eth.sendRawTransaction('0x' + serializedTransaction.toString('hex') )
}

const buildAndSendRawTransaction = async (srcAddress, srcAddressKey, destAddress, amountToSend) => {
    const rawSignedTransaction = await buildTransaction(srcAddress, srcAddressKey, destAddress, amountToSend)
    const transactionId = await sendRawTransaction(rawSignedTransaction)
    return transactionId
}

module.exports = {
    web3: web3,
    getBalance : (walletAddress) => { // Similar to getBalance : function getBalance() {...}
        let balanceInWei = web3.eth.getBalance(walletAddress).toNumber()
        let balance = web3.fromWei(balanceInWei, 'ether')
        return balance
    },
    getNonce : getNonce,
    getCurrentGasPrices : getCurrentGasPrices,
    buildTransaction : buildTransaction,
    sendRawTransaction : sendRawTransaction,
    buildAndSendRawTransaction : buildAndSendRawTransaction
}