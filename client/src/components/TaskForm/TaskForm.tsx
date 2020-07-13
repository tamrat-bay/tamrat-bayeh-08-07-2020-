import React from "react";
import axios from "axios";
import { useFormik } from "formik";
import { Form, Col, Button } from "react-bootstrap";
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
  const handleSubmit: (values: ITask["task"]) => void = (values) => {
    const { method, url, token, methodFunction } = axiosInfo;
    const userInfo = JSON.parse(localStorage.userInfo);
    values.email = userInfo.email;
    values.name = userInfo.name;
    values.phone = userInfo.phone;
    switch (method) {
      case "post":
        axios({
          method: "post",
          url: url,
          data: values,
          headers: { Authorization: token },
        })
          .then((res) => {
            if (res.status === 201) {
              methodFunction(res.data);
            }
          })
          .catch((err) => console.log("catcherr", err));
        break;

      case "put":
        axios({
          method: "put",
          url: url,
          data: values,
          headers: { Authorization: token },
        })
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
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="TaskForm_form"
      >
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
