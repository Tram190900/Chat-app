import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./LayoutChat.module.scss";
import { BsSnapchat, BsChatDots } from "react-icons/bs";
import { MdOutlinePeopleAlt, MdLogout, MdSearch } from "react-icons/md";
import { Card, Form, Image, InputGroup } from "react-bootstrap";
import {
  getChatByUser,
  handleSelectedChatByChatId,
} from "../../features/Chat/chatSlice";
import { baseUrlApi } from "../../api/chatAPI";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../../api/userAPI";
import { AiOutlineUserAdd } from "react-icons/ai";
import ChatScreen from "../../View/ChatScreen/index";
import FriendScreen from "./../../View/FriendScreen/index";
import { selectActive } from "../../features/ActivePane/ActivePaneSlice";
import { getMessage } from "../../features/Message/messageSlide";
import { connectSocket, socket } from "../../socket";
import {
  getFriends,
  handleGetOnlineUsers,
} from "../../features/User/userSlice";

const CardPeople = ({ chat, keyProps }) => {
  const [userRecipient, setUserRecipient] = useState({});
  const dispatch = useDispatch();
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const onlineUsers = useSelector((state) => state.user.onlineUsers);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const userRevicerId = chat.members.find((id) => id !== userId);
    getUserRequest(`${baseUrlApi}/user/find/${userRevicerId}`)
      .then((result) => {
        setUserRecipient(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleSelected = async (id) => {
    try {
      await dispatch(
        handleSelectedChatByChatId(`${baseUrlApi}/chat/find/${id}`)
      );
      await dispatch(getMessage(`${baseUrlApi}/message/${chat._id}`));
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className={clsx(
        Style.cardWrap,
        keyProps === selectedChat._id ? Style.active : ""
      )}
      onClick={() => {
        handleSelected(chat._id);
      }}
    >
      <Card.Img
        className={clsx(Style.cardImage)}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
      />
      <Card.Body className={clsx(Style.cardBody)}>
        <Card.Title className={clsx(Style.cardTitle)}>
          <p>{userRecipient.name}</p>
          <span>
            <p>Time</p>
            {onlineUsers.length > 0 &&
              onlineUsers.map((item, index) => {
                if (item.userId === userRecipient._id) {
                  return (
                    <div key={index} className={clsx(Style.onlineDot)}></div>
                  );
                }
              })}
          </span>
        </Card.Title>
        <Card.Text className={clsx(Style.shortMessage)}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

const CardSearchUser = ({ user }) => {
  const friends = useSelector((state) => state.user.currentFriends);
  const isFriend = friends.some((friend) => friend._id === user._id);
  return (
    <Card
      className={clsx(Style.cardWrap)}
      onClick={() => {
        console.log("open");
      }}
    >
      <Card.Img
        className={clsx(Style.cardImage)}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
      />
      <Card.Body className={clsx(Style.cardBody)}>
        <Card.Title className={clsx(Style.cardTitle)}>
          <p>{user.name}</p>
          {
            !isFriend && <AiOutlineUserAdd size={25}/>
          }
        </Card.Title>
      </Card.Body>
    </Card>
  );
};

const PaneListChat = (props) => {
  const [user, setUser] = useState({});
  const [inputUserName, setInputUserName] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const dispatch = useDispatch();
  const listChat = useSelector((state) => state.chat);

  const handleGetListChat = async (id) => {
    try {
      await dispatch(getChatByUser(`${baseUrlApi}/chat/${id}`));
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchUser = async () => {
    if (inputUserName.length > 0) {
      const users = await getUserRequest(
        `${baseUrlApi}/user/findByName/${inputUserName}`
      );
      const list = users.data.filter((item) => item._id !== user._id);
      setListSearch(list);
    }
    return;
  };

  useEffect(() => {
    const rs = JSON.parse(localStorage.getItem("user"));
    setUser(rs);
    handleGetListChat(rs._id);
  }, [props.active]);
  return (
    <div className={clsx(Style.listWrap, "col-lg-3 col-sm-0")}>
      <div className={clsx(Style.userWrap)}>
        <Image
          className={clsx(Style.imageWrap)}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
          roundedCircle
        />
        <p>{user.name}</p>
        <InputGroup style={{ width: "90%" }}>
          <Form.Control
            style={{ background: "rgb(174, 174, 174, 0.2)" }}
            placeholder="Username"
            aria-label="Username"
            aria-describedby="basic-addon1"
            value={inputUserName}
            onChange={(e) => {
              setInputUserName(e.target.value);
              handleSearchUser();
            }}
          />
          <InputGroup.Text
            style={{ background: "rgb(174, 174, 174, 0.2)", cursor: "pointer" }}
            onClick={() => {
              handleSearchUser();
            }}
          >
            <MdSearch size={35} color="rgb(174,174,174,0.6)" />
          </InputGroup.Text>
        </InputGroup>
      </div>
      <div className={clsx(Style.lstFriendWrap)}>
        {listChat.current && listChat.current.length > 0 && inputUserName <= 0
          ? listChat.current.map((item, index) => (
              <CardPeople
                key={index}
                user={user}
                chat={item}
                keyProps={item._id}
              />
            ))
          : inputUserName.length > 0 || listSearch.length > 0
          ? listSearch.map((item, index) => (
              <CardSearchUser user={item} key={index} />
            ))
          : null}
      </div>
    </div>
  );
};

const PaneListFriend = (props) => {
  const ACTIVITY1 = "FriendsList";
  const ACTIVITY2 = "FriendRequest";
  const [selected, setSelected] = useState(ACTIVITY1);

  const handleSelect = (activity) => {
    setSelected(activity);
  };
  return (
    <div className={clsx(Style.listMethod)}>
      <div
        className={clsx(
          Style.btnListFriend,
          selected === ACTIVITY1 ? Style.action : ""
        )}
        onClick={() => {
          handleSelect(ACTIVITY1);
          props.selectActiveFriend(ACTIVITY1);
        }}
      >
        <MdOutlinePeopleAlt size={35} />
        Friends List
      </div>
      <div
        className={clsx(
          Style.btnFriendRequest,
          selected === ACTIVITY2 ? Style.action : ""
        )}
        onClick={() => {
          handleSelect(ACTIVITY2);
          props.selectActiveFriend(ACTIVITY2);
        }}
      >
        <AiOutlineUserAdd size={34} />
        Friend request
      </div>
    </div>
  );
};

export default function LayoutChat() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const active = useSelector((state) => state.activePane.active);
  const user = JSON.parse(localStorage.getItem("user"));

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
  }, []);

  useEffect(() => {
    if (!socket) {
      connectSocket(user._id);
    }
  }, [user]);

  useEffect(() => {
    if (socket == null) return;
    socket.emit("addNewUser", user._id);
    socket.on("getOnlineUser", (res) => {
      dispatch(handleGetOnlineUsers(res));
    });

    return () => {
      socket.off("getOnlineUser");
    };
  }, [socket]);

  const handleLogOut = () => {
    localStorage.removeItem("user");
    socket.emit("disconnet");
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
