const Web3 = require('web3') // NodeJS import format
const { expect, assert, should } = require('chai') // Looks for local chai
const sleep = require('thread-sleep')
const awaitTransactionMined = require ('await-transaction-mined');

// Declare a test suite
describe('#mySandboxSuite()', function(){ // Function Name
    context('without arguments', function() { // with/without argument etc
        // it('should be equal', function(){ // expected conditions (should return *)
        //     // Get wallet balance
        //     let balancePrevious = blockUtils.getBalance(wallet1)
        //     let balanceNow = balancePrevious;

        //     // Assertion styles
        //     assert.equal(balanceNow,balancePrevious); // Assert Style
        //     expect(balanceNow).to.equal(balancePrevious); // BDD Style - Expect Style
        //     // balanceNow.should.equal(balancePrevious); // BDD Style - Should style
        // })

        // it('should be unequal', function(){
        //     // test case 2 ...
        // })

        // it('testingFunctions', async function(){
            // const transactionId = '0x7c890caf9e926576433cb014668abf44a11be8186d1091995eade4e0cf0273be'
            // const minedTxReceipt = await awaitTransactionMined.awaitTx(web3, transactionId)

            // console.log("Transaction Receipt: "+ JSON.stringify(minedTxReceipt))

            // // web3.eth.getPendingTransactions().then(console.log);

            // // This is how to Sleep
            // var start = Date.now();
            // var res = sleep(30000);
            // var end = Date.now();
            // // res is the actual time that we slept for
            // console.log(res + ' ~= ' + (end - start) + ' ~= 1000');
        // })
    })
});