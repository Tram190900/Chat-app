import clsx from "clsx";
import Style from "./ChatScreen.module.scss";

import {
  MdSearch,
  MdLocalPhone,
  MdOutlineVideoCameraFront,
  MdSend,
} from "react-icons/md";
import { Card, Image } from "react-bootstrap";
import { useEffect, useState } from "react";
import { CiMenuKebab } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { baseUrlApi } from "../../api/chatAPI";
import welcome from "./../../image/welcome_v2.jpg";
import { useFetchRecipientUser } from "../../utils/user";
import { getMessage } from "../../features/Message/messageSlide";
import moment from 'moment'

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
      <p>{text}</p>
      <span>{moment(time).calendar()}</span>
    </div>
  );
};

const ContentRecipient = ({ text, time }) => {
  return (
    <div className={clsx(Style.reciverWrap)}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png" />
      <div>
        <p>{text}</p>
        <span>{moment(time).calendar()}</span>
      </div>
    </div>
  );
};

const ChatScreen = () => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const message = useSelector((state) => state.message.message);
  const [txtInput, setTxtInput] = useState("");
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

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
              <div className={clsx(Style.chatGroup)}>
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
                      <ContentSend key={index} text={item.text} time={item.createdAt}/>
                    ) : (
                      <ContentRecipient key={index} text ={item.text} time={item.createdAt}/>
                    )
                  )}
              </div>
              <div className={clsx(Style.inputGroup)}>
                <input
                  type="text"
                  onChange={(e) => {
                    setTxtInput(e.target.value);
                  }}
                  value={txtInput}
                />
                <MdSend
                  size={30}
                  color="#009ffb"
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    // setContentChat([
                    //   ...contentChat,
                    //   { flat: "s", content: txtInput },
                    // ]);
                    // setTxtInput("");
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
