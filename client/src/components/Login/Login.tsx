import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";
import { log } from "console";

interface ILogin {
  password: string;
  email: string;
}

const Register: React.FC = () => {
  const [isLogged, setIsLogged] = useState(false);

  const handleSubmit: (values: ILogin) => void = (values) => {
    axios
      .post("/users/login", values)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          setIsLogged(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const handleChange = (e: string | React.ChangeEvent<any>) => {
    formik.handleChange(e);
  };

  if (isLogged) {
    return <Redirect to="/" />;
  }

  return (
    <div>
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="TaskForm_form"
      >
        <div className="form-group">
          <label>מייל</label>
          <Col sm={6}>
            <input
              onChange={handleChange}
              minLength={5}
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              placeholder="name@address.com"
              autoComplete="false"
              required
            />
          </Col>
        </div>

        <div className="form-group">
          <label>סיסמא</label>
          <Col sm={6}>
            <input
              id="password"
              type="password"
              value={formik.values.password}
              onChange={handleChange}
              name="password"
              minLength={5}
              placeholder="סיסמא"
              autoComplete="true"
              required
            />
          </Col>
        </div>

        <div className="form-group">
          <Col>
            <Button type="submit">שמור</Button>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default Register;
