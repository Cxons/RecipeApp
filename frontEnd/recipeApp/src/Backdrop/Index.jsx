import React from "react";
import { motion } from "framer-motion";

const Backdrop = ({ children, handleClose }) => {
  return (
    <motion.div
      className="flex justify-center items-center absolute left-0 top-0 w-[100%] h-[120vh] bg-[#000000e1]"
      onClick={handleClose}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
      }}
    >
      {children}
    </motion.div>
  );
};

export default Backdrop;
