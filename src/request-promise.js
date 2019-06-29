const request = require("request");
const async = require("async");
const { makeDoc } = require("./etc/util");
const { url, save_dir } = require("./etc/config");
const fs = require("fs");

const getPage = v => {
  const pageRequest = callback => {
    request(v, (e, response, body) => {
      const tw_doc = makeDoc(body);
      callback(e, {
        title: v,
        body: tw_doc
      });
    });
  };
  return async.auto([async.retryable(3, pageRequest)]);
};

const crawler = async () => {
  page_arr = [];
  try {
    await Promise.all(
      url.map(async item => {
        const page = await getPage(item);
        page_arr.push(page[0]);
      })
    );
  } catch (error) {
    console.log("error");
  }

  page_arr.map(v => {
    var dt = new Date();
    console.log(Date(dt.getFullYear()));
    const month = dt.getMonth() + 1;
    const date = dt.getMonth();

    if (!fs.existsSync(`${save_dir}}/${v.title}`)) {
      console.log("ディレクトリ生成");
      fs.mkdirSync(`${save_dir}}/${v.title}`);
    }
    fs.writeFileSync(
      `${save_dir}}/${v.title}/${month}${date}_${title}.txt`,
      twitter_object
    );
  });
};

crawler();
