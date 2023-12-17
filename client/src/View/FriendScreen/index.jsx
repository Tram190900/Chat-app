import React, { useEffect, useState } from "react";
import Style from "./FriendScreen.module.scss";
import clsx from "clsx";
import { MdOutlinePeopleAlt } from "react-icons/md";
import { AiOutlineUserAdd } from "react-icons/ai";
import { baseUrlApi, getUserRequest } from "./../../api/userAPI";
import { getChatRequest, postChatRequest } from "./../../api/chatAPI";
import { Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectActive } from "../../features/ActivePane/ActivePaneSlice";
import { handleExitsChat } from "../../features/Chat/chatSlice";

const FriendsList = () => {
  const friends = useSelector((state)=> state.user.currentFriends)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateChat = async (id) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const exitChat = await getChatRequest(
      `${baseUrlApi}/chat/find/${userId}/${id}`
    );
    if (exitChat.data.length === 0) {
      const data = {
        firstId: userId,
        secondId: id,
      };
      const create = await postChatRequest(`${baseUrlApi}/chat/`, data);
      if (create.status === "200") {
        dispatch(selectActive("chat"));
      }
    } else {
      dispatch(handleExitsChat(exitChat.data))
      dispatch(selectActive("chat"));
    }
  };

  return (
    <div>
      {friends && friends.length > 0
        ? friends.map((item, index) => (
            <div
              key={index}
              className={clsx(Style.friendsWrap)}
              onClick={() => handleCreateChat(item._id)}
            >
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

export default function FriendScreen(props) {
  return (
    <div className={clsx(Style.containerFriendScreen, "container-fluid")}>
      <div className={clsx(Style.panelWrap, "col-lg-12 col-sm-12")}>
        <div
          className={clsx(
            Style.friendListWrap,
            props.active === "FriendsList" ? Style.action : ""
          )}
        >
          <FriendsList />
        </div>
        <div
          className={clsx(
            Style.friendRequestWrap,
            props.active === "FriendRequest" ? Style.action : ""
          )}
        >
          <FriendRequest />
        </div>
      </div>
    </div>
  );
}
