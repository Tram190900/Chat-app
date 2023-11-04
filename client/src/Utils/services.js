import env from "react-dotenv";
import axios from "axios";

export const baseUrlApi = "http://localhost:5000";

export const postRequest = (url, data, handle) => {
  axios
    .post(url, data,{headers:'Content-Type: application/json'})
    .then((res) => {
      handle(res.data);
    })
    .catch((err) => {
      handle({status:err.response});
    });
};
