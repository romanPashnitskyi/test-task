import * as React from "react";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import {
  Button,
  message,
  Upload,
  Typography,
  Space,
  Card,
  Row,
  Col,
} from "antd";

const { Title } = Typography;

interface PropTypes {}

const ImportMovies: React.FC<PropTypes> = () => {
  const user = localStorage.getItem("user");
  let token;
  if (!!user) {
    token = JSON.parse(user).token;
  }

  const props: UploadProps = {
    name: "movies",
    action: `${process.env.REACT_APP_API_URL}/import`,
    headers: {
      Authorization: token,
    },
    onChange(info) {
      if (info.file.status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === "done") {
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="wrapper">
      <Row justify="center" align="middle">
        <Col span={18}>
          <Card title={<Title level={1}>Import Movies</Title>}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Row justify="space-between" align="middle" gutter={[0, 24]}>
                <Col span={11}>
                  <Upload {...props}>
                    <Button icon={<UploadOutlined />}>Click to Import</Button>
                  </Upload>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default ImportMovies;
