import React, { useState } from 'react'
import { Button, Card, Modal } from 'react-bootstrap';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { MdOutlineCancelScheduleSend, MdPersonAddDisabled } from 'react-icons/md';
import { socket } from '../../socket';
import Swal from 'sweetalert2';
import { postFriendRequest } from '../../api/friendRequestAPI';
import { baseUrlApi } from '../../api/chatAPI';
import { useSelector } from 'react-redux';
import Style from './CardSearchUser.module.scss'
import clsx from 'clsx';

export default function CardSearchUser({user}) {
    const friends = useSelector((state) => state.user.currentFriends);
    const sendRequest = useSelector((state) => state.friendRequest.sendedRequest);
    const isFriend = friends.some((friend) => friend._id === user._id);
    const [wasSender, setWasSender] = useState(false);
    const wasSendRequest = sendRequest.some(
      (item) => item.recipient._id === user._id
    );
    const [openModal, setModal] = useState(false);
  
    const handleSelectCard = async () => {
      try {
        if (!isFriend) {
          setModal(!openModal);
        }
      } catch (error) {
        console.log(error);
      }
    };
    const handleSendFriendRequest = async () => {
      const currentUserId = JSON.parse(localStorage.getItem("user"))._id;
  
      const data = {
        sender: currentUserId,
        recipient: user._id,
      };
      try {
        const rs = await postFriendRequest(`${baseUrlApi}/friendRequest`, data);
        if (rs.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Send request successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          setWasSender(true);
          setModal(false);
          if (socket === null) return;
          socket.emit("sendRequest", { ...rs.data });
        }
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <>
        <Card
          className={clsx(Style.cardWrap)}
          onClick={() => {
            handleSelectCard();
          }}
        >
          <Card.Img
            className={clsx(Style.cardImage)}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
          />
          <Card.Body className={clsx(Style.cardBody)}>
            <Card.Title className={clsx(Style.cardTitle)}>
              <p>{user.name}</p>
              {!isFriend && !wasSender ? (
                <AiOutlineUserAdd size={25} />
              ) : !isFriend && wasSender ? (
                <MdOutlineCancelScheduleSend size={25} />
              ) : null}
            </Card.Title>
          </Card.Body>
        </Card>
        <Modal show={openModal} onHide={() => setModal(!openModal)}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body className="d-flex justify-content-between align-items-center">
            <span className="d-flex align-items-center">
              {!isFriend && !wasSender && !wasSender ? (
                <>
                  <AiOutlineUserAdd size={30} />
                  Send a friend request to this person
                </>
              ) : !isFriend && wasSender && !wasSender ? (
                <>
                  <MdPersonAddDisabled size={30} />
                  Canceling friend request
                </>
              ) : (
                <>
                  <MdPersonAddDisabled size={30} />
                  Canceling friend request
                </>
              )}
            </span>
            {!isFriend && !wasSendRequest && !wasSender ? (
              <Button onClick={() => handleSendFriendRequest()}>
                Send request
              </Button>
            ) : !isFriend && wasSendRequest && !wasSender ? (
              <Button>Cancel request</Button>
            ) : (
              <Button>Cancel request</Button>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setModal(!openModal)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
}
