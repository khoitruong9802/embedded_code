import React from "react";
import MyDashboard from "../MyDashboard/MyDashboard";

const DefaultComponent = ({ children }) => {
  return (
    <div style={{ display: "flex" }}>
      <div style={{ width: "20%" }}>
        <MyDashboard />
      </div>
      <div style={{ flex: "1" }}>{children}</div>
    </div>
  );
};

export default DefaultComponent;
