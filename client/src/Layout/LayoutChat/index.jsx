import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./LayoutChat.module.scss";
import { BsSnapchat, BsChatDots } from "react-icons/bs";
import {
  MdOutlinePeopleAlt,
  MdLogout,
} from "react-icons/md";
import {
  handleNewChat,
} from "../../features/Chat/chatSlice";
import { baseUrlApi } from "../../api/chatAPI";
import { useDispatch, useSelector } from "react-redux";
import ChatScreen from "../../View/ChatScreen/index";
import FriendScreen from "./../../View/FriendScreen/index";
import { selectActive } from "../../features/ActivePane/ActivePaneSlice";
import {
  handleSetNotification,
  handleSetNotificationRead,
} from "../../features/Message/messageSlide";
import { connectSocket, socket } from "../../socket";
import {
  getFriends,
  handleGetOnlineUsers,
} from "../../features/User/userSlice";
import {
  getFriendRequestByRecipient,
  getFriendRequestBySender,
  handleGetRequest,
} from "../../features/FriendRequest/friendRequest";
import PaneListChat from "../../View/PaneListChat";
import PaneListFriend from "../../View/PaneListFriend";


export default function LayoutChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const active = useSelector((state) => state.activePane.active);
  const user = JSON.parse(localStorage.getItem("user"));
  const selectedChat = useSelector((state) => state.chat.selectedChat);

  const [activeFriend, setActiveFriend] = useState("FriendsList");

  useEffect(() => {
    const listFriend = async () => {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      try {
        await dispatch(getFriends(`${baseUrlApi}/user/${userId}/friends`));
      } catch (error) {
        console.log(error);
      }
    };
    listFriend();
    const getAllRequest = async () => {
      await dispatch(
        getFriendRequestByRecipient(
          `${baseUrlApi}/friendRequest/findByRecipient/${user._id}`
        )
      );
    };
    getAllRequest();
    const getAllSendRequest = async () => {
      await dispatch(
        getFriendRequestBySender(
          `${baseUrlApi}/friendRequest/findBySender/${user._id}`
        )
      );
    };
    getAllSendRequest();
  }, []);

  useEffect(() => {
    if (!socket) {
      connectSocket(user._id);
    }
  }, [socket]);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("addNewUser", user._id);
    socket.on("getOnlineUser", (res) => {
      dispatch(handleGetOnlineUsers(res));
    });
    socket.on("getFirstChat", (res) => {
      dispatch(handleNewChat(res.newChat));
    });
    socket.on("getRequest", (res) => {
      dispatch(handleGetRequest(res));
    });
    socket.on("getAcceptRequest", (res) => {
      if (res.status === 200) {
        dispatch(getFriends(`${baseUrlApi}/user/${user._id}/friends`));
      }
    });
    return () => {
      socket.off("getOnlineUser");
      socket.off("getFirstChat");
      socket.off("getRequest");
    };
  }, [socket]);

  useEffect(() => {
    socket.on("getNotification", (res) => {
      const isChatOpen = selectedChat?.members.some(
        (id) => id === res.senderId
      );
      if (isChatOpen) {
        dispatch(handleSetNotificationRead(res));
      } else {
        dispatch(handleSetNotification(res));
      }
    });
    return () => {
      socket.off("getNotification");
    };
  }, [socket, selectedChat]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    socket.emit("logOut");
    socket.disconnect();
    navigate("/chat-app/login");
  };
  const selectActiveMenu = async (value) => {
    await dispatch(selectActive(value));
  };
  const selectActiveFriend = (value) => {
    setActiveFriend(value);
  };

  return (
    <div className={clsx(Style.container)}>
      <div className={clsx(Style.menuWrap)}>
        <div>
          <BsSnapchat size={30} color="white" />
          <h4>CNM</h4>
        </div>
        <div className={clsx(Style.menuCenter)}>
          <BsChatDots
            size={35}
            className={clsx(
              Style.chatDots,
              active === "chat" ? Style.active : ""
            )}
            onClick={() => selectActiveMenu("chat")}
          />
          <MdOutlinePeopleAlt
            size={35}
            className={clsx(
              Style.peopleAlt,
              "mt-4",
              active === "listFriend" ? Style.active : ""
            )}
            onClick={() => selectActiveMenu("listFriend")}
          />
        </div>
        <div className="mb-4">
          <MdLogout
            size={35}
            style={{ cursor: "pointer" }}
            onClick={() => handleLogOut()}
          />
        </div>
      </div>
      <div className={clsx(Style.paneActive)}>
        <div
          className={clsx(
            Style.paneListChat,
            active === "chat" ? Style.active : ""
          )}
        >
          <PaneListChat active={active} />
        </div>
        <div
          className={clsx(
            Style.paneListFriend,
            active === "listFriend" ? Style.active : ""
          )}
        >
          <PaneListFriend selectActiveFriend={selectActiveFriend} />
        </div>
      </div>
      <div className={clsx(Style.paneMain)}>
        {active === "chat" ? (
          <div className={clsx(Style.paneChatMain)}>
            <ChatScreen />
          </div>
        ) : (
          <div className={clsx(Style.paneFriendMain)}>
            <FriendScreen active={activeFriend} />
          </div>
        )}
      </div>
    </div>
  );
}
