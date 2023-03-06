import axios from "axios";

const API = "https://restcountries.com/v3.1/";

export default axios.create({
  baseURL: API,
});
