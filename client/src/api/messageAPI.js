import axios from "axios";

export const baseUrlApi = "http://localhost:5000";

export const getMessageRequest = (url) => {
  return axios.get(url,{ headers: "Content-Type: application/json" });
};
export const postMessageRequest = (url, data) => {
  return axios.post(url, data, { headers: "Content-Type: application/json" });
};