import env from "react-dotenv";
import axios from "axios";

export const baseUrlApi = "http://localhost:5000";

export const postRequest = (url, data) => {
  return axios.post(url, data, { headers: "Content-Type: application/json" });
};
