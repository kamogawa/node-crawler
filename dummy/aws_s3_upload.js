var AWS = require('aws-sdk');

module.exports = function (text) { 
  AWS.config.loadFromPath('./rootkey.json');
  AWS.config.update({region: 'xx'});
  
  var s3 = new AWS.S3();
  var params = {
   Bucket: "バケット名",
   Key: "アップロード後のファイル名.jpg"
  };
  params.Body=text;
  s3.putObject(params, function(err, data) {
    if (err) {
      return false;
    } else {
      return true;
    }
  });
};
