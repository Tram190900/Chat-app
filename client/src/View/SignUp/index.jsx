import clsx from "clsx";
import React, { Component, useEffect, useState } from "react";
import Style from "./SignUp.module.scss";
import { Button, Card, Form } from "react-bootstrap";
import { baseUrlApi, postRequest } from "../../Utils/services";
import { useNavigate } from "react-router-dom";
import ModalErr from "../Modals/ModalErr";
import { PiArrowLeftBold } from "react-icons/pi";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    let data = {
      name: name,
      email: email,
      password: password,
    };
    await postRequest(`${baseUrlApi}/user/register`, data, (res) => {
      if (res.status === 400) {
        setOpenModal(true);
        setMessageErr(res.data);
      } else {
        navigate("/chat-app/login");
      }
    });
  };
  return (
    <>
      <div className={clsx(Style.container)}>
        <PiArrowLeftBold
          size={35}
          color="white"
          style={{ top: 20, left: 20, position: "absolute", cursor: "pointer" }}
          onClick={() => navigate("/chat-app/login")}
        />
        <Card className={clsx(Style.cardContainer)}>
          <Card.Header className={clsx(Style.cardHeader)}>
            Create account <span>Chat-App</span>
          </Card.Header>
          <Card.Body className={clsx(Style.cardBody)}>
            <Card.Text className={clsx(Style.cardText)}>
              <h2>Register</h2>
              <Form>
                <Form.Control
                  placeholder="Username"
                  type="text"
                  id="txtUsername"
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <br />
                <Form.Control
                  placeholder="Email"
                  type="email"
                  id="txtUsername"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <br />
                <Form.Control
                  placeholder="Password"
                  type="password"
                  id="txtPassword"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form>
            </Card.Text>
          </Card.Body>
          <Card.Footer className={clsx(Style.cardFooter)}>
            <Button
              className={clsx(Style.btnLogin)}
              onClick={() => {
                handleRegister();
              }}
            >
              Sign up
            </Button>
          </Card.Footer>
        </Card>
      </div>
      <ModalErr
        show={openModal}
        onHide={() => setOpenModal(!openModal)}
        message={messageErr}
      />
    </>
  );
}
