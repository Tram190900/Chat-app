import React, { useEffect, useState, } from "react";
import Style from "./FriendScreen.module.scss";
import clsx from "clsx";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { baseUrlApi, getUserRequest } from "./../../api/userAPI";
import { postChatRequest } from './../../api/chatAPI'
import { Image } from "react-bootstrap";
import { useNavigate} from 'react-router-dom'

const FriendsList = () => {
  const [friends, setFriends] = useState([]);
  const navigate = useNavigate()

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    getUserRequest(`${baseUrlApi}/user/${userId}/friends`)
      .then((result) => {
        setFriends(result.data.friends);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleCreateChat=(id)=>{
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const data={
      firstId:userId,
      secondId:id
    }
    postChatRequest(`${baseUrlApi}/chat`, data).then((result) => {
      if(result.status===200){
        navigate('/chat-app/chat')
      }
    }).catch((err) => {
      
    });
  }

  return (
    <div>
      {friends && friends.length > 0
        ? friends.map((item, index) => (
            <div key={index} className={clsx(Style.friendsWrap)} onClick={()=>handleCreateChat(item._id)}>
              <Image
                className={clsx(Style.imageFr)}
                roundedCircle
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
              />
              <p>{item.name}</p>
            </div>
          ))
        : null}
    </div>
  );
};
const FriendRequest = () => {
  return <p>Friend request</p>;
};

export default function FriendScreen() {
  const ACTIVITY1 = "FriendsList";
  const ACTIVITY2 = "FriendRequest";
  const [selected, setSelected] = useState(ACTIVITY1);

  const handleSelect = (activity) => {
    setSelected(activity);
  };

  return (
    <div className={clsx(Style.containerFriendScreen, "container-fluid row")}>
      <div className={clsx(Style.listMethod, "col-lg-3 col-sm-0 pt-5")}>
        <div
          className={clsx(
            Style.btnListFriend,
            selected === ACTIVITY1 ? Style.action : ""
          )}
          onClick={() => handleSelect(ACTIVITY1)}
        >
          <MdOutlinePeopleAlt size={35} />
          Friends List
        </div>
        <div
          className={clsx(
            Style.btnFriendRequest,
            selected === ACTIVITY2 ? Style.action : ""
          )}
          onClick={() => handleSelect(ACTIVITY2)}
        >
          <AiOutlineUserAdd size={34} />
          Friend request
        </div>
      </div>
      <div className={clsx(Style.panelWrap, "col-lg-9 col-sm-12")}>
        <div
          className={clsx(
            Style.friendListWrap,
            selected === ACTIVITY1 ? Style.action : ""
          )}
        >
          <FriendsList />
        </div>
        <div
          className={clsx(
            Style.friendRequestWrap,
            selected === ACTIVITY2 ? Style.action : ""
          )}
        >
          <FriendRequest />
        </div>
      </div>
    </div>
  );
}
