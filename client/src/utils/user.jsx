
import { useEffect, useState } from "react";
import { baseUrlApi, getUserRequest } from "../api/userAPI";

export const useFetchRecipientUser=(chat ,user)=>{
    const [userRecipient, setUserRecipient] = useState({});
    const userRecipientId = chat.members.find((id) => id !== user._id);
    useEffect(()=>{
        const getUser=()=>{
            getUserRequest(`${baseUrlApi}/user/find/${userRecipientId}`)
              .then((result) => {
                setUserRecipient(result.data);
              })
              .catch((err) => {
                console.log(err);
              });

        }
        getUser()
    },[chat])
    return{userRecipient}
}