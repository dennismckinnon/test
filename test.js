var readline = require('readline');
var fs = require('fs-extra');
var erisC = require('eris-contracts');
var crypto = require("crypto");

var restify = require('restify');
var http = require("http");
var url = require("url");


// All that needs doing atm.
var erisdbURL = "http://localhost:1337/rpc";
var PrivKey = "6B72D45EB65F619F11CE580C8CAED9E0BADC774E9C9C334687A65DCBAD2C4151CB3688B7561D488A2A4834E1AEE9398BEF94844D8BDBBCA980C11E3654A45906";
var contracts = erisC.solidityContractsDev(erisdbURL, PrivKey);


// Name of the app.
var name = "The test Server";

var contract;

main();

function main(){
    console.log("");
    console.log("Welcome to: " + name + ".");
    console.log("");

    var myAbi = fs.readJsonSync("./contracts/test.abi");
    var contractFactory = contracts(myAbi);

    try {
        // If this file exists, we've already deployed it. (Use NAMEREG later)
        var contractCfg = fs.readJsonSync("./contracts/test.cfg");
        contract = contractFactory.at(contractCfg.address);
//        contract.setOutputFormatter(erisC.outputFormatters.jsonStrings)
        server();
    } catch (error) {
        // Otherwise deploy and save.
        console.log("There is no test contract. We must deploy one. This takes about 10-15 seconds.");
        var myCompiledCode = fs.readFileSync('./contracts/test.binary').toString();

        contractFactory.new({data: myCompiledCode}, function (error, _contract) {
            if (error) {
                throw error;
            }
            fs.writeJsonSync("./contracts/test.cfg", {name: 'test', address: _contract.address});
            console.log("Deployed contract at: " + _contract.address);
            contract = _contract;
//            contract.setOutputFormatter(erisC.outputFormatters.jsonStrings)
            server();
        });
    }
}

function server(){

    var server = restify.createServer();
    //Define routes
    server.use(restify.acceptParser(server.acceptable));
    server.use(restify.queryParser());
    server.use(restify.jsonp());
    server.use(restify.bodyParser({ mapParams: false }));

    //Restify endpoints. Copy into appropriate section

    server.get('/get', get_get);

    server.listen(8080);

}

//Functions called by the Rest endpoints. Copy into the appropriate section

function get_get(req, res, next){

    contract.get.call(function(error, output){
        if (error) {
            console.log(error.toString())
            res.writeHeader(500, {"Content-Type": "text/plain"})
            res.write("An error occurred in the blockchain")
            res.end()

        } else {
            res.send(output.toString())
        }
    });
    next()
}