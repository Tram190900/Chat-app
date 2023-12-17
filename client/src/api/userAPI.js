import env from "react-dotenv";
import axios from "axios";

export const baseUrlApi = "http://localhost:5000";

export const postUserRequestNoneToken = (url, data) => {
  return axios.post(url, data, { headers: "Content-Type: application/json" });
};
export const postUserRequest = (url, data) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  });
};
export const getUserRequest = (url) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  });
};
