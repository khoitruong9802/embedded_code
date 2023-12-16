import React, { useEffect, useState } from "react";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import smarthome from "../../assets/img/smart-home-logo-free-vector.jpg";
import "./style.css";
import { Image } from "antd";
import { EyeFilled, EyeInvisibleFilled } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from "../../services/UserServices";
import Loading from "../../components/LoadingComponent/Loading";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/slices/UserSlices";
import * as message from "../../components/Message/Message";

const SignInPage = () => {
  const [isShowPassword, setIsShowPassword] = useState(false);
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user);

  const navigate = useNavigate();

  const mutation = useMutationHooks((data) => UserService.loginUser(data));
  const { data, isLoading, isSuccess } = mutation;

  // fix isSuccess error auto true
  useEffect(() => {
    if (isSuccess) {
      if (data?.status === "OK") {
        console.log("isSuccess 1:", isSuccess);
        if (location?.state) {
          navigate(location?.state);
        } else {
          message.success();
          navigate("/home");
        }

        localStorage.setItem(
          "access_token",
          JSON.stringify(data?.access_token)
        );
        localStorage.setItem(
          "refresh_token",
          JSON.stringify(data?.refresh_token)
        );
        if (data?.access_token) {
          const decoded = jwt_decode(data?.access_token);
          console.log("decode", decoded);
          if (decoded?.id) {
            handleGetDetailsUser(decoded?.id, data?.access_token);
          }
        }
      }
    }
  }, [isSuccess]);

  const handleGetDetailsUser = async (id, token) => {
    const storage = localStorage.getItem("refresh_token");
    const refreshToken = JSON.parse(storage);
    const res = await UserService.getDetailsUser(id, token);
    console.log("res", res);
    dispatch(updateUser({ ...res?.data, access_token: token, refreshToken }));
  };

  const handleNavigateSignUp = () => {
    navigate("/signup");
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };

  const handleOnchangePassword = (value) => {
    setPassword(value);
  };

  const handleSignIn = () => {
    console.log("loginlogin");
    mutation.mutate({
      email,
      password,
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
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <div className="WrapperContainerLeft">
          <div style={{ marginBottom: "30px", textAlign: "center" }}>
            <h1>WELCOME BACK!</h1>
            <p style={{ paddingLeft: "5px" }}>Log in to your account here.</p>
          </div>

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
              type={isShowPassword ? "text" : "password"}
              value={password}
              onChange={handleOnchangePassword}
            />
          </div>
          <p style={{ paddingLeft: "5px", paddingTop: "10px" }}>
            <p className="WrapperTextLight">Fogot Password?</p>
          </p>
          {data?.status === "ERR" && (
            <span style={{ color: "red" }}>{data?.message}</span>
          )}
          <Loading isLoading={isLoading}>
            <ButtonComponent
              disabled={!email.length || !password.length}
              onClick={handleSignIn}
              size={40}
              styleButton={{
                background: "rgb(255, 57, 69)",
                height: "40px",
                width: "100%",
                border: "none",
                borderRadius: "4px",
                margin: "25px 0",
              }}
              textbutton={"Login"}
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
            Don't have an account?{" "}
            <p className="WrapperTextLight" onClick={handleNavigateSignUp}>
              {" "}
              Sign Up
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

export default SignInPage;
