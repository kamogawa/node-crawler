const request = require("request");
// const async = require("async");
// const { makeDoc } = require("./etc/util");
// const { url, save_dir } = require("./etc/config");
// const fs = require("fs");

callMain();

function callMain() {
  main()
}

async function main() {
  try {
    const result = await Promise.all([callApi(), callApi()]);

    var date1 = new Date("December 17, 1995 03:24:00");
    console.log(date);
    console.log("!!!!");

    date.setDate(date.getDate() - 1);
    date = date.toISOString().substr(0, 10);
    console.log(date);
    console.log(result);
  } catch (error) {}
}

function callApi() {
  return new Promise(function(resolve, reject) {
    request.get(
      {
        url:
          "https://api.themoviedb.org/3/movie/popular?api_key=d07205f9ad7855c70fd0b0a7b4459976&language=en-US"
      },
      (error, response, body) => {
        if (!error) {
          reject("success!");
        } else if (error) {
          console.log("error!");
        }
      }
    );
  });
}

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

// crawler();
