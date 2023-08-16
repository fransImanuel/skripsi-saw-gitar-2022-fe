import React from 'react';
import { Container,Row,Col,Card,Button,Form, Stack, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';



function ChooseForm() {

    const [formData, setForm] = React.useState({
        BottomPrice:"",
        UpperPrice:"",
        WoodType:"",
        GuitarSize:"",
        GuitarBrand:"",
        WarningMsg:"",
        BrandWeight:"",
        PriceWeight:"",
    })
    let navigate = useNavigate();
    let warningMsg

    function handleChange(event){
        const {name, value} = event.target

        if (name == "UpperPrice") {
            setForm(prevFormData => {
                    if (value == "MAX"){
                        return {
                            ...prevFormData,
                            BottomPrice:"",
                            [name] : "20000000"
                        }    
                    }else{
                        return {
                            ...prevFormData,
                            BottomPrice : parseInt(value) - 5000000,
                            [name] : value
                        }
                    }
            })
        }else{  
            setForm(prevFormData => {
                    return {
                    ...prevFormData,
                    [name] : value
                }
            })
        }

        // console.log(formData);
    }

    async function FetchGuitarByCriteria(){
        
        const res = await fetch(
                `http://localhost:5000/get/guitarbyfilter?WoodWeight=`+formData.WoodType+
                `&GuitarSizeWeight=`+formData.GuitarSize+
                `&BrandWeight=`+formData.PriceWeight+
                `&Price=`+formData.BrandWeight+
                `&BrandId=`+formData.GuitarBrand+
                `&UpperPrice=`+formData.UpperPrice+
                `&BottomPrice=`+formData.BottomPrice,
            {
                method: 'GET', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': '*/*'
                }
            }
        )
        const guitars = await res.json()

        return guitars
    }

    async function handleSubmit(event) {
        event.preventDefault()
        // console.log(event);
        // console.log(formData);

        if (formData.GuitarBrand === "" && formData.GuitarSize=== "" && formData.UpperPrice === "" && formData.WoodType=== "") {
            setForm((prevFormData) => {
                return {
                    ...prevFormData,
                    WarningMsg : (
                        <Alert key="danger" variant="danger">
                            All Choice Must Be filled
                        </Alert>
                    )
                }
            })
            return (warningMsg)
        }

        // submitToApi(formData)
        setForm( prevFormData =>{
            return{
                ...prevFormData
            }
        })

        await FetchGuitarByCriteria().then( guitars => {
            // console.log(guitars);
            navigate('/resultguitar', { state:guitars })
        } )
    }

    return(
        <Container className = 'choose-container' >
          <Row className = "justify-content-center" >
            <Col md={6}>
                <Card className="text-center">
                    <Card.Header as="h5">Let Us Know What You Need</Card.Header>
                    { formData.WarningMsg ? formData.WarningMsg : null }
                    <Card.Body>

                        <form onSubmit = {handleSubmit} method = "GET">
                            <Stack gap={3}>

                                <Form.Label>What Guitar Brand You Want?</Form.Label>
                                <Form.Select 
                                    value={formData.GuitarBrand}
                                    onChange={handleChange}
                                    name = "GuitarBrand"
                                >
                                    <option>Choose Guitar Brand</option>
                                    <option value="1">Fender</option>
                                    <option value="2">Ibanez</option>
                                    <option value="3">Yamaha</option>
                                    <option value="4">Gibson</option>
                                    <option value="5">Tanglewood</option>
                                </Form.Select>
                                
                                <Form.Label>What Price Range You Need?</Form.Label>
                                <Form.Select 
                                    value={formData.UpperPrice}
                                    onChange={handleChange}
                                    name = "UpperPrice"
                                >
                                    <option>Choose Price Range</option>
                                    <option value="5000000">&#8804;5.000.000</option>
                                    <option value="10000000">5.000.000-10.000.000</option>
                                    <option value="15000000">10.000.000-15.000.000</option>
                                    <option value="20000000">15.000.000-20.000.000</option>
                                    <option value="MAX">&ge;20.000.000</option>
                                </Form.Select>
                                
                                <Form.Label>Do You Care About Wood Quality?</Form.Label>
                                <Form.Select 
                                    value={formData.WoodType}
                                    onChange={handleChange}
                                    name = "WoodType"
                                >
                                    <option>Choose Wood Quality</option>
                                    <option value="1">Not Really Important</option>
                                    <option value="2">Not Important</option>
                                    <option value="3">Neutral</option>
                                    <option value="4">Important</option>
                                    <option value="5">Really Important</option>
                                </Form.Select>
                                
                                
                                <Form.Label>Do You Care About Guitar Size</Form.Label>
                                <Form.Select 
                                    value={formData.GuitarSize}
                                    onChange={handleChange}
                                    name = "GuitarSize"
                                >
                                    <option>Choose Guitar Size</option>
                                    <option value="1">Not Really Important</option>
                                    <option value="2">Not Important</option>
                                    <option value="3">Neutral</option>
                                    <option value="4">Important</option>
                                    <option value="5">Really Important</option>
                                </Form.Select>

                                <Form.Label>Do You Care About Brand Popularity?</Form.Label>
                                <Form.Select 
                                    value={formData.BrandWeight}
                                    onChange={handleChange}
                                    name = "BrandWeight"
                                >
                                    <option>Do You Care About Brand Popularity?</option>
                                    <option value="1">Not Really Important</option>
                                    <option value="2">Not Important</option>
                                    <option value="3">Neutral</option>
                                    <option value="4">Important</option>
                                    <option value="5">Really Important</option>
                                </Form.Select>

                                <Form.Label>Do You Care About Guitar Price?</Form.Label>
                                <Form.Select 
                                    value={formData.PriceWeight}
                                    onChange={handleChange}
                                    name = "PriceWeight"
                                >
                                    <option>Do You Care About Guitar Price?</option>
                                    <option value="1">Not Really Important</option>
                                    <option value="2">Not Important</option>
                                    <option value="3">Neutral</option>
                                    <option value="4">Important</option>
                                    <option value="5">Really Important</option>
                                </Form.Select>




                                <Button type='submit' variant="dark" className='mt-3'>Find Your Guitar</Button>
                                
                            </Stack>

                        </form>
                            {/* <Link to="/resultguitar">result</Link> */}

                    </Card.Body>
                    <Card.Footer className="text-muted">“What you choose also chooses you.” ― Kamand Kojouri</Card.Footer>
                </Card>
            </Col>
          </Row>
      </Container>
    )
}

export default ChooseForm;