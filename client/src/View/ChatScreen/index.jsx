import clsx from "clsx";
import Style from "./ChatScreen.module.scss";

import {
  MdLocalPhone,
  MdOutlineVideoCameraFront,
  MdSend,
} from "react-icons/md";
import { Card, Image } from "react-bootstrap";
import { useEffect, useRef, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi } from "../../api/chatAPI";
import welcome from "./../../image/welcome_v2.jpg";
import { useFetchRecipientUser } from "../../utils/user";
import {
  handleSetMessage,
  sendMessage,
} from "../../features/Message/messageSlide";
import moment from "moment";
import InputEmoji from "react-input-emoji";
import { socket } from "../../socket";
import { handleNewChat } from "../../features/Chat/chatSlice";

const CardRecipient = ({ chat, user }) => {
  const { userRecipient } = useFetchRecipientUser(chat, user);

  return (
    <Card className={clsx(Style.cardReciverWrap)}>
      <Card.Img
        className={clsx(Style.cardImage)}
        variant="left"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
      />
      <Card.Body className={clsx(Style.cardBody)}>
        <Card.Title>{userRecipient.name}</Card.Title>
        <div className={clsx(Style.mediaWrap)}>
          <MdLocalPhone size={35} style={{ marginRight: "20px" }} />
          <MdOutlineVideoCameraFront size={35} />
          <CiMenuKebab size={35} />
        </div>
      </Card.Body>
    </Card>
  );
};

const ContentSend = ({ text, time }) => {
  return (
    <div className={clsx(Style.sendWrap)}>
      <p>
        {text}
        <span>{moment(time).calendar()}</span>
      </p>
    </div>
  );
};

const ContentRecipient = ({ text, time }) => {
  return (
    <div className={clsx(Style.reciverWrap)}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png" />
      <div>
        <p>
          {text}
          <span>{moment(time).calendar()}</span>
        </p>
      </div>
    </div>
  );
};

const ChatScreen = () => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const message = useSelector((state) => state.message.currenMessage);
  const newMessage = useSelector((state)=> state.message.newMessage)
  const [inputMessage, setInputMessage] = useState("");
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const dispatch = useDispatch();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (socket === null) return;
    if (selectedChat.members.length <= 0) return;
    if (message?.length===1){
      socket.emit('sendFirstChat',{...newMessage, selectedChat})
    }
    const respientId = selectedChat.members.find((id) => id !== user._id);
    socket.emit("sendMessage", { ...newMessage, respientId });
  }, [newMessage]);

  useEffect(() => {
    if (socket === null || selectedChat.members.length <= 0) return;
    console.log('eeeee');
    socket.on("getMessage", (res) => {
      if (selectedChat._id !== res.chatId) return;
      dispatch(handleSetMessage(res));
    });
    return () => {
      socket.off("getMessage");
    };
  }, [socket, selectedChat]);


  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [message, selectedChat]);

  const handleSendMessage = async () => {
    if (inputMessage.trim().length > 0) {
      const data = {
        chatId: selectedChat._id,
        senderId: user._id,
        text: inputMessage,
      };
      try {
        const rs = await dispatch(
          sendMessage({ url: `${baseUrlApi}/message`, data: data })
        );
        setInputMessage("");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {!selectedChat._id ? (
        <Image src={welcome} style={{ width: "100%", height: "100%" }} />
      ) : (
        <div className={clsx(Style.ChatContainer)}>
          <div className={clsx(Style.chatWrap)}>
            <div className={clsx(Style.userReceiverWrap)}>
              <CardRecipient chat={selectedChat} user={user} />
            </div>
            <div className={clsx(Style.chatContent)}>
              <div
                id="style-1"
                className={clsx(Style.chatGroup)}
              >
                {/* {contentChat.map((item, index) => {
                  if (item.flat === "s") {
                    return <ContentSend key={index} item={item.content} />;
                  } else if (item.flat === "r") {
                    return <ContentRecipient key={index} item={item.content} />;
                  }
                })} */}
                {message &&
                  message.map((item, index) =>
                    item.senderId === user._id ? (
                      <span ref={scrollRef} key={index}>
                        <ContentSend
                          text={item.text}
                          time={item.createdAt}
                        />
                      </span>
                    ) : (
                      <span ref={scrollRef} key={index}>
                        <ContentRecipient
                          text={item.text}
                          time={item.createdAt}
                        />
                      </span>
                    )
                  )}
              </div>
              <div className={clsx(Style.inputGroup)}>
                {/* <input
                  type="text"
                  onChange={(e) => {
                    setInputMessage(e.target.value);
                  }}
                  value={inputMessage}
                /> */}
                <InputEmoji
                  value={inputMessage}
                  onChange={setInputMessage}
                  cleanOnEnter
                  onEnter={handleSendMessage}
                  placeholder="Type a message"
                />
                <MdSend
                  size={30}
                  color="#009ffb"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleSendMessage();
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default ChatScreen;
