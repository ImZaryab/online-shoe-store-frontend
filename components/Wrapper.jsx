import React from "react";

//A wrapper component which has some classes applied by default for formatting, height, width, spacing
//additional classes can be passed as props to be applied if needed.

const Wrapper = ({ children, className }) => {
  return (
    <div
      className={`w-full max-w-[1280px] px-5 md:px-10 mx-auto ${
        className || ""
      }`}
    >
      {children}
    </div>
  );
};

export default Wrapper;
