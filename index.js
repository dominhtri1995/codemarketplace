const web3 = require('web3');
const express = require('express');
const app = express();
const contract = require("truffle-contract");
var path = require('path');
var request = require('request');

const codeArtifacts = require("./build/contracts/CodeContract.json")
var CodeContract = contract(codeArtifacts)

var web3js = new web3(new web3.providers.HttpProvider("http://localhost:9545"));
CodeContract.setProvider(web3js.currentProvider)
CodeContract.defaults({from: web3js.eth.accounts[0], gas: 6721975})

var messages = {}

app.use(express.urlencoded());
app.use(express.json());
app.use(express.static('build'))

CodeContract.deployed().then(function (instance) {
    var purchaseEvent = instance.Purchase();
    purchaseEvent.watch(function (error, result) {
        if (!error) {
            console.log('purchase event', result)
            let tid = result.args['transaction_id'].toNumber()
            instance.approveTransaction(tid).then(function (result) {
                console.log('transaction approved', tid)
            })
            // request.put({
            //     url: 'https://api.github.com/repos/tmd2142/share-market-place/collaborators/dominhtri1995?permission=pull',
            //     headers: {'Authorization': 'token 6307d2ec2384ff7f5c22be68041996c96db33950', 'user-agent': 'node.js'}
            // }, function callback(error, response, body) {
            //     if (response.statusCode === 201) {
            //         instance.approveTransaction(tid).then(function (result) {
            //             console.log('transaction approved', tid)
            //         })
            //     } else {
            //         console.log(response.statusCode)
            //         console.log(error)
            //         instance.cancelTransaction(tid).then(function (result) {
            //             console.log('transaction approved', tid)
            //         })
            //     }
            // })
        } else {
            console.log(error);
        }
    });
})


app.get('/buyer', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/buyer.html'));
});

app.get('/seller', function (req, res) {
    res.sendFile(path.join(__dirname + '/build/seller.html'));
});

app.post('/new_product', function (req, res) {
    let name = req.body.name
    let description = req.body.description
    let price = req.body.price
    let code = req.body.code
    let img = req.body.img
    console.log(name, description, price, code, img)

    CodeContract.deployed().then(function (instance) {
        instance.registerProduct(name, description, img, parseInt(price), 0).then(function (result) {
            console.log('added product')
        }).catch(function (err) {
            console.error("ERROR! " + err.message)
        })

    }).catch(function (err) {
        console.error("ERROR! " + err.message)
    })

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({status: 200}));
});

app.post('/new_message', function (req, res) {
    let buyerId = req.body.buyerId
    let message = req.body.message
    let sellerId = req.body.sellerId
    console.log(buyerId, message, sellerId)

    if (messages[sellerId]) {
        messages[sellerId].push({buyerId: buyerId, message: message})
    } else {
        messages[sellerId] = [{buyerId: buyerId, message: message}]
    }

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({status: 200}));
});

app.get('/my_message', function (req, res) {
    let sellerId = req.query.sellerId

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({message: messages[sellerId]}));
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))