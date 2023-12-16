import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import { useNavigate } from "react-router-dom";
import "./style.css";
import * as UserService from "../../services/UserServices";
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from "../../components/Message/Message";
import { updateUser } from "../../redux/slices/UserSlices";
// import { Button, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";

const ProfilePage = () => {
  // const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const mutation = useMutationHooks((data) => {
    const { id, access_token, ...rests } = data;
    UserService.updateUser(id, rests, access_token);
  });

  const dispatch = useDispatch();
  const { data, isLoading, isSuccess, isError } = mutation;

  useEffect(() => {
    setEmail(user?.email);
    setFullname(user?.fullname);
    setUsername(user?.username);
    setPhone(user?.phone);
  }, [user]);

  useEffect(() => {
    if (isSuccess) {
      message.success();
      handleGetDetailsUser(user?.id, user?.access_token);
    } else if (isError) {
      message.error();
    }
  }, [isSuccess, isError]);

  const handleGetDetailsUser = async (id, token) => {
    const res = await UserService.getDetailsUser(id, token);
    dispatch(updateUser({ ...res?.data, access_token: token }));
  };

  const handleOnchangeEmail = (value) => {
    setEmail(value);
  };
  const handleOnchangeUsername = (value) => {
    setUsername(value);
  };
  const handleOnchangeFullname = (value) => {
    setFullname(value);
  };
  const handleOnchangePhone = (value) => {
    setPhone(value);
  };

  const handleUpdate = () => {
    mutation.mutate({
      id: user?.id,
      fullname,
      username,
      email,
      phone,
      access_token: user?.access_token,
    });
  };
  // const handleUpdate = () => {
  //   navigate("/profile");
  // };
  return (
    <div
      style={{
        width: "80%",
        margin: "0 auto",
        height: "100vh",
        justifyContent: "center",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div className="WrapperHeader">User Profile</div>
      <Loading isLoading={isLoading}>
        <div className="WrapperContentProfile">
          <div className="WrapperInput">
            <div className="WrapperLabel" htmlFor="name">
              FullName
            </div>
            <InputForm
              style={{ width: "400px" }}
              id="fullname"
              value={fullname}
              onChange={handleOnchangeFullname}
            />
          </div>
          <div className="WrapperInput">
            <div className="WrapperLabel" htmlFor="name">
              Username
            </div>
            <InputForm
              style={{ width: "400px" }}
              id="username"
              value={username}
              onChange={handleOnchangeUsername}
            />
          </div>
          <div className="WrapperInput">
            <div className="WrapperLabel" htmlFor="email">
              Email
            </div>
            <InputForm
              style={{ width: "400px" }}
              id="email"
              value={email}
              onChange={handleOnchangeEmail}
            />
          </div>
          <div className="WrapperInput">
            <div className="WrapperLabel" htmlFor="phone">
              Phone
            </div>
            <InputForm
              style={{ width: "400px" }}
              id="email"
              value={phone}
              onChange={handleOnchangePhone}
            />
          </div>
          <div style={{ position: "relative" }}>
            <UploadOutlined
              style={{
                fontSize: "20px",
                position: "absolute",
                left: "140px",
                top: "25px",
                zIndex: "1",
              }}
            />
            <ButtonComponent
              onClick={handleUpdate}
              size={40}
              styleButton={{
                marginTop: "10px",
                width: "400px",
                borderRadius: "4px",
                padding: "10px 10px 10px 20px",
                height: "50px",
              }}
              textbutton={"Update"}
              styleTextButton={{
                color: "rgb(26, 148, 255)",
                fontSize: "20px",
                fontWeight: "700",
              }}
            ></ButtonComponent>
          </div>
        </div>
      </Loading>
    </div>
  );
};

export default ProfilePage;
