import axios from "axios";

export const baseUrlApi = "http://localhost:5000";

export const getChatRequest = (url) => {
  return axios.get(url,{ headers: "Content-Type: application/json" });
};