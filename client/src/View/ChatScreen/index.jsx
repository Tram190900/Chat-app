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
import { useSelector } from "react-redux";
import { getUserRequest } from "../../api/userAPI";
import { baseUrlApi } from "../../api/chatAPI";
import welcome from "./../../image/welcome.jpg";

const CardRecipient = ({ chat }) => {
  const [userRevicer, setUservicer] = useState({});
  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("user"))._id;
    const userRevicerId = chat.members.find((id) => id !== userId);
    getUserRequest(`${baseUrlApi}/user/find/${userRevicerId}`)
      .then((result) => {
        setUservicer(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [chat]);
  return (
    <Card className={clsx(Style.cardReciverWrap)}>
      <Card.Img
        className={clsx(Style.cardImage)}
        variant="left"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
      />
      <Card.Body className={clsx(Style.cardBody)}>
        <Card.Title>{userRevicer.name}</Card.Title>
        <div className={clsx(Style.mediaWrap)}>
          <MdLocalPhone size={35} style={{ marginRight: "20px" }} />
          <MdOutlineVideoCameraFront size={35} />
          <CiMenuKebab size={35} />
        </div>
      </Card.Body>
    </Card>
  );
};

const ContentSend = ({ item }) => {
  return (
    <div className={clsx(Style.sendWrap)}>
      <p>{item}</p>
    </div>
  );
};

const ContentRecipient = ({ item, filterParam }) => {
  return (
    <div className={clsx(Style.reciverWrap)}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png" />
      <p>{item}</p>
    </div>
  );
};

const ChatScreen = () => {
  const selectedChat = useSelector((state) => state.chat.selectedChat);
  const [txtInput, setTxtInput] = useState("");

  const [contentChat, setContentChat] = useState([
    { flat: "s", content: "sdfsfsdfsa" },
    {
      flat: "s",
      content:
        "ertetwrdf ffffffffffffffffffffff fffffffffff ffffffffffffff fffffffffff fffffdfsdf sf sfs ",
    },
    {
      flat: "r",
      content:
        "aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
    },
    { flat: "s", content: "ttttttttt" },
  ]);

  return (
    <>
      {!selectedChat._id ? (
        <Image src={welcome} style={{width:'100%', height:'100%'}}/>
      ) : (
        <div className={clsx(Style.ChatContainer)}>
          <div className={clsx(Style.chatWrap)}>
            <div className={clsx(Style.userReceiverWrap)}>
              <CardRecipient chat={selectedChat} />
            </div>
            <div className={clsx(Style.chatContent)}>
              <div className={clsx(Style.chatGroup)}>
                {contentChat.map((item, index) => {
                  if (item.flat === "s") {
                    return <ContentSend item={item.content} />;
                  } else if (item.flat === "r") {
                    return <ContentRecipient item={item.content} />;
                  }
                })}
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
                    setContentChat([
                      ...contentChat,
                      { flat: "s", content: txtInput },
                    ]);
                    setTxtInput("");
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
