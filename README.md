# An ethereum powered decentralized peer-to-peer marketplace for specialized machine learning capabilities

[![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)]
 
Jaidev Shah
Tri Do
Uzay Macar

Blockchains and Applications, Fall 2019

https://docs.google.com/document/d/1Y38q-gOd3_OpOm4WSkRajqSo30k67jjiD1BUYlL3f_o/edit?usp=sharing


### Dependencies:
- [Nodejs 5.0+](https://nodejs.org/en/)
- [Truffle](https://github.com/trufflesuite/truffle)
- [Ganache](http://truffleframework.com/ganache/)

## Setup
```
npm install -g truffle
git clone https://github.com/dominhtri1995/codemarketplace.git
cd codemarketplace
npm install
```
Then, open up a new terminal tab:
```
truffle develop
> compile
> migrate
```
Go back to your previous tab:
```
node index.js
```
Client portal can be found at localhost:3000/buyer
Seller portal can be found at localhost:3000/seller
