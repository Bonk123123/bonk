import React from "react";

const Modal = ({ children }) => {
  return (
    <div className="absolute top-1/2 left-1/2 w-1/3 h-auto bg-white -translate-x-1/2 -translate-y-1/2 rounded">
      {children}
    </div>
  );
};

export default Modal;
