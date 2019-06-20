const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const compare = require("./compare");
const upload = require("./aws_s3_upload");

const url = "https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/";

const title_arr = ["user-object", "tweet-object"];

title_arr.forEach( async (v)=>{
  await request(url+v, (e, response, body) => {
    if (e) {
      console.error(e);
    }
    try {
      const $ = cheerio.load(body);
      const twitter_object = $(
        ".d02-inline-code-snippet__copy"
      ).text();
  
      // fs.writeFile(
      //   "./userobject.json",
      //   JSON.stringify(twitter_object, null, ""),
      //   err => {
      //     if (err) throw err;
      //     console.log("The file has been saved!");
      //   }
      // );
      
      let uploadCheck = false;
      let uploadLoop = 0;
      while (!uploadCheck || uploadLoop <= 3) {
        uploadLoop++;
        uploadCheck = upload(twitter_object);
      }

    } catch (e) {
      console.error(e);
    }
  });
})


