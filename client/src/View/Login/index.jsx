import Style from "./Login.module.scss";
import clsx from "clsx";
import { Button, Card, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const handleLogin = ()=>{
    navigate('/chat-app/chat')
  }
  return (
    <div className={clsx(Style.containerLogin)}>
      <Card className={clsx(Style.cardContainer)}>
        <Card.Header className={clsx(Style.cardHeader)}>
          Welcome to <span>Chat-App</span>
        </Card.Header>
        <Card.Body className={clsx(Style.cardBody)}>
          <Card.Text className={clsx(Style.cardText)}>
            <h2>Login</h2>
            <Form>
              <Form.Control
                placeholder="Username"
                type="text"
                id="txtUsername"
              />
              <br />
              <Form.Control
                placeholder="Password"
                type="password"
                id="txtPassword"
              />
            </Form>
          </Card.Text>
          <Button className={clsx(Style.btnLogin)} onClick={()=>{handleLogin()}}>Login</Button>
        </Card.Body>
        <Card.Footer className={clsx(Style.cardFooter)}>
          <Button className={clsx(Style.btnGoogle)}>
            <FcGoogle size={25} />
            Sign in with Google
          </Button>
          <Button className={clsx(Style.btnGoogle)}>
            <BsFacebook size={25} />
            Sign in with Facebook
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};
export default Login;
