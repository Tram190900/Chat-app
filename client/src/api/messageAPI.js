import axios from "axios";

export const baseUrlApi = "http://localhost:5000";

export const getMessageRequest = (url) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  });
};
export const postMessageRequest = (url, data) => {
  const token = JSON.parse(localStorage.getItem("user")).token;
  return axios.post(url, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token} `,
    },
  });
};
