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

const TaskForm: React.FC<ITaskForm> = ({
  closeWindow,
  initialValues,
  axiosInfo,
}) => {
  const handleSubmit: (values: ITask["task"]) => void = (
    values: ITask["task"]
  ) => {
    const { method, url, methodFunction } = axiosInfo;
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
      handleSubmit(values);
    },
  });

  const handleChange = (e: string | React.ChangeEvent<any>) => {
    formik.handleChange(e);
  };

  return (
    <div className="TaskForm">
      <h3>{axiosInfo.method === "post" ? "משימה חדשה" : "עריכה"}</h3>
      <Form onSubmit={() => formik.handleSubmit()} className="TaskForm_form">
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
          <label>תאריך</label>
          <Col sm={6}>
            <input
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
        </div>
        <div className="form-group">
          <label>משימה</label>
          <Col sm={6}>
            <textarea
              id="description"
              rows={3}
              value={formik.values.description}
              onChange={handleChange}
              name="description"
              placeholder="תיאור המשימה"
              autoComplete="true"
              required
            />
          </Col>
        </div>

        <div className="form-group">
          <Col>
            <Button type="submit">שמור</Button>
            <Button onClick={() => closeWindow(false)}>יציאה</Button>
          </Col>
        </div>
      </Form>
    </div>
  );
};

export default TaskForm;
