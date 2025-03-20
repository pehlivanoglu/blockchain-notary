// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TransactionAgreement {
    struct Agreement {
        string cid; // IPFS CID
        uint256 timestamp; // When the agreement was stored
    }

    mapping(string => Agreement) public agreements; 
    string[] public agreementKeys; 

    event AgreementStored(string key, string cid);

    
    function storeAgreement(string memory key, string memory cid) public {
        require(bytes(agreements[key].cid).length == 0, "Agreement with this key already exists");

        agreements[key] = Agreement({
            cid: cid,
            timestamp: block.timestamp
        });

        agreementKeys.push(key);

        emit AgreementStored(key, cid);
    }

    function getAgreement(string memory key) public view returns (string memory cid, uint256 timestamp) {
        Agreement memory agreement = agreements[key];
        require(bytes(agreement.cid).length != 0, "Agreement not found");

        return (agreement.cid, agreement.timestamp);
    }

    
    function getAgreementKeys() public view returns (string[] memory) {
        return agreementKeys;
    }
}
