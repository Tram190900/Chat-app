import clsx from "clsx";
import React, { useState } from "react";
import Style from "./SignUp.module.scss";
import { Button, Card, Form } from "react-bootstrap";
import { baseUrlApi, postUserRequestNoneToken } from "../../api/userAPI";
import { useNavigate } from "react-router-dom";
import ModalErr from "../Modals/ModalErr";
import { PiArrowLeftBold } from "react-icons/pi";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [messageErr, setMessageErr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [gender, setGender] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    let data = {
      name: name,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      gender: gender,
      dateOfBirth: dateOfBirth,
    };
    try {
      await postUserRequestNoneToken(`${baseUrlApi}/user/register`, data)
        .then((result) => {
          if (result.status === 200) {
            navigate("/chat-app/login");
          }
        })
        .catch((err) => {
          setMessageErr(err.response.data);
          setOpenModal(true);
        });
    } catch (error) {
      console.log(error);
      setMessageErr(error.response);
      setOpenModal(true);
    }
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
              <Form results={false}>
                <Form.Control
                  placeholder="Username"
                  type="text"
                  id="txtUsername"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                />
                <br />
                <Form.Control
                  placeholder="Email"
                  type="email"
                  id="txtUsername"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
                <br />
                <Form.Control
                  placeholder="Phone Number"
                  type="text"
                  id="txtUsername"
                  value={phoneNumber}
                  onChange={(e) => {
                    setPhoneNumber(e.target.value);
                  }}
                />
                <br />
                <Form>
                  <Form.Check
                    inline
                    label="Female"
                    name="gender"
                    type="radio"
                    defaultChecked
                    onClick={() => {
                      setGender(false);
                    }}
                  />
                  <Form.Check
                    inline
                    label="Male"
                    type="radio"
                    name="gender"
                    onClick={() => {
                      setGender(true);
                    }}
                  />
                </Form>
                <br />
                <Form.Control
                  placeholder="Phone Number"
                  type="date"
                  id="txtUsername"
                  value={dateOfBirth}
                  onChange={(e) => {
                    setDateOfBirth(e.target.value);
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
