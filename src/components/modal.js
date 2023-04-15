import React, { useEffect } from "react";
import { Dialog, DialogBackground } from "./styled-components";

const Modal = ({ children, show, toggleModal }) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = "hidden";
      window.scrollTo(0, 0);
    } else {
      document.body.style.overflow = "visible";
    }
  });
  return (
    <>
      <Dialog show={show}>{children}</Dialog>
      <DialogBackground show={show} onClick={() => toggleModal()} />
    </>
  );
};

export default Modal;
