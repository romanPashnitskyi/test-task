import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import TextField, { TextFieldElement } from "../../components/TextField";
import FormErrors from "../../components/FormErrors/FormErrors";
import Select from "../../components/Select";
import { addMovie } from "../../core/redux/slices/movies";
import { useAppSelector, useAppDispatch } from "../../core/redux/hooks";

import {
  Space,
  Button,
  Typography,
  Card,
  Row,
  Col,
} from "antd";

const { Title } = Typography;

interface PropTypes {}

const AddMovie: React.FC<PropTypes> = () => {
  const [isCalled, setIsCalled] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);

  const dispatch = useAppDispatch();
  const { addStatus } = useAppSelector((state) => state.movies);

  const optionsList = [
    { value: "VHS", label: "VHS", data: "VHS" },
    { value: "DVD", label: "DVD", data: "DVD" },
    { value: "Blu-Ray", label: "Blu-Ray", data: "Blu-Ray" },
  ];

  const {
    isValid,
    touched,
    errors,
    values,
    initialValues,
    setValues,
    resetForm,
    handleSubmit,
    handleChange,
    setFieldValue,
  } = useFormik({
    initialValues: {
      title: "",
      year: undefined,
      format: "VHS",
      actors: [],
    },
    validationSchema: Yup.object().shape({
      title: Yup.string().required().min(2),
      year: Yup.string()
        .required()
        .matches(/^[0-9]+$/, "must be only digits")
        .min(4, "must be exactly 4 digits")
        .max(4, "must be exactly 4 digits"),
      format: Yup.string().required(),
      actors: Yup.array().of(Yup.string()).min(1, "must be 1 actor")
      .required(),
    }),
    onSubmit: (data: any) => {
      setValues(initialValues);
      resetForm({});
      setFieldValue("format", data.format);
      dispatch(addMovie(data))
      setSubmitted(false);
      setIsCalled(true);
    },
  });

  const handleSubmitAttempt = (ev: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(ev);
    setSubmitted(true);
  };

  const handleChangeFormat = React.useCallback(
    (value: string) => {
      setFieldValue("format", value);
    },
    [setFieldValue]
  );

  const handleChangeActors = (ev: React.ChangeEvent<TextFieldElement>) => {
    const actors = ev.target.value;
    const actorsArr = actors.split(", ");
    setFieldValue("actors", actorsArr);
  };

  return (
    <div className="wrapper">
      <Row justify="center" align="middle">
        <Col span={16}>
          <Card title={<Title level={1}>Add movie</Title>}>
            <form onSubmit={handleSubmitAttempt}>
              <Space
                direction="vertical"
                size="middle"
                style={{ display: "flex" }}
              >
                <Row justify="space-between" align="top" gutter={[0, 24]}>
                  <Col span={11}>
                    <TextField
                      noMargin
                      name="title"
                      label="Movie title"
                      value={values.title}
                      placeholder="Movie title"
                      isTouched={touched.title}
                      errorMessage={errors.title}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={11}>
                    <TextField
                      noMargin
                      name="year"
                      label="Movie year"
                      value={values.year}
                      placeholder="Movie year"
                      isTouched={touched.year}
                      errorMessage={errors.year}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={11}>
                    <Select
                      name="format"
                      label="Movie format"
                      options={optionsList}
                      value={String(values.format)}
                      onChange={handleChangeFormat}
                    />
                  </Col>
                  <Col span={11}>
                    <TextField
                      noMargin
                      name="actors"
                      label="Movie actors"
                      placeholder="Movie actors"
                      isTouched={touched.actors}
                      errorMessage={errors.actors}
                      onChange={handleChangeActors}
                    />
                  </Col>
                </Row>

                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={submitted && !isValid}
                  loading={false}
                  size="large"
                >
                  Submit
                </Button>

                <FormErrors
                  successMsg="Success"
                  statusCode={addStatus}
                  isCalled={isCalled}
                  isSubmitting={submitted}
                />
              </Space>
            </form>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default AddMovie;
