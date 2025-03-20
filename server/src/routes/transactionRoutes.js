/* eslint-disable no-undef */
const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');
const contract = require('../../contract');
const User = require('../models/User');
const Transaction = mongoose.model('Transaction');
const TransactionRequest = mongoose.model('TransactionRequest');
const { create } = require('ipfs-http-client');
const crypto = require('crypto'); 

const router = express.Router();
router.use(requireAuth);

const ipfs = create({ host: 'localhost', port: 5001, protocol: 'http' });

router.get('/transaction', async (req, res) => {
  const nid = req.user.nid;
  try {
    const transaction = await Transaction.find({ composerNid: nid });
    res.send(transaction);
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get('/transactionRequest', async (req, res) => {
  const nid = req.user.nid;
  const type = req.query.type;

  try {
    if (type === 'sent') {
      const transactionRequest = await TransactionRequest.find({ composerNid: nid });
      res.send(transactionRequest);
    } else if (type === 'received') {
      const transactionRequest = await TransactionRequest.find({ recipientNid: nid });
      res.send(transactionRequest);
    }
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post('/transaction', async (req, res) => {
  const { composerNid, composerRole, recipientNid, recipientRole, fields } = req.body;
  const action = req.body.action;

  try {
    if (action === 'accept') {
      console.log('Uploading to IPFS...');
      const jsonData = JSON.stringify({ composerNid, recipientNid, fields });
      let ipfs_cid;
      let tx_hash;
      let agreementKey;

      try {
        
        const jsonBuffer = Buffer.from(JSON.stringify(jsonData));
        const result = await ipfs.add(jsonBuffer);
        console.log('Added JSON to IPFS with CID:', result.cid.toString());
        ipfs_cid = result.cid.toString();

        agreementKey = crypto.createHash('sha256').update(JSON.stringify({ composerNid, recipientNid, fields })).digest('hex');

        const tx = await contract.storeAgreement(agreementKey, ipfs_cid);
        console.log('Transaction Hash:', tx.hash);
        await tx.wait();
        tx_hash = tx.hash;
      } catch (error) {
        console.error('Error adding JSON to IPFS or storing in blockchain:', error);
        throw error;
      }

      const transaction = new Transaction({ composerNid, composerRole, recipientNid, recipientRole ,fields, ipfs_cid, tx_hash, agreementKey });
      await transaction.save();

      const transactionRequest = await TransactionRequest.findOne({ composerNid, composerRole , recipientNid, recipientRole, fields });
      await transactionRequest.delete();
      res.send("Transaction request has been accepted!");
    } else if (action === 'reject') {
      const transactionRequest = await TransactionRequest.findOne({ composerNid, composerRole , recipientNid, recipientRole, fields });
      await transactionRequest.delete();
      res.send("Transaction request has been rejected!");
    } else {
      return res.status(422).send({ error: 'Action is not valid!' });
    }
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.post('/transactionRequest', async (req, res) => {
  const { composerRole, recipientNid, recipientRole } = req.body.formData;
  console.log(req.body);

  try {
    const transactionRequest = new TransactionRequest({ composerNid: req.user.nid , composerRole, recipientNid, recipientRole, fields: req.body.fields });
    await transactionRequest.save();
    res.send("Transaction request has been sent!");
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

router.get('/verifyTransaction', async (req, res) => {
  const { composerNid, recipientNid,fields } = req.body;

  try {
    const transaction = await Transaction.findOne({ composerNid, recipientNid,fields });

    if (!transaction) {
      return res.status(404).send({ error: 'Transaction not found.' });
    }

    const { ipfs_cid, agreementKey } = transaction;

    let blockchainCid;
    try {
      const agreement = await contract.getAgreement(agreementKey); 
      blockchainCid = agreement[0]; 
    } catch (error) {
      return res.status(422).send({ error: 'Error fetching agreement from blockchain.' });
    }

    if (ipfs_cid !== blockchainCid) {
      return res.status(422).send({ error: 'CID mismatch between blockchain and IPFS.' });
    }

    const chunks = [];
    for await (const chunk of ipfs.cat(ipfs_cid)) {
      chunks.push(chunk);
    }
    const ipfsData = Buffer.concat(chunks).toString();

    res.send({ message: 'Document is verified!', ipfsData });
  } catch (err) {
    res.status(422).send({ error: err.message });
  }
});

module.exports = router;