import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { Form, Col, Button } from "react-bootstrap";
import { Redirect } from "react-router-dom";

interface IRegister {
  password: string;
  name: string;
  phone: string;
  email: string;
}

const Register: React.FC = () => {
  const [isRegistered, setIsRegistered] = useState(false);

  const handleSubmit: (values: IRegister) => void = (values) => {
    axios
      .post("/users/register", values)
      .then((res) => {
        if (res.status === 201) {
          setIsRegistered(true);
        }
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
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
  if (isRegistered) return <Redirect to="/login" />;
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
          <label>שם</label>
          <Col sm={6}>
            <input
              onChange={handleChange}
              id="name"
              minLength={2}
              name="name"
              type="text"
              value={formik.values.name}
              placeholder="שם משתמש"
              autoComplete="false"
              required
            />
          </Col>
        </div>

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
          <label>טלפון</label>
          <Col sm={6}>
            <input
              id="phone"
              type="tel"
              pattern="[0-9]{10}"
              onChange={handleChange}
              minLength={10}
              name="phone"
              value={formik.values.phone}
              placeholder="0500000000"
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
