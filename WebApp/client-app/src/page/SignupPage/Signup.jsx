import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import "./style.css";
import smarthome from "../../assets/img/smart-home-logo-free-vector.jpg";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import * as UserService from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";

const SignUpPage = () => {
  const navigate = useNavigate();

  const [isShowPassword, setIsShowPassword] = useState(false);
  const [isShowConfirmPassword, setIsShowConfirmPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeFullname = (value) => {
    setFullname(value);
  };
  const handleOnchangeUsername = (value) => {
    setUsername(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };

  const mutation = useMutationHooks((data) => UserService.signupUser(data));

  const { data, isLoading, isSuccess } = mutation;
  // fix isSuccess error auto true
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "OK") {
        message.success();
        handleNavigateSignIn();
      }
    }
  }, [isSuccess]);

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleOnchangeConfirmPassword = (value) => {
    setConfirmPassword(value);
  };

  const handleNavigateSignIn = () => {
    navigate("/");
  };

  const handleSignUp = () => {
    mutation.mutate({
      fullname,
      username,
      email,
      password,
      confirmPassword,
      phone,
    });
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        style={{
          width: "800px",
          height: "600px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <div className="WrapperContainerLeft">
          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <h1>SIGN UP</h1>
            <p style={{ paddingLeft: "5px" }}>Create your account!</p>
          </div>
          <InputForm
            style={{ marginBottom: "15px" }}
            placeholder="fullname"
            value={fullname}
            onChange={handleOnchangeFullname}
          />
          <InputForm
            style={{ marginBottom: "15px" }}
            placeholder="username"
            value={username}
            onChange={handleOnchangeUsername}
          />
          <InputForm
            style={{ marginBottom: "15px" }}
            placeholder="abc@gmail.com"
            value={email}
            onChange={handleOnchangeEmail}
          />
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowPassword(!isShowPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "13px",
                right: "10px",
              }}
            >
              {isShowPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              placeholder="password"
              style={{ marginBottom: "15px" }}
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <div style={{ position: "relative" }}>
            <span
              onClick={() => setIsShowConfirmPassword(!isShowConfirmPassword)}
              style={{
                zIndex: 10,
                position: "absolute",
                top: "13px",
                right: "10px",
              }}
            >
              {isShowConfirmPassword ? <EyeFilled /> : <EyeInvisibleFilled />}
            </span>
            <InputForm
              style={{ marginBottom: "15px" }}
              placeholder="comfirm password"
              type={isShowConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={handleOnchangeConfirmPassword}
            />
          </div>
          <InputForm
            style={{ marginBottom: "15px" }}
            placeholder="phone"
            value={phone}
            onChange={handleOnchangePhone}
          />
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={
                !email.length || !password.length || !confirmPassword.length
              }
              onClick={handleSignUp}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "40px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "25px 0 ",
              }}
              textbutton={"Sign Up"}
              styleTextButton={{
                color: "#fff",
                fontSize: "15px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </Loading>
          <p
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              alignContent: "center",
              fontSize: "15px",
              justifyContent: "center",
            }}
          >
            Already have an account?{" "}
            <p className="WrapperTextLight" onClick={handleNavigateSignIn}>
              {" "}
              Login
            </p>
          </p>
        </div>
        <div className="WrapperContainerRight">
          <Image
            src={smarthome}
            preview={false}
            alt="iamge-logo"
            height="203px"
            width="203px"
          />
          <h3 style={{ margin: "10px" }}>Smart Home IOT System</h3>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
