import * as React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Space, Button, Typography, Card, Row, Col } from "antd";

import { getMovie, removeMovie } from "../../core/redux/slices/movies";
import { useAppSelector, useAppDispatch } from "../../core/redux/hooks";

const { Title } = Typography;

interface PropTypes {}

const Movie: React.FC<PropTypes> = () => {
  const { movie } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const params = useParams();

  const handleDelete = () => {
    if (params.id) dispatch(removeMovie({ id: params.id }));
    navigate("/");
  };

  const actors = React.useMemo(() => {
    return movie?.actors?.map((v) => {
      return v.name;
    });
  }, [movie]);

  React.useEffect(() => {
    if (params.id) dispatch(getMovie({ id: params.id }));
  }, [dispatch, params]);

  return (
    <div className="wrapper">
      <Row justify="center" align="middle">
        <Col span={18}>
          <Card
            title={
              <>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Title level={1} style={{ margin: "0" }}>
                      Movie
                    </Title>{" "}
                  </Col>
                  <Col>
                    <Button type="primary" danger onClick={handleDelete}>
                      Delete
                    </Button>
                  </Col>
                </Row>
              </>
            }
          >
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Row justify="space-between" align="top" gutter={[0, 24]}>
                <Col span={11}>
                  <Title level={2} style={{ margin: "0 0 10px 0" }}>
                    Title:
                  </Title>
                  <Title
                    level={3}
                    style={{ margin: "0 0 10px 0", color: "#4f4f4e" }}
                  >
                    {movie?.title}
                  </Title>
                </Col>
                <Col span={11}>
                  <Title level={2} style={{ margin: "0 0 10px 0" }}>
                    Year:
                  </Title>
                  <Title
                    level={3}
                    style={{ margin: "0 0 10px 0", color: "#4f4f4e" }}
                  >
                    {movie?.year}
                  </Title>
                </Col>
                <Col span={11}>
                  <Title level={2} style={{ margin: "0 0 10px 0" }}>
                    Format:
                  </Title>
                  <Title
                    level={3}
                    style={{ margin: "0 0 10px 0", color: "#4f4f4e" }}
                  >
                    {movie?.format}
                  </Title>
                </Col>
                <Col span={11}>
                  <Title level={2} style={{ margin: "0 0 10px 0" }}>
                    Actors:
                  </Title>
                  <Title
                    level={3}
                    style={{ margin: "0 0 10px 0", color: "#4f4f4e" }}
                  >
                    {actors?.join(", ")}
                  </Title>
                </Col>
              </Row>
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Movie;
