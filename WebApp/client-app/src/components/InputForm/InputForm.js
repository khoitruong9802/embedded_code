import React from "react";
// import { WrapperInputStyle } from "./Style";
import { Input } from "antd";
import "./style.css";

const InputForm = (props) => {
  const { placeholder = "Nhập text", ...rests } = props;
  const handleOnchangeInput = (e) => {
    props.onChange(e.target.value);
  };
  return (
    <Input
      className="WrapperInputStyle"
      placeholder={placeholder}
      value={props.value}
      {...rests}
      onChange={handleOnchangeInput}
    />
  );
};

export default InputForm;
