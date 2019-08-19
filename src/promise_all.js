const request = require("request");

main();

async function main() {

  const movie_api = [
    {
      name: "api1",
      url:"https://api.themoviedb.org/3/movie/popular?api_key=d07205f9ad7855c70fd0b0a7b4459976&language=en-US"
    },
    {
      name: "api2",
      url:"https://api.themoviedb.org/3/movie/popular?api_key=d07205f9ad7855c70fd0b0a7b4459976&language=en-US"
    }
  ];

  try {

    let date = new Date();
    date.setDate(date.getDate() - 1);
    date = date.toISOString().substr(0, 10);
    const [api1, api2] = await Promise.all([callApi(movie_api[0]), callApi(movie_api[1])]);

    let massage = `${date} ¥n`;
    massage += `api1: ${api1} ¥n`;
    massage += `api1: ${api2} ¥n`;

    console.log(massage);

    const diff = Math.abs(800 - 1000);
    const max = Math.max(1000, 800);
    const rate = diff / max * 100;
    //소수점 3자리 까지만 표시
    rate.toFixed(3);
    //3자리 컴마표시
    Number(222222).toLocaleString();
  } catch (error) {
    if (error.statusCode) {
      console.log("[ERROR]:" + error.statusCode);
    } else {
      console.log("[ERROR]:" + error);
    }
  }
}

function callApi(params) {
  return new Promise(function(resolve, reject) {
    request.get(
      {
        url:params.url
      },
      (error, response, body) => {
        try {
          if (!error) {
            if (response.statusCode !== 200) {
              reject({statusCode: response.statusCode});
            } else if(response.statusCode === 200){
              resolve({statusCode: resse.statusCode});
            }
          } else if (error) {
            reject(error.stack);
          }     
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}