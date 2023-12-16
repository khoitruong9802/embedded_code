import { data } from "./dataChart";
import { Column } from "@ant-design/plots";
import { Typography } from "antd";

const Static = () => {
  const configtemp = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      Style: {
        fill: "#FFFFFF",
        opacityL: 0.6,
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
    color: "#7c8fdd",
  };

  const confighumi = {
    data,
    xField: "type",
    yField: "sales",
    label: {
      position: "middle",
      Style: {
        fill: "#FFFFFF",
        opacityL: 0.6,
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
        alias: "%",
      },
      sales: {
        alias: "%",
      },
    },
    color: "#87dd7c",
  };

  return (
    <>
      <Typography
        style={{ textAlign: "center", fontSize: "3rem", fontWeight: "700" }}>
        Temperature
      </Typography>
      <Column
        {...configtemp}
        style={{ width: "100%", display: "block", marginTop: "20px" }}
      />
      <hr
        style={{
          width: "100%",
          margin: "50px 0",
          height: "10px",
          background: "black",
        }}
      />
      <Typography
        style={{ textAlign: "center", fontSize: "3rem", fontWeight: "700" }}>
        Humidity
      </Typography>
      <Column
        {...confighumi}
        style={{
          width: "100%",
          display: "block",
          marginTop: "20px",
          marginBottom: "100px",
        }}
      />
    </>
  );
};

export default Static;
