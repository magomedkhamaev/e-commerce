import React from "react";

const CustomInput = (props) => {
  const { type, name, placeholder, classname, disabled } = props;
  return (
    <div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className={`form-control ${classname}`}
        disabled={disabled}
      />
    </div>
  );
};

export default CustomInput;
