var election = artifacts.require('./Election.sol');

contract("Election", function(accounts) {
    var electionInstance;
//used promises 
    it("initiaalizes two candidates", function(){
        return election.deployed().then(function(instance){
            return instance.candidateCount();
        }).then(function(count){
         assert.equal(2,count)
        });
    });

    it("verifies details of two participlants",function(){
        return election.deployed().then(function(instance){
            electioninstance = instance
            return electioninstance.candidates(1);
        }).then(function(candidate){
            assert.equal(candidate[0], 1, "contains the correct id");
            assert.equal(candidate[1], "Viraz", "contains the correct name");
            return electioninstance.candidates(2);
        }).then(function(candidate){
            assert.equal(candidate[0], 2, "contains the correct id");
            assert.equal(candidate[1], "John", "contains the correct name");

        })
    })


    it("allows voting from a candidate",function(){
        return election.deployed().then(function(instance){
            electionInstance = instance
            var candidateid = 1
            return electionInstance.vote(candidateid,{ from : accounts[0]
            }).then(function(reciept){
            assert.equal(reciept.logs.length,1,"An event has been triggered")
            assert.equal(reciept.logs[0].event,"votedEvent","Event name is correct")
            assert.equal(reciept.logs[0].args.candidateid.toNumber(),candidateid,"Id is correct")
            return electionInstance.candidates(candidateid);
            }).then(function(candidate){
                assert(accounts[0],"this account has voted");
                assert.equal(candidate[2],1,"incremented vote count");
                return electionInstance.vote(candidateid, { from : accounts[0] });
                }).then(assert.fail).catch(function(error) {
                    assert(error.message.indexOf('revert') >= 0, "error message must contain revert");
                });
                });
                });
                });
