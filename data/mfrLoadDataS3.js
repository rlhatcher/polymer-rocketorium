var AWS = require("aws-sdk");
var fs = require('fs');

AWS.config.update({
    region: "eu-west-1"
});


var s3 = new AWS.S3();

console.log("Importing manufacturer into S3. Please wait.");

var allMfrs = JSON.parse(fs.readFileSync('mfrdata.json', 'utf8'));

allMfrs.forEach(function(mfr) {

  var theJson = JSON.stringify(mfr);

  console.log("Read succeeded:", theJson);

  var params = {
    Bucket: 'rocketorium-mfrs',
    Key: mfr.name,
    ACL: 'bucket-owner-full-control',
    Body: theJson
  };

  s3.putObject(params, function(err, data) {
     if (err) {
         console.log(err, err.stack);
     } else {
         console.log("PutItem succeeded:", mfr.name);
     }
  });
});