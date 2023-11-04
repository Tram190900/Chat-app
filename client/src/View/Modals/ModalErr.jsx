import React from "react";
import { Button, Modal } from "react-bootstrap";
import { PiSealWarning } from "react-icons/pi";

export default function ModalErr(props) {
  return (
    <Modal {...props} aria-labelledby="contained-modal-title-vcenter" centered>
      <Modal.Header style={{ background: "#5871ff" }} closeButton></Modal.Header>
      <Modal.Body style={{ background: "#5871ff" ,textAlign:"center"}}>
        <PiSealWarning size={35} color="white" />
        <p style={{color:'white',fontWeight:'bold',}}>{props.message}</p>
      </Modal.Body>
    </Modal>
  );
}
