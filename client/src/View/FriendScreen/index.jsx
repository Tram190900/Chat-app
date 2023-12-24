import React, { useEffect, useState } from "react";
import Style from "./FriendScreen.module.scss";
import clsx from "clsx";
import { baseUrlApi } from "./../../api/userAPI";
import { getChatRequest, postChatRequest } from "./../../api/chatAPI";
import { Button, Image } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectActive } from "../../features/ActivePane/ActivePaneSlice";
import { handleExitsChat } from "../../features/Chat/chatSlice";
import { socket } from "../../socket";
import {
  getFriendRequestByRecipient,
  handleGetRequest,
} from "../../features/FriendRequest/friendRequest";
import { getFriendRequest } from "../../api/friendRequestAPI";
import { getFriends } from "../../features/User/userSlice";

const FriendsList = () => {
  const friends = useSelector((state) => state.user.currentFriends);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   if (socket === null) return;
  //   const userId = JSON.parse(localStorage.getItem("user"))._id;
  //   console.log('eeeee');
  //   socket.on("getAcceptRequest", (res) => {
  //     console.log('ttttt');
  //     console.log(res);
  //     if (res.status === "200") {
  //       console.log(200);
  //       dispatch(getFriends(`${baseUrlApi}/user/${userId}/friends`));
  //     }
  //   });
  // }, [socket]);

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
        await dispatch(handleExitsChat(create.data))
        await dispatch(selectActive("chat"));
      }
    } else {
      dispatch(handleExitsChat(exitChat.data));
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
  const allRequest = useSelector((state) => state.friendRequest.currentRequest);
  const dispatch = useDispatch();

  useEffect(() => {
    if (socket === null) return;
    socket.on("getRequest", (res) => {
      dispatch(handleGetRequest(res));
    });
    return () => {
      socket.off("getRequest");
    };
  }, [socket]);

  const handleAcceptRequest = async (id) => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    try {
      const response = await getFriendRequest(
        `${baseUrlApi}/friendRequest/acceptRequest/${id}`
      );
      if (response.status === 200) {
        await dispatch(getFriends(`${baseUrlApi}/user/${userId}/friends`));
        await dispatch(
          getFriendRequestByRecipient(
            `${baseUrlApi}/friendRequest/findByRecipient/${userId}`
          )
        );
        if (socket === null) return;
        socket.emit("acceptRequest", { ...response.data });
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {allRequest.length > 0 &&
        allRequest.map((item, index) => (
          <div key={index} className={clsx(Style.friendsRequest)}>
            <div>
              <Image
                className={clsx(Style.imageFr)}
                roundedCircle
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
              />
              <p>{item.sender.name}</p>
            </div>
            <Button
              onClick={() => {
                handleAcceptRequest(item._id);
              }}
            >
              Add Friend
            </Button>
          </div>
        ))}
    </>
  );
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
