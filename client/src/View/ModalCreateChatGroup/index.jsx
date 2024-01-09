import clsx from "clsx";
import React, { useRef, useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Image,
  Modal,
  Row,
} from "react-bootstrap";
import Style from "./ModalCreateChatGroup.module.scss";
import { useSelector } from "react-redux";
import { IoCloseCircle } from "react-icons/io5";

function ModalCreateChatGroup(props) {
  const currentFriend = useSelector((state) => state.user.currentFriends);
  const [selectFriends, setSelectFriends] = useState([]);
  const [groupName, setGroupName] = useState("");

  const handleSelectFriends = (item) => {
    if (selectFriends.includes(item)) {
      const update = selectFriends.filter((i) => i !== item);
      setSelectFriends(update);
    } else {
      setSelectFriends([...selectFriends, item]);
    }
  };

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          New Group Chat
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Control
          style={{ background: "rgb(174, 174, 174, 0.2)" }}
          placeholder="Group Name"
          aria-label="group name"
          aria-describedby="basic-addon1"
          onChange={(e) => {
            setGroupName(e.target.value);
          }}
        />
        <Container>
          <Row className={clsx(Style.listWrap)}>
            <Col className={clsx(Style.listFriend)}>
              {currentFriend.map((item, index) => (
                <div
                  className={clsx(Style.card)}
                  key={index}
                  onClick={() => {
                    handleSelectFriends( item);
                  }}
                >
                  <Form.Check
                    type="checkbox"
                    id={`checkbox-${item._id}`}
                    checked={selectFriends.includes(item)}
                  />
                  <Image
                    className={clsx(Style.imageWrap)}
                    src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
                    roundedCircle
                  />
                  <p>{item.name}</p>
                </div>
              ))}
            </Col>
            <Col className={clsx(Style.listSelect)}>
              {selectFriends.map((item, index) => (
                <div className={clsx(Style.card)} key={index}>
                  <span>
                    <Image
                      className={clsx(Style.imageWrap)}
                      src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
                      roundedCircle
                    />
                    <p>{item.name}</p>
                  </span>
                  <IoCloseCircle
                    size={25}
                    onClick={() => {
                      const update = selectFriends.filter((i) => i !== item);
                      setSelectFriends(update);
                    }}
                  />
                </div>
              ))}
            </Col>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => {
            props.onHide();
            setGroupName("");
            setSelectFriends([]);
          }}
        >
          Close
        </Button>
        <Button
          disabled={
            selectFriends.length > 0 && groupName.trim().length > 0
              ? ""
              : "disable"
          }
        >
          Create
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ModalCreateChatGroup;
