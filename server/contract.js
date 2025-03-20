const { ethers } = require("ethers");
const fs = require('fs');
const path = require('path');
require("dotenv").config();


const { CONTRACT_ADDRESS, PRIVATE_KEY, NETWORK_URL } = process.env;

const abiPath = path.join(__dirname, 'abi', 'TransactionAgreement.json');
const contractJson = JSON.parse(fs.readFileSync(abiPath, 'utf8'));
const abi = contractJson.abi;

const provider = new ethers.JsonRpcProvider(NETWORK_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);

const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

module.exports = contract;

