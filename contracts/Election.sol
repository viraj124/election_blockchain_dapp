pragma solidity ^0.5.2;

contract Election {
    // Read/write candidate
    struct candidate {
        uint id;
        string name;
        uint count;
    }

    event votedEvent (
        uint candidateid
    );

    mapping(uint => candidate) public candidates;

    mapping(address => bool) public voted;

    uint public candidateCount;


    function addCandidate(string memory name) private {
        candidateCount++;
        candidates[candidateCount] = candidate(candidateCount,name,0);
    }

    function vote(uint candidateid) public {
     require(!voted[msg.sender]);
     require(candidateid>0 && candidateid <= candidateCount);
     voted[msg.sender] =  true;
     candidates[candidateid].count ++;
     emit votedEvent(candidateid);
    }

    // Constructor
    constructor() public {
        addCandidate("Viraz");
        addCandidate("John");
    }
}