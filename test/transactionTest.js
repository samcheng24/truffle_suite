const assert = require('chai').assert; // Looks for local chai
const Web3 = require('web3');
const app = require ('../app');
const index = require ('../index');

describe('App', function(){
    it('Should return hello', function(){
        assert.equal(app(),'hello');
    });
});

// Define network -- Testnet Ropsten
const testnet = `https://ropsten.infura.io/v3/${process.env.INFURA_ROPSTEN_ACCESS_TOKEN}`
const web3 = new Web3( new Web3.providers.HttpProvider(testnet) )

let previousBalance;

describe('Testing Balance', function(){
    it('Checking balance', function(){
        // Get wallet balance
        let myBalanceInWei = web3.eth.getBalance(web3.eth.defaultAccount).toNumber();
        previousBalance=myBalanceInWei;
        assert.equal(myBalanceInWei, previousBalance);
    })
});