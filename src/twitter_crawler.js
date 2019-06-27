const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const compare = require("./compare");

const url =
  "https://developer.twitter.com/en/docs/tweets/data-dictionary/overview/";

const title_arr = ["user-object", "tweet-object"];

title_arr.forEach(async (v) => {
  await request(url + v, (e, response, body) => {
    if (e) {
      console.error(e);
    }
    try {
      //compare();
      var dt = new Date();
      console.log(Date(dt.getFullYear()));
      const path = dt.getFullYear();

      //ディレクトリの確認後、保存
      if (!fs.existsSync(`.test/${path}`)) {
        console.log("ディレクトリ生成");
        fs.mkdirSync(`.test/${path}`);
      }
      fs.writeFileSync(`.test/${path}/test02.txt`, twitter_object);

      // S3保留
      // let uploadCheck = false;
      // let uploadLoop = 0;
      // while (!uploadCheck || uploadLoop <= 3) {
      //   uploadLoop++;
      //   uploadCheck = upload(twitter_object);
      // }
    } catch (e) {
      console.error(e);
    }
  });
});
