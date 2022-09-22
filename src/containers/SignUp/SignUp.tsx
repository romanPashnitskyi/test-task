import * as React from "react";
import * as Yup from "yup";
import { useFormik } from "formik";

import TextField from "../../components/TextField";
import FormErrors from "../../components/FormErrors/FormErrors";
import { signUp } from "../../core/redux/slices/auth";
import { useAppSelector, useAppDispatch } from "../../core/redux/hooks";

import { Space, Button, Typography, Card, Row, Col } from "antd";

const { Title } = Typography;

interface PropTypes {}

const SignUp: React.FC<PropTypes> = () => {
  const [isCalled, setIsCalled] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  const { statusCode } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

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
      email: "",
      name: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string().email().required(),
      name: Yup.string().required(),
      password: Yup.string()
        .required("No password provided.")
        .min(8, "Password is too short - should be 8 chars minimum.")
        .matches(/[a-zA-Z]/, "Password can only contain Latin letters."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("No confirm password provided."),
    }),
    onSubmit: (data: any) => {
      setValues(initialValues);
      resetForm({});
      setFieldValue("format", data.format);
      setSubmitted(false);
      dispatch(signUp(data));
      setIsCalled(true);
    },
  });

  const handleSubmitAttempt = (ev: React.FormEvent<HTMLFormElement>) => {
    handleSubmit(ev);
    setSubmitted(true);
  };
  return (
    <div className="wrapper">
      <Row justify="center" align="middle">
        <Col span={16}>
          <Card title={<Title level={1}>Sign up</Title>}>
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
                      name="email"
                      label="Email"
                      value={values.email}
                      placeholder="Email"
                      isTouched={touched.email}
                      errorMessage={errors.email}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={11}>
                    <TextField
                      noMargin
                      name="name"
                      label="Name"
                      value={values.name}
                      placeholder="Name"
                      isTouched={touched.name}
                      errorMessage={errors.name}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={11}>
                    <TextField
                      noMargin
                      name="password"
                      label="Password"
                      value={values.password}
                      placeholder="Password"
                      isTouched={touched.password}
                      errorMessage={errors.password}
                      onChange={handleChange}
                    />
                  </Col>
                  <Col span={11}>
                    <TextField
                      noMargin
                      name="confirmPassword"
                      label="Confirm Password"
                      value={values.confirmPassword}
                      placeholder="Confirm password"
                      isTouched={touched.confirmPassword}
                      errorMessage={errors.confirmPassword}
                      onChange={handleChange}
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
                  statusCode={statusCode}
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

export default SignUp;
