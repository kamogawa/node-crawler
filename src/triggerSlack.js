const request = require("request");

main();

async function main( params = {
  user: "notBot"
}) {

  const movie_api = 
  [
    {
      name: "api1",
      url:"https://api.themoviedb.org/3/movie/popular?api_key=d07205f9ad7855c70fd0b0a7b4459976&language=en-US"
    },
    {
      name: "api2",
      url:"https://api.themoviedb.org/3/movie/popular?api_key=d07205f9ad7855c70fd0b0a7b4459976&language=en-US"
    },
    {
      flag: false
    }
  ];

  if(params.user === "notBot") {
    try {
      let date = new Date();
      date.setDate(date.getDate() - 1);
      date = date.toISOString().substr(0, 10);
      const [api1, api2] = await Promise.all([callApi(movie_api[0]), callApi(movie_api[1])]);

      let checkCluster = "";
      let name = "";
      if (api1.api === 1 && api2.api === 1) {
        name = `api1, api2`;
        checkCluster = `api1: ${api1.api}, api2: ${api1.api},¥n`;
      } else if(api1.api === 1 ) {
        name = `api1`;
        checkCluster = `api1 ¥n`;
      } else if(api2.api === 1 ) {
        name = `api2`;
        checkCluster = `api2 ¥n`;
      } 

      if (checkCluster !== ""){
        let message = `api page value -> ${checkCluster}. api name ${name}`; 
        console.log(message);
      } else {
        console.log("no checked!");
      }

    } catch (error) {
      if (error.statusCode) {
        console.log("[ERROR]:" + error.statusCode);
      } else {
        console.log("[ERROR]:" + error);
      }
    }
  }
}

function callApi(params) {
  return new Promise(function(resolve, reject) {
    request.get({ url:params.url },
      (error, response, body) => {
        try {
          if (!error) {
            if (response.statusCode !== 200) {
              reject({
                statusCode: response.statusCode
              });
            } else {
              const api = JSON.parse(body);
              resolve({
                statusCode: response.statusCode,
                api: api.page,
                name: params.name
              });
            }
          } else {
            reject(error.stack);
          }     
        } catch (error) {
          reject(error);
        }
      }
    );
  });
}