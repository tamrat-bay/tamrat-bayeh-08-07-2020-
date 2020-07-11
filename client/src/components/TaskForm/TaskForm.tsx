import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Form, Col, Row, Button } from "react-bootstrap";
import { ITask } from "../../models/ITask";
import { IAxiosInfo } from "../../models/IAxiosInfo";
import "./TaskForm.css";

interface ITaskForm {
  closeWindow: React.Dispatch<React.SetStateAction<boolean>>;
  initialValues: ITask["task"];
  axiosInfo: IAxiosInfo;
}

const TaskForm: React.FC<ITaskForm> = ({ closeWindow, initialValues, axiosInfo }) => {
  
  const handleSubmit: (values: ITask["task"]) => void = (
    values: ITask["task"]
  ) => {
    const { method, url, methodFunction } = axiosInfo;
    console.log("handle sub", method);

    switch (method) {
      case "post":
        axios
          .post(`${url}`, values)
          .then((res) => {
            if (res.status === 201) {
              methodFunction(res.data);
            }
          })
          .catch((err) => console.log(err));
        break;

      case "put":
        axios
          .put(`${url}/${initialValues._id}`, values)
          .then((res) => {
            if (res.status === 200) {
              console.log(res.data, "Success (EDIT)");
              methodFunction(res.data);
            }
          })
          .catch((error) => {
            console.log(error);
          });
        break;

      default:
        break;
    }
  };


  const formik = useFormik({
    initialValues,
    onSubmit: (values) => {
      console.log("val", values);
      handleSubmit(values);
    },
  });

  const handleChange = (e: string | React.ChangeEvent<any>) => {
    formik.handleChange(e);
  };

  return (
    <div className="TaskForm">
      <h3>{axiosInfo.method === 'post' ? "משימה חדשה" : "עריכה"}</h3>
      <Form onSubmit={formik.handleSubmit} className="TaskForm_form">
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            שם
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={handleChange}
              id="name"
              minLength={2}
              name="name"
              type="text"
              value={formik.values.name}
              placeholder="שם"
              autoComplete="false"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            מייל
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              onChange={handleChange}
              minLength={5}
              id="email"
              name="email"
              type="email"
              value={formik.values.email}
              placeholder="מייל"
              autoComplete="false"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            טלפון
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              id="phone"
              type="tel"
              pattern="[0-9]{10}"
              onChange={handleChange}
              minLength={10}
              name="phone"
              value={formik.values.phone}
              placeholder="phone"
              autoComplete="false"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            תאריך
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              id="date"
              type="date"
              value={formik.values.date}
              onChange={handleChange}
              name="date"
              placeholder="Date"
              autoComplete="true"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row}>
          <Form.Label column sm={2}>
            משימה
          </Form.Label>
          <Col sm={6}>
            <Form.Control
              id="description"
              as="textarea"
              rows={3}
              value={formik.values.description}
              onChange={handleChange}
              name="description"
              placeholder="תיאור המשימה"
              autoComplete="true"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12 }}>
            <Button type="submit">שמור</Button>
            <Button onClick={() => closeWindow(false)}>יציאה</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default TaskForm;
