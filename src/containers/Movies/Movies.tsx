import * as React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Space, Table, Button, Typography, Card, Row, Col } from "antd";
import type { ColumnsType, TablePaginationConfig } from "antd/es/table";
import { debounce } from "lodash";

import { DataType } from "../../models/movies";
import TextField from "../../components/TextField";

import { getMovies } from "../../core/redux/slices/movies";
import { useAppSelector, useAppDispatch } from "../../core/redux/hooks";

const { Title } = Typography;

interface TableParams {
  pagination?: TablePaginationConfig;
}

interface PropTypes {}

const Movies: React.FC<PropTypes> = () => {
  const { movies, moviesTotal } = useAppSelector((state) => state.movies);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [searchedField, setSearchedField] = React.useState("");

  const [currentPage, setCurrentPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(5);

  const [tableParams, setTableParams] = React.useState<TableParams>({});

  const columns: ColumnsType<DataType> = React.useMemo(
    () => [
      {
        title: () => <Title level={3}>ID</Title>,
        dataIndex: "id",
        key: "id",
      },
      {
        title: () => <Title level={3}>Title</Title>,
        dataIndex: "title",
        key: "title",
        render: (text, { id }) => <Link to={`/movie/${id}`}>{text}</Link>,
      },
      {
        title: () => <Title level={3}>Year</Title>,
        dataIndex: "year",
        key: "year",
      },
      {
        title: () => <Title level={3}>Format</Title>,
        dataIndex: "format",
        key: "format",
      },
    ],
    []
  );

  const handleAddMovie = () => {
    navigate("/add-movie");
  };

  const handleChange = (e: any) => {
    setSearchedField(e.target.value);
  };

  const debouncedResults = React.useMemo(() => {
    return debounce(handleChange, 300);
  }, []);

  const handleTableChange = (pagination: TablePaginationConfig) => {
    setTableParams({
      pagination,
    });
    if (pagination.pageSize && pagination.current) {
      setPageSize(pagination.pageSize);
      setCurrentPage(pagination.current - 1);
    }
  };

  React.useEffect(() => {
    setTableParams({
      pagination: {
        current: currentPage + 1,
        pageSize: pageSize,
        total: moviesTotal,
      },
    });
  }, [moviesTotal]);

  React.useEffect(() => {
    dispatch(
      getMovies({
        search: searchedField.length > 1 ? searchedField : null,
        sort: "title",
        order: "ASC",
        limit: pageSize,
        offset: currentPage * pageSize,
      })
    );

    return () => {
      debouncedResults.cancel();
    };
  }, [searchedField, currentPage, pageSize, debouncedResults, dispatch]);

  return (
    <div className="wrapper">
      <Row justify="center" align="middle">
        <Col span={18}>
          <Card title={<Title level={1}>Movies</Title>}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: "flex" }}
            >
              <Row justify="space-between" align="bottom">
                <Col>
                  <Button type="primary" onClick={handleAddMovie}>
                    Add movie
                  </Button>
                </Col>
                <Col>
                  <TextField
                    noMargin
                    name="title"
                    label="Movie title"
                    placeholder="Seach movie by name"
                    onChange={debouncedResults}
                  />
                </Col>
              </Row>

              <Table
                columns={columns}
                dataSource={movies}
                pagination={tableParams.pagination}
                onChange={handleTableChange}
              />
            </Space>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Movies;
