import { useState } from "react";
import { useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useJob } from "../context/jobContext";

const defaultUserData = {
  position: "",
  company: "",
  status: "pending",
  jobType: "full-time",
  jobLocation: "",
};
function Addjob() {
  const { createJob } = useJob();
  const [values, setValues] = useState(defaultUserData);
  const [isShow, setIsShow] = useState(false);

  const handleChangeValues = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createJob(values);
    setValues(defaultUserData)
  };

  useEffect(() => {
    if (
      values.company === "" ||
      values.jobLocation === "" ||
      values.position === ""
    ) {
      setIsShow(true);
    } else {
      setIsShow(false);
    }
  }, [values.company, values.jobLocation, values.position]);

  return (
    <div>
      <h2>Add Job</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3 w-100 d-flex flex-column "
          controlId="formBasicEmail"
        >
          <Form.Label>Position</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Position"
            name="position"
            value={values.position}
            onChange={handleChangeValues}
          />
          <Form.Label>Company</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Company"
            name="company"
            value={values.company}
            onChange={handleChangeValues}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-100 d-flex" controlId="formBasicEmail">
          <Form.Label>jobLocation</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter jobLocation"
            name="jobLocation"
            value={values.jobLocation}
            onChange={handleChangeValues}
          />
          <Form.Label>Status</Form.Label>
          <Form.Select
            onChange={handleChangeValues}
            name="status"
            value={values.status}
          >
            <option value="pending">pending</option>
            <option value="interview">interview</option>
            <option value="declined">declined</option>
          </Form.Select>
          <Form.Label>jobType</Form.Label>
          <Form.Select
            onChange={handleChangeValues}
            name="jobType"
            value={values.jobType}
          >
            <option value="full-time">full-time</option>
            <option value="part-time">part-time</option>
            <option value="remote">remote</option>
            <option value="internship">internship</option>
          </Form.Select>
        </Form.Group>

        <Button
          variant="primary"
          type="submit"
          disabled={isShow ? true : false}
        >
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Addjob;
