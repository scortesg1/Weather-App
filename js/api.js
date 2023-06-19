function getWeatherData(queryCity) {
  return new Promise((resolve, reject) => {
    const params = {
      key: '51876aa499eb4cbeab87b042c8f0cc87',
      city: queryCity
    };

    fetch('https://api.weatherbit.io/v2.0/current?' + new URLSearchParams(params))
      .then(response => response.json())
      .then(data => {
        const apiResponse = data.data[0];
        console.log(`Current temperature in ${apiResponse.city_name} is ${apiResponse.temp}℃`);
        console.log(apiResponse);
        resolve(apiResponse);
      })
      .catch(error => {
        console.log(error);
        reject(error);
      });
  });
}

export {getWeatherData}


