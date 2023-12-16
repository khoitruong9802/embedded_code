import { Typography, Space } from "antd";
import {
  MailOutlined,
  PhoneOutlined,
  FacebookOutlined,
  InstagramOutlined,
  HomeOutlined,
} from "@ant-design/icons";
const SupportContent = () => {
  return (
    <div style={{ backgroundColor: "white", padding: "0", margin: "0" }}>
      <Typography
        style={{ textAlign: "center", fontSize: "3rem", fontWeight: "700" }}>
        Smart Home
      </Typography>
      <Typography style={{ fontSize: "1.5rem" }}>
        Chào mừng đến với ứng dụng Smart Home - người trợ lý đắc lực cho cuộc
        sống hiện đại. Với khả năng kết nối mọi thiết bị trong ngôi nhà, từ đèn
        đến hệ thống an ninh, bạn có thể dễ dàng điều khiển tất cả chỉ qua chiếc
        điện thoại. Tận hưởng sự thuận tiện, tiết kiệm năng lượng và an toàn mà
        Smart Home mang lại, biến ngôi nhà của bạn thành một không gian sống
        thông minh và hiện đại.
      </Typography>
      <Space style={{ marginTop: "3%" }}>
        <Space.Compact
          direction='vertical'
          style={{ width: "20vw", margin: "10%", padding: "10%" }}>
          <img
            src={require("../../assets/img/smart-home-logo-free-vector.jpg")}
            style={{ width: "100%", borderRadius: "50%", display: "block" }}
            alt='logo smart home'
          />
        </Space.Compact>
        <Space.Compact
          style={{ marginLeft: "15%", padding: "0", width: "60vw" }}
          direction='vertical'>
          <Typography style={{ display: "block", fontSize: "1.5rem" }}>
            Nếu có bất cứ thắc mắc nào bạn có thể liên hiệu với chúng tôi thông
            qua:
          </Typography>
          <Typography
            style={{ display: "block", fontSize: "1.5rem", marginLeft: "2%" }}>
            <MailOutlined fontSize='large' style={{ marginRight: "1%" }} />
            Email: <a>smarthome@gmail.com</a>
          </Typography>
          <Typography
            style={{ display: "block", fontSize: "1.5rem", marginLeft: "2%" }}>
            <PhoneOutlined fontSize='large' style={{ marginRight: "1%" }} />
            Sdt: 0367459330
          </Typography>
          <Typography
            style={{ display: "block", fontSize: "1.5rem", marginLeft: "2%" }}>
            <HomeOutlined fontSize='large' style={{ marginRight: "1%" }} />
            Địa chỉ: Đông Hoà, Dĩ An, Bình Dương
          </Typography>
          <Typography style={{ display: "block", fontSize: "1.5rem" }}>
            Theo dõi chúng tôi tại:
          </Typography>
          <Typography
            style={{ display: "block", fontSize: "1.5rem", marginLeft: "2%" }}>
            <FacebookOutlined fontSize='large' style={{ marginRight: "1%" }} />
            Facebook: <a href='#'>Smart Home</a>
          </Typography>
          <Typography
            style={{ display: "block", fontSize: "1.5rem", marginLeft: "2%" }}>
            <InstagramOutlined fontSize='large' style={{ marginRight: "1%" }} />
            Instagram: <a href='#'>Smart Home</a>
          </Typography>
        </Space.Compact>
      </Space>
    </div>
  );
};

export default SupportContent;
