const request = require("request");
const async = require("async");
const { makeDoc } = require("./etc/util");
const { url } = require("./etc/config");

function getPage() {
  function getUserObject(callback) {
    request(url["user"], (e, response, body) => {
      const tw_doc = makeDoc(body);
      callback(e, tw_doc);
    });
  }
  function getTweetObject(callback) {
    request(url["twitter"], (e, response, body) => {
      const tw_doc = makeDoc(body);
      callback(e, tw_doc);
    });
  }
  return async.series([
    async.retryable(3, getUserObject),
    async.retryable(3, getTweetObject)
  ]);
}

async function crawler() {
  try {
    var result = await getPage();
  } catch (error) {
    console.log("error");
  }
  result.map(v => {
    //
  });
}

crawler();
