import React, { useEffect, useState } from "react";
import Style from "./PaneListChat.module.scss";
import CardPeople from "../CardPeople";
import CardSearchUser from "../CardSearchUser";
import {
  Form,
  Image,
  InputGroup,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import imageNotFound from "../../image/notFound.jpg";
import { useDispatch, useSelector } from "react-redux";
import { getChatByUser } from "../../features/Chat/chatSlice";
import { baseUrlApi } from "../../api/chatAPI";
import { getUserRequest } from "../../api/userAPI";
import clsx from "clsx";
import { MdSearch } from "react-icons/md";
import { AiOutlineUsergroupAdd } from "react-icons/ai";
import ModalCreateChatGroup from "../ModalCreateChatGroup";

export default function PaneListChat({ active }) {
  const [user, setUser] = useState({});
  const [inputUserName, setInputUserName] = useState("");
  const [listSearch, setListSearch] = useState([]);
  const [createGroup, setCreateGroup] = useState(false)

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
  }, [active]);

  return (
  <>
    <div className={clsx(Style.listWrap, "col-lg-3 col-sm-0")}>
      <div className={clsx(Style.userWrap)}>
        <Image
          className={clsx(Style.imageWrap)}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
          roundedCircle
        />
        <p>{user.name}</p>
        <span className="w-90">
          <InputGroup>
            <Form.Control
              style={{ background: "rgb(174, 174, 174, 0.2)" }}
              placeholder="User Name"
              aria-label="User Name"
              aria-describedby="basic-addon1"
              value={inputUserName}
              onChange={(e) => {
                setInputUserName(e.target.value);
                handleSearchUser();
              }}
            />
            <InputGroup.Text
              style={{
                background: "rgb(174, 174, 174, 0.2)",
                cursor: "pointer",
              }}
              onClick={() => {
                handleSearchUser();
              }}
            >
              <MdSearch size={35} color="rgb(174,174,174,0.6)" />
            </InputGroup.Text>
          </InputGroup>
          <AiOutlineUsergroupAdd
            size={35}
            style={{
              marginLeft: "5%",
              cursor: "pointer",
              position: "relative",
            }}
            onClick={()=>{setCreateGroup(!createGroup)}}
          />
        </span>
      </div>
      <div className={clsx(Style.lstFriendWrap)}>
        {listChat.current &&
        listChat.current.length > 0 &&
        inputUserName.length <= 0 ? (
          listChat.current.map((item, index) => (
            <CardPeople
              key={index}
              user={user}
              chat={item}
              keyProps={item._id}
            />
          ))
        ) : inputUserName.length > 0 ||
          (listSearch && listSearch.length > 0) ? (
          listSearch.map((item, index) => (
            <CardSearchUser user={item} key={index} />
          ))
        ) : listSearch.length === 0 ? (
          <Image style={{ width: "100%" }} src={imageNotFound} />
        ) : null}
      </div>
    </div>
    <ModalCreateChatGroup show={createGroup} onHide={() => setCreateGroup(!createGroup)}/>
  </>
  );
}
