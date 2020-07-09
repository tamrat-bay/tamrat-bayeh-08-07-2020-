import React, {useState} from "react";
import axios from "axios";
import { useFormik } from 'formik';
import { Form, Col,Row ,Button } from 'react-bootstrap';
import { ITask } from '../../model/ITask'
import "./NewTask.css";

interface INewTask {
  setNewTaskFlag: React.Dispatch<React.SetStateAction<boolean>>;
}

const NewTask: React.FC<INewTask> = ({ setNewTaskFlag }) => {

  const [validationFlag, setValidationFlag] = useState(false);


  const handleSubmit = (values: ITask["task"]) => {
      axios.post('/tasks', values)
        .then((res) => {
          if (res.status === 201) {
            console.log(res.data,'Success');
        }
        })
        .catch((error) => {
          console.log(error);
        });
    };
 
  
  const formik = useFormik({
    initialValues: {
      date: "",
      email: "",
      name: "",
      phone: "",
      description: ""
    },
    onSubmit: (values) => {
        console.log('val', values);
        
      handleSubmit(values);
    },
  });

  const handleChange = (e: string | React.ChangeEvent<any>) => {
    if (validationFlag) {
      setValidationFlag(false);
    }
    formik.handleChange(e);
  };

  return (
    <div className="NewTask">
      <h1>New Task</h1>
      <button onClick={() => setNewTaskFlag(false)}>Close</button>

      <Form onSubmit={formik.handleSubmit} className="Signup_form">

        {validationFlag ? (
          <p className="validation-warning" onClick={() => setValidationFlag(false)}>
            Please try again. <br />
            Make sure both password are the same
          </p>
        ) : (
          ""
        )}

        <Form.Group as={Row} controlId="formHorizontalUserName">
          <Form.Label column sm={2}>
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              onChange={handleChange}
              minLength={2}
              name="name"
              type="text"
              placeholder="שם"
              autoComplete="false"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              onChange={handleChange}
              minLength={5}
              name="email"
              type="email"
              placeholder="מייל"
              autoComplete="false"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row} controlId="formHorizontalPhone">
          <Form.Label column sm={2}>
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              type="text"
              onChange={handleChange}
              minLength={7}
              name="phone"
              placeholder="phone"
              autoComplete="false"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalConfirmDate">
          <Form.Label column sm={2}>
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              type="date"
              onChange={handleChange}
              name="date"
              placeholder="Date"
              autoComplete="true"
              required
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formHorizontalConfirmDescription">
          <Form.Label column sm={2}>
          </Form.Label>
          <Col sm={12}>
            <Form.Control
              type="textarea"
              onChange={handleChange}
              name="description"
              placeholder="תיאור"
              autoComplete="true"
              required
            />
          </Col>
        </Form.Group>

        <Form.Group as={Row}>
          <Col sm={{ span: 12 }}>
            <Button type="submit">שמור</Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
};

export default NewTask;
