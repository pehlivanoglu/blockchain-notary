# Blockchain Notary System

This project implements a **Blockchain Notary System** using a smart contract to store agreements on the blockchain and reference their content via IPFS (InterPlanetary File System). The smart contract ensures that agreements are immutable and tamper-proof while IPFS provides decentralized storage.

---

## Features
- Store agreements as IPFS CIDs (Content Identifiers) on the blockchain.
- Retrieve stored agreements with their associated timestamp.
- Local blockchain setup with Ganache for development and testing.

---

## Prerequisites
- **Node.js** (LTS version recommended)
- **NVM** (Node Version Manager) for managing Node.js versions
- **Truffle** (Smart contract development framework)
- **Hardhat** (Local Ethereum blockchain)
- **Solidity Compiler** (Configured via Truffle)

---

## Installation and Setup


### 1. Install Dependencies
Install the required Node.js packages:
```bash
$ npm install
```
### 2.1 Run the Server
Start the API server:
- **CLI**:
  ```bash
  $ npm run dev
  ```


### 2.2 Run Hardhat
Start a local blockchain instance using Hardhat in a new terminal:
- **CLI**:
  ```bash
  $ npx hardhat node
  ```

### 3. Configure Truffle
Verify the `truffle-config.js` file:
```javascript
module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 7545,
      network_id: "*", // Any network
    },
  },
  compilers: {
    solc: {
      version: "0.8.21", // Solidity version
    },
  },
};
```

### 4. Compile and Deploy Contracts
Force a clean compile and redeploy:
```bash
$ truffle compile --all
$ truffle migrate --network development --reset
```


## Install and Run Kubo (Local IPFS)

### Step 1: Install Kubo
1. Extract the downloaded file:
   ```bash
   tar -xvzf kubo-linux-amd64.tar.gz
   ```
2. Move into the extracted folder:
   ```bash
   cd kubo
   ```
3. Copy the `ipfs` binary to `/usr/local/bin` to make it globally accessible:
   ```bash
   sudo mv ipfs /usr/local/bin/
   ```

---

### Step 2: Initialize IPFS
1. Run the following command to initialize your IPFS node:
   ```bash
   ipfs init
   ```

---

##$ Step 3: Start the IPFS Daemon
1. Launch the IPFS daemon to start your node:
   ```bash
   ipfs daemon
   ```

---
