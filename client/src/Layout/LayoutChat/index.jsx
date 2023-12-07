import clsx from "clsx";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Style from "./LayoutChat.module.scss";
import { BsSnapchat, BsChatDots } from "react-icons/bs";
import { MdOutlinePeopleAlt, MdLogout, MdSearch } from "react-icons/md";
import { Card, Form, Image, InputGroup } from "react-bootstrap";
import { getChat, handleSelectedChat } from "../../features/Chat/chatSlice";
import { baseUrlApi } from "../../api/chatAPI";
import { useDispatch, useSelector } from "react-redux";
import { getUserRequest } from "../../api/userAPI";
import { AiOutlineUserAdd } from "react-icons/ai";
import ChatScreen from "../../View/ChatScreen/index";
import FriendScreen from "./../../View/FriendScreen/index";
import { selectActive } from "../../features/ActivePane/ActivePaneSlice";
import { getMessage } from "../../features/Message/messageSlide";
import { connectSocket, socket } from "../../socket";

const PaneListChat = (props) => {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const listChat = useSelector((state) => state.chat);
  const handleGetListChat = async (id) => {
    try {
      await dispatch(getChat(`${baseUrlApi}/chat/${id}`));
    } catch (error) {
      console.log(error);
    }
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
          />
          <InputGroup.Text style={{ background: "rgb(174, 174, 174, 0.2)" }}>
            <MdSearch size={35} color="rgb(174,174,174,0.6)" />
          </InputGroup.Text>
        </InputGroup>
      </div>
      <div className={clsx(Style.lstFriendWrap)}>
        {listChat.current && listChat.current.length > 0
          ? listChat.current.map((item, index) => (
              <CardPeople key={index} user={user} chat={item} keyProps={item._id}/>
            ))
          : null}
      </div>
    </div>
  );
};

const CardPeople =  ({chat,keyProps}) => {
  const [userRecipient, setUserRecipient] = useState({})
  const dispatch = useDispatch();
  const selectedChat = useSelector(state=>state.chat.selectedChat)
  const user = JSON.parse(localStorage.getItem('user'))
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
      const rs = await dispatch(
        handleSelectedChat(`${baseUrlApi}/chat/find/${id}`)
      );
      const message = await dispatch(getMessage(`${baseUrlApi}/message/${chat._id}`))
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Card
      className={clsx(Style.cardWrap, keyProps===selectedChat._id?Style.active:'')}
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
          <p>Time</p>
        </Card.Title>
        <Card.Text className={clsx(Style.shortMessage)}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
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
  const dispatch = useDispatch()
  const active = useSelector(state=>state.activePane.active)
  const [user,setUser] = useState(JSON.parse(localStorage.getItem('user')))
  useEffect(()=>{
    if(!socket){
      connectSocket(user._id)
    }
  },[user, socket])

  const [activeFriend, setActiveFriend] = useState("FriendsList");

  const handleLogOut = () => {
    localStorage.removeItem("user");
    socket.disconnect()
    navigate("/chat-app/login");
  };
  const selectActiveMenu = async(value) => {
    await dispatch(
      selectActive(value)
    )
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
          <PaneListChat active={active}/>
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
