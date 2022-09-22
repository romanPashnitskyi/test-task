import * as React from "react";
import { Typography, Card, Row, Col } from "antd";

const { Title } = Typography;

interface PropTypes {}

const NotFound: React.FC<PropTypes> = () => {
  return (
    <div className="wrapper">
      <Row justify="center" align="middle">
        <Col span={18}>
          <Card>
            <Row justify="center" align="middle" gutter={[0, 24]}>
              <Col>
                <Title level={1}>Page Not Found</Title>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default NotFound;
