import React, { useEffect, useState } from 'react'
import { Card } from 'react-bootstrap';
import Style from './CardPeople.module.scss'
import { useDispatch, useSelector } from 'react-redux';
import { baseUrlApi } from '../../api/chatAPI';
import { getUserRequest } from '../../api/userAPI';
import { getMessageRequest } from '../../api/messageAPI';
import { socket } from '../../socket';
import { handleSelectedChat } from '../../features/Chat/chatSlice';
import clsx from 'clsx';
import { getMessage, handleUpdateNotification } from '../../features/Message/messageSlide';
import moment from 'moment';

export default function CardPeople({ chat, keyProps }) {
    const [userRecipient, setUserRecipient] = useState({});
    const dispatch = useDispatch();
    const selectedChat = useSelector((state) => state.chat.selectedChat);
    const onlineUsers = useSelector((state) => state.user.onlineUsers);
    const newMessage = useSelector((state) => state.message.newMessage);
    const [lastMessage, setLastMessage] = useState("");
    const [lastTime, setLastTime] = useState("");
    const notification = useSelector((state) => state.message.notification);
    const [count, setCount] = useState(null);
  
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
  
    useEffect( () => {
      const getLastMessage = async()=>{
        const userId = JSON.parse(localStorage.getItem("user"))._id;
        await getMessageRequest(`${baseUrlApi}/message/${chat._id}`)
          .then((result) => {
            const last = result.data[result.data?.length - 1];
            if (last.senderId === userId) {
              setLastMessage(`You: ${last.text}`);
            }else{
              setLastMessage(last.text)
            }
            setLastTime(last.createdAt);
          })
          .catch((err) => {
            console.log(err);
          });
        await socket.on("getMessage", (res) => {
          if (res.chatId === chat._id) {
            setLastMessage(res.text);
          }
        });
        return(()=>{
          socket.off('getMessage')
        })
      }
      getLastMessage()
    }, [newMessage, socket, selectedChat]);
  
    useEffect(() => {
      const userId = JSON.parse(localStorage.getItem("user"))._id;
      const userRevicerId = chat.members.find((id) => id !== userId);
      const noti = notification.filter(
        (item) => item.senderId === userRevicerId && item.isRead === false
      );
      setCount(noti.length);
    }, [notification]);
  
    const handleSelected = async (id) => {
      try {
        const rs = await dispatch(
          handleSelectedChat(`${baseUrlApi}/chat/find/${id}`)
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
          if(notification.length>0){
            dispatch(handleUpdateNotification(userRecipient._id))
          }
        }}
      >
        <Card.Img
          className={clsx(Style.cardImage)}
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
        />
        {onlineUsers.length > 0 &&
          onlineUsers.map((item, index) => {
            if (item.userId === userRecipient._id) {
              return <div key={index} className={clsx(Style.onlineDot)}></div>;
            }
          })}
        <Card.Body className={clsx(Style.cardBody)}>
          <Card.Title className={clsx(Style.cardTitle)}>
            <p className={clsx(Style.nameReicpient)}>{userRecipient.name}</p>
            <p className={clsx(Style.lastTime)}>{moment(lastTime).fromNow()}</p>
          </Card.Title>
          <Card.Text className={clsx(Style.shortMessage)}>
            {lastMessage}
          </Card.Text>
          {count > 0 ? <div className={clsx(Style.notifi)}>{count}</div> : null}
        </Card.Body>
      </Card>
    );
}
