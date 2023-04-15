import React from "react";

const UtextInput = ({placeholder, rRef, changeEventFunction }) => {
  return (
    <div className="u-input-container">
      <input ref={rRef}
        className="input"
        placeholder={placeholder ? placeholder : ""}
        type="text"
        onChange={changeEventFunction}
      />
      <span className="underline"></span>
    </div>
  );
};

export default UtextInput;
