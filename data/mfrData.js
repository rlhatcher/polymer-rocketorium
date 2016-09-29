var AWS = require("aws-sdk");

AWS.config.update({
  region: "eu-west-1",
  endpoint: "http://localhost:8000"
});

var docClient = new AWS.DynamoDB.DocumentClient()

console.log("Querying for active manufacturers.");

var params = {
    TableName : "Mfrs",
    KeyConditionExpression: "active = :active",
    ExpressionAttributeValues: {
        ":active": 1
    }
};

docClient.query(params, function(err, data) {
    if (err) {
        console.error("Unable to query. Error:", JSON.stringify(err, null, 2));
    } else {
        console.log("Query succeeded.");
        data.Items.forEach(function(item) {
            console.log(" -", item.name + ": \n" + item.description);
        });
    }
});