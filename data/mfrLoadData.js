var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "eu-west-1",
    endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient();

console.log("Importing manufacturer into DynamoDB. Please wait.");

var allMfrs = JSON.parse(fs.readFileSync('mfrdata.json', 'utf8'));
allMfrs.forEach(function(mfr) {
    var params = {
        TableName: "Mfrs",
        Item: {
            "name": mfr.name,
            "active":  mfr.active,
            "description": mfr.description,
            "url": mfr.url,
            "image": mfr.image
        }
    };

    docClient.put(params, function(err, data) {
       if (err) {
           console.error("Unable to add mfr", mfr.name, ". Error JSON:", JSON.stringify(err, null, 2));
       } else {
           console.log("PutItem succeeded:", mfr.name);
       }
    });
});