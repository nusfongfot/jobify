import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useAuth } from "../context/authContext";

function Profile() {
  const { user, updateUser } = useAuth();
  const [isShow, setIsShow] = useState(false)
  const [firstname, setFirstname] = useState(user?.firstname);
  const [email, setEmail] = useState(user?.email);
  const [lastname, setLastname] = useState(user?.lastname);
  const [location, setLocation] = useState(user?.location);

  const handleSubmit = async (e) => {
    e.preventDefault();  
    await updateUser({ firstname, email, lastname, location });
    
  };

  useEffect(() => {
    if(firstname === "" || lastname === "" || email === "" || location === "") {
      setIsShow(true)
    } else {
      setIsShow(false)
    } 
  }, [firstname,lastname,email,location])
  

  return (
    <div>
      <h2>Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group
          className="mb-3 w-100 d-flex align-items-center justify-content-center"
          controlId="formBasicEmail"
        >
          <Form.Label>Firstname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Firstname"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <Form.Label>Lastname</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Lastname"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3 w-100 d-flex" controlId="formBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Form.Label>Location</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" disabled={isShow ? true: false}>
          Submit
        </Button>
      </Form>
    </div>
  );
}
export default Profile;
