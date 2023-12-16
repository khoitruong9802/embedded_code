import {
  Button,
  Flex,
  Space,
  Switch,
  Typography,
  Slider,
  Modal,
  Input,
  ConfigProvider,
} from "antd";
import {
  PlusOutlined,
  BellOutlined,
  DesktopOutlined,
  DatabaseOutlined,
  PicLeftOutlined,
  WalletOutlined,
  HomeOutlined,
  BulbOutlined,
  // SlackOutlined,
  // TabletOutlined,
  DashboardOutlined,
  CloudOutlined,
} from "@ant-design/icons";
import { React, useEffect, useState } from "react";
import { Column } from "@ant-design/plots";
import dayjs from "dayjs";
import { data, rooms, sensor } from "./dataChart";
import io from "socket.io-client";

const DashBoardContent = () => {
  const [sensorData, setSensorData] = useState(null);
  const [room, setRoom] = useState(rooms[0]);
  const [deviceData, setDeviceData] = useState(null);
  useEffect(() => {
    const socket = io("http://localhost:3000"); // Kết nối tới server socket.io

    socket.on("sensorData", (data) => {
      console.log("Received sensor data:", data);
      console.log("temperature:", data.temperature);
      setSensorData(data);
    });

    socket.on("deviceData", (data) => {
      console.log("Received deivce data:", data);
      // console.log("door:", data.door);
      const transformedData = {
        door: data.door === 1 ? true : false,
        fan: data.fan === 1 ? true : false,
        lamp: data.lamp === 1 ? true : false,
      };
      setDeviceData(transformedData);
      // Xử lý dữ liệu cảm biến ở đây
    });
    return () => {
      socket.disconnect(); // Ngắt kết nối khi component unmount
    };
  }, []);

  const handleControl = (controlField, value) => {
    console.log("checked:", value);
    const updatedDeviceData = {
      ...deviceData,
      [controlField]: value,
    };
    setDeviceData(updatedDeviceData);
    console.log("updateControlData:", updatedDeviceData);
    const socket = io("http://localhost:3000");
    socket.emit("controlData", updatedDeviceData);
  };
  useEffect(() => {
    console.log("New device data:", deviceData);
  }, [deviceData]);

  const config = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      style: {
        fill: "#FFFFFF",
        opacity: 0.6,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: "&deg;C",
      },
      sales: {
        alias: "&deg;C",
      },
    },
  };

  const [thisDay, setThisDay] = useState(dayjs());

  setInterval(() => {
    setThisDay(dayjs());
  }, 1000);

  let valueSensorId = "";
  let valueDeviceName = "";
  const AddDevice = () => {
    Modal.confirm({
      title: "  Add Device",
      icon: <WalletOutlined fontSize="large" style={{ marginRight: "2%" }} />,
      content: (
        <div>
          <Input
            placeholder="Device Name"
            onChange={(e) => {
              valueDeviceName = e.target.value;
            }}
            style={{ margin: "2%" }}
          />
        </div>
      ),
      onOk() {
        if (
          !sensor.find((dataSensor0) => {
            return dataSensor0 === valueSensorId;
          })
        ) {
          sensor.push({ Id: valueSensorId, status: false, value: 100 });
        }
        // Nếu sau này phát triển ko có sensor ID thì có thể đưa việc add nó vào room thất bại thì nó sẽ ko bị lỗi nữa :))))
        room.device.push({
          deviceId: (room.device.length + 1).toString(),
          deviceName: valueDeviceName,
          sensorID: valueSensorId,
        });
      },
      onCancel() {},
    });
  };
  let valueAddRoom = "";
  const AddRoom = () => {
    Modal.confirm({
      title: "  Add Room",
      icon: <HomeOutlined fontSize="large" style={{ marginRight: "2%" }} />,
      content: (
        <div>
          <div>
            <Input
              placeholder="Room name"
              onChange={(e) => {
                valueAddRoom = e.target.value;
              }}
            />
          </div>
        </div>
      ),
      onOk() {
        rooms.push({
          roomId: (rooms.length + 1).toString(),
          roomName: valueAddRoom,
          device: [],
        });
        console.log(rooms);
      },
      onCancel() {},
    });
  };

  const lampStatus = deviceData && deviceData.lamp ? deviceData.lamp : false;
  const colorlamp = lampStatus ? "#3ACBE8" : "#f2f0f0";
  const fanStatus = deviceData && deviceData.fan ? deviceData.fan : false;
  const colorfan = fanStatus ? "#3ACBE8" : "#f2f0f0";
  const doorStatus = deviceData && deviceData.door ? deviceData.door : false;
  const colordoor = doorStatus ? "#3ACBE8" : "#f2f0f0";

  return (
    <div style={{ boxSizing: "border-box" }}>
      {/* Notify */}
      <Flex
        style={{
          width: "100%",
          paddingRight: "30px",
          paddingTop: "15px",
          marginBottom: "20px",
        }}
        justify={"flex-end"}
        align={"flex-start"}
      >
        <Button icon={<BellOutlined />} style={{ borderRadius: "50%" }} />
      </Flex>
      {/* Room List and Button add */}
      <Flex
        justify="space-between"
        align="center"
        style={{ width: "100%", padding: "1%", height: "120px" }}
      >
        <Space
          style={{
            border: "2px solid black",
            borderRadius: "10px",
            height: "100%",
            padding: "5px 10px",
          }}
        >
          {rooms.map((r) => {
            let icon;
            if (r.roomName === "Living room") {
              icon = <DesktopOutlined />;
            } else if (r.roomName === "Kitchen") {
              icon = <DatabaseOutlined />;
            } else {
              icon = <PicLeftOutlined />;
            }
            let colorRoom;
            let colorFont;
            if (room.roomId === r.roomId) {
              colorRoom = "#F5C525";
              colorFont = "white";
            } else {
              colorRoom = "#f2f0f0";
              colorFont = "black";
            }
            const styleRoom = {
              height: "90px",
              backgroundColor: colorRoom,
              color: colorFont,
              width: "160px",
              fontSize: "17px",
            };
            return (
              <Button
                icon={icon}
                style={styleRoom}
                onClick={() => {
                  setRoom(r);
                }}
              >
                {r.roomName}
              </Button>
            );
          })}
        </Space>
        <Space style={{ marginRight: "3%" }}>
          <Button
            icon={
              <PlusOutlined
                style={{ position: "absolute", left: "5px", top: "8.5px" }}
              />
            }
            style={{ backgroundColor: "#2f3cbd", color: "white" }}
            onClick={AddRoom}
          >
            ADD ROOM
          </Button>
          <Button
            icon={
              <PlusOutlined
                style={{ position: "absolute", left: "5px", top: "8.5px" }}
              />
            }
            style={{ backgroundColor: "#2f3cbd", color: "white" }}
            onClick={AddDevice}
          >
            ADD DEVICE
          </Button>
        </Space>
      </Flex>
      {/* Device list */}
      <Space
        wrap
        style={{
          width: "100%",
          padding: "1%",
          marginTop: "50px",
          marginBottom: "50px",
          gap: "30px",
        }}
      >
        <Space.Compact
          direction="vertical"
          style={{
            width: "100%",
            height: "150px",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "3%",
            // paddingBottom: "3%",
            backgroundColor: colorlamp,
            margin: "4% 0%",
            display: "block",
          }}
        >
          <Space style={{ display: "block", height: "90px" }}>
            <Flex
              justify="space-between"
              align="flex-start"
              style={{ padding: "1% 1.5%", width: "100%" }}
            >
              <Space
                direction="vertical"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                <BulbOutlined fontSize="large" style={{ paddingLeft: "10%" }} />
                <Typography>Light</Typography>
              </Space>
              <Space>
                {/* check value của device rồi chuyển hóa sang true|false */}
                {deviceData && (
                  <Switch
                    checked={deviceData.lamp}
                    onChange={(checked) => handleControl("lamp", checked)}
                  />
                )}
              </Space>
            </Flex>
          </Space>
          <Space
            style={{
              height: "20px",
              padding: "1%",
              width: "16vw",
              marginTop: "20px",
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    handleColor: "black",
                    trackBg: "black",
                    trackHoverBg: "black",
                    dotActiveBorderColor: "black",
                    handleActiveColor: "black",
                  },
                },
              }}
            >
              <Slider
                defaultValue={100}
                style={{
                  display: "block",
                  width: "14vw",
                  padding: "1%",
                }}
                Tooltip={{ open: true }}
              />
            </ConfigProvider>
          </Space>
        </Space.Compact>
        <Space.Compact
          direction="vertical"
          style={{
            width: "100%",
            height: "150px",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "3%",
            // paddingBottom: "3%",
            backgroundColor: colordoor,
            margin: "4% 0%",
            display: "block",
          }}
        >
          <Space style={{ display: "block", height: "90px" }}>
            <Flex
              justify="space-between"
              align="flex-start"
              style={{ padding: "1% 1.5%", width: "100%" }}
            >
              <Space
                direction="vertical"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                <BulbOutlined fontSize="large" style={{ paddingLeft: "10%" }} />
                <Typography>Door</Typography>
              </Space>
              <Space>
                {/* check value của device rồi chuyển hóa sang true|false */}
                {deviceData && (
                  <Switch
                    checked={deviceData.door}
                    onChange={(checked) => handleControl("door", checked)}
                  />
                )}
              </Space>
            </Flex>
          </Space>
          <Space
            style={{
              height: "20px",
              padding: "1%",
              width: "16vw",
              marginTop: "20px",
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    handleColor: "black",
                    trackBg: "black",
                    trackHoverBg: "black",
                    dotActiveBorderColor: "black",
                    handleActiveColor: "black",
                  },
                },
              }}
            >
              <Slider
                defaultValue={100}
                style={{
                  display: "block",
                  width: "14vw",
                  padding: "1%",
                }}
                Tooltip={{ open: true }}
              />
            </ConfigProvider>
          </Space>
        </Space.Compact>
        <Space.Compact
          direction="vertical"
          style={{
            width: "100%",
            height: "150px",
            border: "2px solid black",
            borderRadius: "10px",
            padding: "3%",
            // paddingBottom: "3%",
            backgroundColor: colorfan,
            margin: "4% 0%",
            display: "block",
          }}
        >
          <Space style={{ display: "block", height: "90px" }}>
            <Flex
              justify="space-between"
              align="flex-start"
              style={{ padding: "1% 1.5%", width: "100%" }}
            >
              <Space
                direction="vertical"
                style={{ fontSize: "15px", fontWeight: "bold" }}
              >
                <BulbOutlined fontSize="large" style={{ paddingLeft: "10%" }} />
                <Typography>Fan</Typography>
              </Space>
              <Space>
                {/* check value của device rồi chuyển hóa sang true|false */}
                {deviceData && (
                  <Switch
                    checked={deviceData.fan}
                    onChange={(checked) => handleControl("fan", checked)}
                  />
                )}
              </Space>
            </Flex>
          </Space>
          <Space
            style={{
              height: "20px",
              padding: "1%",
              width: "16vw",
              marginTop: "20px",
            }}
          >
            <ConfigProvider
              theme={{
                components: {
                  Slider: {
                    handleColor: "black",
                    trackBg: "black",
                    trackHoverBg: "black",
                    dotActiveBorderColor: "black",
                    handleActiveColor: "black",
                  },
                },
              }}
            >
              <Slider
                defaultValue={100}
                style={{
                  display: "block",
                  width: "14vw",
                  padding: "1%",
                }}
                Tooltip={{ open: true }}
              />
            </ConfigProvider>
          </Space>
        </Space.Compact>
        {/* <div style={{ width: "1rem" }}></div> */}
      </Space>
      {/* OverView and Chart */}
      <div
        style={{ marginTop: "1%", width: "100%", display: "flex", gap: "10px" }}
      >
        <div
          // direction="vertical"
          style={{
            height: "50vh",
            width: "27%",
            backgroundColor: "#f2f0f0",
            padding: "1% 2%",
            borderRadius: "10px",
          }}
        >
          <Typography
            style={{
              fontWeight: "bold",
              display: "block",
              width: "100%",
              fontSize: "2rem",
            }}
          >
            Overview
          </Typography>
          <Typography
            style={{ fontSize: "1.5rem", fontWeight: "400", marginTop: "8%" }}
          >
            O'clock: {thisDay.format("HH:mm:ss")}
          </Typography>
          <Typography
            style={{ fontSize: "1.5rem", fontWeight: "400", marginTop: "3%" }}
          >
            Day: {thisDay.format("DD/MM/YYYY")}
          </Typography>
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: "400",
              marginTop: "3%",
              display: "flex",
              flexDirection: "column",
              gap: "7px",
            }}
          >
            Data Sensor:
            {/* sensor */}
            {sensorData && (
              <div style={{ display: "flex", gap: "10px", marginLeft: "5px" }}>
                <DashboardOutlined style={{ fontSize: "1.5rem" }} />
                <Typography style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  : {sensorData.temperature}&deg;C
                </Typography>
              </div>
            )}
            {sensorData && (
              <div style={{ display: "flex", gap: "10px", marginLeft: "5px" }}>
                <BulbOutlined style={{ fontSize: "1.5rem" }} />
                <Typography style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  : {sensorData.light}%
                </Typography>
              </div>
            )}
            {sensorData && (
              <div style={{ display: "flex", gap: "10px", marginLeft: "5px" }}>
                <CloudOutlined style={{ fontSize: "1.5rem" }} />
                <Typography style={{ fontSize: "1.5rem", fontWeight: "500" }}>
                  : {sensorData.humidity}%
                </Typography>
              </div>
            )}
          </div>
        </div>
        <div
          style={{
            height: "50vh",
            width: "70%",
            // margin: "3%",
            backgroundColor: "#f2f0f0",
            borderRadius: "10px",
            padding: "1%",
          }}
        >
          <Column {...config} style={{ width: "100%", height: "50vh" }} />
        </div>
      </div>
    </div>
  );
};
export default DashBoardContent;
