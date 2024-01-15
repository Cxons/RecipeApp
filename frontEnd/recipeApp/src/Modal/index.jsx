import React from "react";
import { motion } from "framer-motion";
import Backdrop from "../Backdrop/Index";

const dropIn = {
  hidden: {
    y: "-100vh",
    opacity: 0,
  },
  visible: {
    y: "0vh",
    opacity: 1,
    transiton: {
      duration: 0.1,
      type: "spring",
      dampness: 25,
      stiffness: 500,
    },
  },
  exit: {
    y: "100vh",
    opacity: 0,
  },
};

const Modal = ({ handleClose, children }) => {
  return (
    <Backdrop handleClose={handleClose}>
      <motion.div
        className="modal"
        onClick={(e) => {
          e.stopPropagation();
        }}
        variants={dropIn}
      >
        {children}
      </motion.div>
    </Backdrop>
  );
};

export default Modal;
