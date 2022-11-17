import { Spin } from "antd";
const Transiton: React.FC = () => {
  return (
    <div style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <Spin tip="Loading..."></Spin>
    </div>
  );
};
export default Transiton;
