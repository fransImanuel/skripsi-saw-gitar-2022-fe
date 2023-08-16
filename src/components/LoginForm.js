import React from 'react';
import { Container,Row,Col,Card,Button,Form, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';



function LoginForm() {

    const [formData, setForm] = React.useState({
        Username:"",
        Password:"",
    })
    let navigate = useNavigate();

    function handleChange(event){
        const {name, value} = event.target

        if (name == "UpperPrice") {
            setForm(prevFormData => {
            return {
                ...prevFormData,
                [name] : value,
            }
        })
        }

        setForm(prevFormData => {
            return {
                ...prevFormData,
                [name] : value
            }
        })
    }

    async function FetchLoginData(){
        axios.post('http://localhost:5000/login', {
            Username: formData.Username,
            Password: formData.Password
        })
        .then((res) => {
            console.log(res);
            if (res.status == 200) {
                sessionStorage.setItem("adminlogin", "true");
                navigate('/adminpage')
            }else{
                setForm((prevFormData) => {
                    return {
                        ...prevFormData,
                        WarningMsg : (
                            <Alert key="danger" variant="danger">
                                Login Failed, username/password did not registered
                            </Alert>
                        )
                    }
                })
            }
        })
        .catch((err) => {
            setForm((prevFormData) => {
                    return {
                        ...prevFormData,
                        WarningMsg : (
                            <Alert key="danger" variant="danger">
                                Login Failed, username/password did not registered
                            </Alert>
                        )
                    }
                })
        })
    }

    async function handleSubmit(event) {
        event.preventDefault()
        console.log(event);
        console.log(formData);

        if (formData.Username == "" && formData.Password== "") {
            setForm((prevFormData) => {
                return {
                    ...prevFormData,
                    WarningMsg : (
                        <Alert key="danger" variant="danger">
                            You Need To Input Correct Username and Password
                        </Alert>
                    )
                }
            })
        }

        // check login admin data
        setForm( prevFormData =>{
            return{
                ...prevFormData
            }
        })

        await FetchLoginData()
    }

    return(
        <Container className = 'choose-container' >
          <Row className = "justify-content-center" >
            <Col md={6}>
                <Card className="text-center">
                    <Card.Header as="h5">Login Admin</Card.Header>
                    { formData.WarningMsg ? formData.WarningMsg : null }
                    <Card.Body>
                        <Form onSubmit = {handleSubmit}>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Username</Form.Label>
                                <Form.Control placeholder="Enter username" onChange={handleChange} name="Username"/>
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" placeholder="Password" onChange={handleChange} name="Password"/>
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Login
                            </Button>
                        </Form>

                    </Card.Body>
                </Card>
            </Col>
          </Row>
      </Container>
    )
}

export default LoginForm;