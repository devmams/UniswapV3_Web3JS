require('dotenv').config()
var Web3 = require('web3');
var web3 = new Web3("https://eth-goerli.public.blastapi.io	");
var ABI = require('./ABI')

async function main(){

    let amountIn = web3.utils.toBN(0.01 * 10**18).toString()

    let params = {
        tokenIn : "0xB4FBF271143F4FBf7B91A5ded31805e42b2208d6",
        tokenOut : "0x1f9840a85d5aF5bf1D1762F925BDADdC4201F984",
        fee : 3000,
        recipient : "0x0911e134FA25ce57aCF7E5530c4D10a52DdBc661",
        deadline : Math.floor(Date.now() / 1000) + 60*60,
        amountIn : amountIn,
        amountOutMinimum : 0,
        sqrtPriceLimitX96 : 0
    }

    var contract = new web3.eth.Contract(ABI, "0xE592427A0AEce92De3Edee1F18E0157C05861564");
    console.log(contract)

    let tx = {
        to: '0xE592427A0AEce92De3Edee1F18E0157C05861564',
        value: amountIn,
        gas: 2000000,
        data : contract.methods.exactInputSingle(params).encodeABI()
    }

    console.log(tx)

    let signedTransaction = await web3.eth.accounts.signTransaction(tx, process.env.PRIVATE_KEY);

    console.log(signedTransaction)

    web3.eth.sendSignedTransaction(signedTransaction.rawTransaction).on('receipt', console.log);
}

main()
