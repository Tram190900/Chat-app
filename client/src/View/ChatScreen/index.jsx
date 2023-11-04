import clsx from "clsx";
import Style from "./ChatScreen.module.scss";

import {
  MdSearch,
  MdLocalPhone,
  MdOutlineVideoCameraFront,
  MdSend,
} from "react-icons/md";
import { Card, Form, Image, InputGroup } from "react-bootstrap";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../Context/userContext";
import { useSelector } from "react-redux";

const CardPeople = ({ name, filterParam }) => {
  const [filter, setFilter] = filterParam;
  const handleSelected = () => {
    setFilter({ ...filter, ftNameReciver: name });
  };
  return (
    <Card
      className={clsx(Style.cardWrap)}
      onClick={() => {
        handleSelected();
      }}
    >
      <Card.Img
        className={clsx(Style.cardImage)}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
      />
      <Card.Body className={clsx(Style.cardBody)}>
        <Card.Title className={clsx(Style.cardTitle)}>
          <p>{name}</p>
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

const CardReciver = ({ filterParam }) => {
  const [filter, setFilter] = filterParam;
  return (
    <Card className={clsx(Style.cardReciverWrap)}>
      <Card.Img
        className={clsx(Style.cardImage)}
        variant="left"
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
      />
      <Card.Body className={clsx(Style.cardBody)}>
        <Card.Title>{filter.ftNameReciver}</Card.Title>
        <div className={clsx(Style.mediaWrap)}>
          <MdLocalPhone size={35} style={{ marginRight: "20px" }} />
          <MdOutlineVideoCameraFront size={35} />
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

const ContentReciver = ({ item, filterParam }) => {
  return (
    <div className={clsx(Style.reciverWrap)}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"/>
      <p>{item}</p>
    </div>
  );
};


const ChatScreen = () => {
  const [filter, setFilter] = useState({
    ftNameReciver: "1",
    ftImageReciver: "",
  });
  const [txtInput, setTxtInput] = useState("");
  const userContext = useContext(UserContext)
  const [userName, setUserName] = useState('')
  
  const [contentChat, setContentChat] = useState([
    { flat: "s", content: "sdfsfsdfsa" },
    { flat: "s", content: "ertetwrdf ffffffffffffffffffffff fffffffffff ffffffffffffff fffffffffff fffffdfsdf sf sfs " },
    {flat:'r', content:'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'},
    {flat:'s',content:'ttttttttt'}
  ]);

  useEffect(()=>{
    setUserName(JSON.parse(localStorage.getItem('user')).name)
  },[])


  return (
    <div className={clsx(Style.ChatContainer, "container-fluid")}>
      <div className={clsx(Style.listWrap, "col-lg-3 col-sm-0")}>
        <div className={clsx(Style.userWrap)}>
          <Image
            className={clsx(Style.imageWrap)}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
            roundedCircle
          />
          <p>{userName}</p>
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
          <CardPeople name={"1"} filterParam={[filter, setFilter]} />
          <CardPeople name={"2"} filterParam={[filter, setFilter]} />
          <CardPeople name={"3"} filterParam={[filter, setFilter]} />
          <CardPeople name={"4"} filterParam={[filter, setFilter]} />
          <CardPeople name={"5"} filterParam={[filter, setFilter]} />
          <CardPeople name={"6"} filterParam={[filter, setFilter]} />
          <CardPeople name={"7"} filterParam={[filter, setFilter]} />
          <CardPeople name={"8"} filterParam={[filter, setFilter]} />
        </div>
      </div>
      <div className={clsx(Style.chatWrap, "col-lg-9 col-sm-12")}>
        <div className={clsx(Style.userReceiverWrap)}>
          <CardReciver filterParam={[filter, setFilter]} />
        </div>
        <div className={clsx(Style.chatContent)}>
          <div className={clsx(Style.chatGroup)}>
            {
              contentChat.map((item, index)=>{
                if(item.flat==='s'){
                  return(
                    <ContentSend item={item.content}/>
                  )
                }else if(item.flat==='r'){
                  return(
                    <ContentReciver item={item.content}/>
                  )
                }
              })
            }
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
                setContentChat([...contentChat,{flat:'s', content: txtInput}])
                setTxtInput("");
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default ChatScreen;
