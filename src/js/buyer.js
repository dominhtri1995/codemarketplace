// Import libraries we need.
import {default as Web3} from "web3"
import {default as contract} from "truffle-contract"
// get build artifacts from compiled smart contract and create the truffle contract
import votingArtifacts from "../../build/contracts/CodeContract.json"

var VotingContract = contract(votingArtifacts)

/*
 * This holds all the functions for the app
 */
window.App = {
    // called when web3 is set up
    start: function () {
        VotingContract.setProvider(window.web3.currentProvider)
        VotingContract.defaults({from: window.web3.eth.accounts[1], gas: 6721975})

        VotingContract.deployed().then(function (instance) {
            instance.productCount.call().then(function (res) {
                window.numOfProducts = res.toNumber()
                console.log('Num Product', window.numOfProducts)
            })
        }).catch(function (err) {
            console.error("ERROR! " + err.message)
        })
    },

    buyProduct: function (product_id, value) {
        VotingContract.deployed().then(function (instance) {
            instance.buyProduct(product_id, {
                from: web3.eth.accounts[1],
                gas: 3000000,
                value: value
            }).then(function (result) {
                console.log('bought product', result)
                window.pushNoti('Transaction processing', 3000)
            }).catch(function (err) {
                console.error("ERROR! " + err.message)
                window.pushNoti('Error', 3000, 'error')
            })
        }).catch(function (err) {
            console.error("ERROR! " + err.message)
        })
    },
    registerBuyer: function () {
        VotingContract.deployed().then(function (instance) {
            instance.registerBuyer().then(function (result) {
                console.log('registered buyer')
                window.pushNoti('Buyer registered', 3000)
            }).catch(function (err) {
                console.error("ERROR! " + err.message)
            })

        }).catch(function (err) {
            console.error("ERROR! " + err.message)
        })
    },

    listProduct: function (f) {
        VotingContract.deployed().then(function (instance) {
            f(instance)
        }).catch(function (err) {
            console.error("ERROR! " + err.message)
        })
    },
    listPurchase: function (f) {
        VotingContract.deployed().then(function (instance) {
            f(instance)
        }).catch(function (err) {
            console.error("ERROR! " + err.message)
        })
    },
    rateProduct: function (f) {
        VotingContract.deployed().then(function (instance) {
            f(instance)
        }).catch(function (err) {
            console.error("ERROR! " + err.message)
        })
    },
}

// When the page loads, we create a web3 instance and set a provider. We then set up the app
window.addEventListener("load", function () {
    // Is there an injected web3 instance?
    if (typeof web3 !== "undefined") {
        console.warn("Using web3 detected from external source like Metamask")
        // If there is a web3 instance(in Mist/Metamask), then we use its provider to create our web3object
        window.web3 = new Web3(web3.currentProvider)
    } else {
        console.warn("No web3 detected. Falling back to http://localhost:9545. You should remove this fallback when you deploy live, as it's inherently insecure. Consider switching to Metamask for deployment. More info here: http://truffleframework.com/tutorials/truffle-and-metamask")
        // fallback - use your fallback strategy (local node / hosted node + in-dapp id mgmt / fail)
        window.web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:9545"))
    }
    // initializing the App
    window.App.start()
    window.App.registerBuyer()
})