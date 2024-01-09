import Style from "./Login.module.scss";
import clsx from "clsx";
import { Button, Card, Form } from "react-bootstrap";
import { FcGoogle } from "react-icons/fc";
import { BsFacebook } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { baseUrlApi } from "../../api/userAPI";
import { useState } from "react";
import ModalErr from "../Modals/ModalErr";
import {useDispatch} from 'react-redux'
import { getUser } from "../../features/User/userSlice";
import { unwrapResult } from "@reduxjs/toolkit";

const Login = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [messageErr, setMessageErr] = useState("");
  const dispatch = useDispatch()

  const navigate = useNavigate();
  
  const handleLogin = async () => {
    const data = {
      phoneNumber: phone,
      password: password,
    };
    try {
      const actionResult = await dispatch(
        getUser({param1: `${baseUrlApi}/user/login`, param2: data})
      )
      const currentUser = unwrapResult(actionResult)
      localStorage.setItem('user', JSON.stringify(currentUser))
      navigate('/chat-app/chat')
    } catch (error) {
      setOpenModal(true)
      setMessageErr(error.message)
    }
  };
  return (
    <>
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
                  placeholder="Phone number"
                  type="text"
                  id="txtUsername"
                  onChange={(e) => setPhone(e.target.value)}
                />
                <br />
                <Form.Control
                  placeholder="Password"
                  type="password"
                  id="txtPassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form>
            </Card.Text>
            <Button
              className={clsx(Style.btnLogin)}
              onClick={() => {
                handleLogin();
              }}
            >
              Login
            </Button>
          </Card.Body>
          <Card.Footer className={clsx(Style.cardFooter)}>
            <p
              className={clsx(Style.SignUp)}
              onClick={() => {
                navigate("/chat-app/sign-up");
              }}
            >
              Sign Up
            </p>
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
      <ModalErr show={openModal} onHide={()=>setOpenModal(!openModal)} message={messageErr}/>
    </>
  );
};
export default Login;
