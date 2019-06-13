const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");

const url =
  "https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/user-object";

const subject = ["user-object", "tweet-object"];
const titles_arr = [];

request(url, (e, response, body) => {
  if (e) {
    console.error(e);
  }
  try {
    const $ = cheerio.load(body);
    const twitter_object = $(
      ".d02-inline-code-snippet__copy",
      "#component-wrapper"
    ).text();

    fs.writeFile(
      "./userobject.json",
      JSON.stringify(twitter_object, null, ""),
      err => {
        if (err) throw err;
        console.log("The file has been saved!");
      }
    );
    console.log(twitter_object);
  } catch (e) {
    console.error(e);
  }
});
