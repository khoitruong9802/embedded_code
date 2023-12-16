import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Avatar, Layout, Menu, Space, Button } from "antd";
import smarthome from "../../assets/img/smart-home-logo-free-vector.jpg";
import {
  SettingOutlined,
  HomeOutlined,
  LogoutOutlined,
  BarChartOutlined,
  WechatOutlined,
} from "@ant-design/icons";

import { useDispatch, useSelector } from "react-redux";
import * as UserService from "../../services/UserServices";
import { resetUser } from "../../redux/slices/UserSlices";
// import Loading from "../LoadingComponent/Loading";
// import ButtonComponent from "../ButtonComponent/ButtonComponent";
const { Sider } = Layout;

const siderStyle = {
  backgroundColor: "#001628",
  position: "fixed",
  top: "-8px",
  margin: "0",
  padding: "0",
  height: "103vh",
};

const MyDashBoard = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [userName, setUserName] = useState("");
  // const [loading, setLoading] = useState(false);

  const handleNavigateLogout = () => {
    handleLogout();
    navigate("/");
  };

  const handleLogout = async () => {
    // setLoading(true);
    await UserService.logoutUser();
    dispatch(resetUser());
    // setLoading(false);
  };
  useEffect(() => {
    // setLoading(true);
    setUserName(user?.username);
    // setLoading(false);
  }, [user?.username]);

  return (
    <Space
      direction='vertical'
      style={{
        width: "100%",
        margin: "0",
        padding: "0",
        boxSizing: "border-box",
      }}>
      <Layout
        style={{
          padding: "0",
          margin: "0",
        }}>
        <Sider style={siderStyle} width={"18%"}>
          <div style={{ height: "5%" }}></div>
          <Link to={"/home"}>
            <Avatar
              size={{ xs: 50, sm: 50, md: 50, lg: 50, xl: 100, xxl: 150 }}
              src={smarthome}
              style={{
                margin: "10px auto",
                display: "block",
              }}
            />
          </Link>
          <Link
            to={"/profile"}
            style={{ ":hover": { textDecoration: "underline black" } }}>
            {user?.access_token ? (
              <p
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "10px",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "400",
                }}>
                {userName}
              </p>
            ) : (
              <p
                style={{
                  display: "block",
                  textAlign: "center",
                  marginTop: "10px",
                  color: "white",
                  fontSize: "1.5rem",
                  fontWeight: "400",
                }}>
                username
              </p>
            )}
          </Link>
          <p
            style={{
              display: "block",
              textAlign: "center",
              color: "white",
              marginBottom: "20px",
            }}>
            Host
          </p>
          <Menu theme='dark' defaultSelectedKeys={["1"]}>
            <Menu.Item key={"1"} icon={<HomeOutlined />}>
              <Link to={"/home"}>Dashboard</Link>
            </Menu.Item>
            <Menu.Item key={"2"} icon={<BarChartOutlined />}>
              <Link to={"/static"}>Static</Link>
            </Menu.Item>
            <Menu.Item key={"3"} icon={<SettingOutlined />}>
              <Link to={"/setting"}>Setting Profile</Link>
            </Menu.Item>
            <Menu.Item key={"4"} icon={<WechatOutlined />}>
              <Link to={"/support"}>Support</Link>
            </Menu.Item>
          </Menu>

          <Button
            style={{
              width: "80%",
              height: "7%",
              borderRadius: "10px",
              position: "absolute",
              top: "88%",
              left: "10%",
              fontWeight: "700",
            }}
            icon={
              <LogoutOutlined
                style={{ position: "absolute", top: "35%", left: "20%" }}
              />
            }
            compo
            onClick={handleNavigateLogout}>
            Logout
          </Button>
        </Sider>
      </Layout>
    </Space>
  );
};
export default MyDashBoard;
