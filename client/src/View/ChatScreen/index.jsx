import clsx from "clsx";
import Style from "./ChatScreen.module.scss";
import { BsSnapchat, BsChatDots } from "react-icons/bs";
import { MdOutlinePeopleAlt, MdLogout, MdSearch } from "react-icons/md";
import { Button, Card, Form, Image, InputGroup } from "react-bootstrap";

const ChatScreen = () => {
  const CardPeople =() =>{
    return(
      <Card className={clsx(Style.cardWrap)}>
      <Card.Img className={clsx(Style.cardImage)} src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png" />
      <Card.Body className={clsx(Style.cardBody)}>
        <Card.Title className={clsx(Style.cardTitle)}>
          <p>Name</p>
          <p>Time</p>
        </Card.Title>
        <Card.Text className={clsx(Style.shortMessage)}>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
    )
  }

  return (
    <div className={clsx(Style.ChatContainer)}>
      <div className={clsx(Style.menuWrap)}>
        <div>
          <BsSnapchat size={30} color="white" />
          <h4>CNM</h4>
        </div>
        <div className={clsx(Style.menuCenter)}>
          <BsChatDots size={35} />
          <MdOutlinePeopleAlt size={35} className="mt-4" />
        </div>
        <div className="mb-4">
          <MdLogout size={35} />
        </div>
      </div>
      <div className={clsx(Style.listWrap)}>
        <div className={clsx(Style.userWrap)}>
          <Image
            className={clsx(Style.imageWrap)}
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/1200px-User-avatar.svg.png"
            roundedCircle
          />
          <p>User name</p>
          <InputGroup style={{width:'90%'}}>
            <Form.Control
            style={{background:'rgb(174, 174, 174, 0.2)'}}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <InputGroup.Text style={{background:'rgb(174, 174, 174, 0.2)'}}>
              <MdSearch size={35} color="rgb(174,174,174,0.6)"/>
            </InputGroup.Text>
          </InputGroup>
        </div>
        <div className={clsx(Style.lstFriendWrap)}>
          <CardPeople/>
          <CardPeople/>
          <CardPeople/>
          <CardPeople/>
          <CardPeople/>
          <CardPeople/>
          <CardPeople/>
          <CardPeople/>
        </div>
      </div>
      <div className={clsx(Style.chatWrap)}>
        <div className={clsx(Style.userReceiverWrap)}>
          <p>Tên ngươi nhận</p>
        </div>
        <div className={clsx(Style.chatContent)}>
          <p>khung chat</p>
        </div>
      </div>
    </div>
  );
};
export default ChatScreen;
