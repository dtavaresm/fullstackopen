import axios from "axios";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";

const getForecast = (lat, lon) => {
  const api_key = import.meta.env.VITE_SOME_KEY;

  let query = "lat=" + lat + "&lon=" + lon + "&appid=" + api_key;
  const request = axios.get(baseUrl + query);
  console.log(baseUrl + query)
  return request.then((response) => response.data);
};

export default { getForecast };