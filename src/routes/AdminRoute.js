import React, {useState,useEffect} from 'react';
import Navbar from '../components/Navbar';
import axios from 'axios';

import { Container, Table, Button, Spinner, Modal, Row, Col, Card, Form, Alert} from 'react-bootstrap';

import "bootstrap-icons/font/bootstrap-icons.css";

export default function AdminRoute() {
  const [addModalShow, setaddModalShow] = useState(false);
  const [detailsModalShow, setdetailsModalShow] = useState({show: false, activeData:{}});
  const [editModalShow, setEditModalShow] = useState({show: false, activeData:{}});
  const [deleteModalShow, setDeleteModalShow] = useState({show: false, activeData:{}});
  const [guitars, setGuitars] = useState();
  let modalContent
  useEffect(() => {
    axios.get('https://skripsi-saw-gitar-2022-be.herokuapp.com/get/gitarforadmin')
    .then((res) => {
        // console.log(res.data);
        setGuitars(res.data.data)
    })
    .catch((err) => {
        console.log(err);
    })
  }, []);
  
  function handleShowAdd(){
    setaddModalShow(true)
  }
  function handleHideAdd(){
    setaddModalShow(false)
  }
  
  function handleShowDelete(data){
    setDeleteModalShow({ show: true, activeData:data })
  }

  function handleHideDelete(){
    setDeleteModalShow({ show: false, activeData:{} })
  }

  function handleShowEditData(data){
    setEditModalShow({ show: true, activeData:data })
  }

  function handleHideEditData(){
    setEditModalShow({ show: false, activeData:{} })
  }

  function handleShowDetails(data){
    setdetailsModalShow({ show: true, activeData:data })
    // console.log(detailsModalShow);
  }
  function handleHideDetails(){
    setdetailsModalShow({ show: false, activeData:{} })
  }

  if(!guitars){
    modalContent = (
      <tr>
        <td colSpan="4">
          <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
          </Spinner>  
        </td>
      </tr>
    )
  }else{
    modalContent = guitars.map( 
      (guitar)=>{ 
        return (
          <tr key={guitar.Guitar_ID}>
            <td>{guitar.Guitar_ID}</td>
            <td>{guitar.Guitar_Name}</td>
            <td>
              <i className="bi bi-info-circle" onClick = {() => handleShowDetails(guitar)}  role="button"></i>
            </td>
            <td>
              <i className="bi bi-pencil-square"  onClick = {() => handleShowEditData(guitar)} role="button"></i> |   
              <i className="bi bi-trash3-fill" onClick={() => handleShowDelete(guitar)} role="button"></i>
            </td>
          </tr>
      )
    })
  }

  return (
    <div>
      <Navbar/>
      <Container  className = 'admin-container'>
        <Button variant="success" className='mb-4'  onClick={handleShowAdd}><i className="bi bi-plus-square-fill"></i> Add New Guitar</Button>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {modalContent}
          </tbody>
        </Table>
      </Container>

      <DetailsModal
        show={detailsModalShow.show}
        onHide={() => handleHideDetails()}
        dataguitar = {detailsModalShow.activeData}
      />
      
      <EditModal
        show={editModalShow.show}
        onHide={() => handleHideEditData()}
        dataguitar = {editModalShow.activeData}
      />
      
      <DeleteModal
        show={deleteModalShow.show}
        onHide={() => handleHideDelete()}
        dataguitar = {deleteModalShow.activeData}
      />
      
      <AddModal
        show={addModalShow}
        onHide={handleHideAdd}
      />
    </div>
  );
}


function DetailsModal(props) {
  const d = props.dataguitar
  // console.log(d);
  let modalTitle
  let modalContent
  if (!d) {
    modalTitle = (
      <h1>Fetching Data, Pls Wait</h1>
    )
    modalContent = (
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>  
    )
  }else{
    modalTitle = d.Guitar_Name
    modalContent = (
      <Row>
        <Col xs={12} sm={12} md={8} lg={6}>
          <div className="guitar-modal-container">
            <img src={d.Image} alt="guitar_Img"/>
          </div>
        </Col>
        <Col xs = {12} sm = {12} md = {8} lg = {6} >
          <small className='text-danger' style={{fontSize:10 + 'px'}}> *Some of guitar Price is relatively changed and converted from other currencies to IDR</small>
          <br/>
          <b>Price:</b> {formatRupiah( String(  parseInt( d.Price)), 'Rp. ')}
          <Card.Text>
            <div className="d-flex bd-highlight example-parent">
              <div className="p-2 flex-fill bd-highlight col-example"><strong>Brand</strong> <br/> {d.Brand_Name} </div>
              <div className="p-2 flex-fill bd-highlight col-example"><strong>Guitar Size</strong> <br/> {d.GuitarSize} </div>
            </div> <br/>
            <div className="d-flex bd-highlight example-parent">
              <div className="p-2 flex-fill bd-highlight col-example"><strong>Back</strong> <br/> {d.Back_Name} </div>
              <div className="p-2 flex-fill bd-highlight col-example"><strong>Side</strong> <br/> {d.Side_Name} </div>
              <div className="p-2 flex-fill bd-highlight col-example"><strong>Neck</strong> <br/> {d.Neck_Name}</div>
            </div> <br/>
            {d.Description} 
            <br/>
            <p>Buy Here : <a href={d.WhereToBuy}>Buy Here!!</a> </p>
          </Card.Text>
          
        </Col>
      </Row>
    )    
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {modalTitle}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            {modalContent}
          </Container>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    // <div>ea</div>
  )
}

function EditModal(props) {
  const d = props.dataguitar
  // console.log(d);
  let [formData, setForm] = React.useState({
    Guitar_ID:"",
    Guitar_Name:"",
    Price:"",
    Brand_ID:"",
    GuitarSize:"",
    Back:"",
    Side:"",
    Neck:"",
    Image:"",
    Desc:"",
    WhereToBuy:"",
  })
  let [WarningMsg, setWarningMsg] = React.useState()
  let modalContent

  function handleChange(event){
      const {name, value} = event.target
      setForm(prevFormData => {
          return {
              ...prevFormData,
              [name] : value
          }
      })
      // console.log(formData);
  }
  
  function handleSubmit(event){
    event.preventDefault()
    let body = {
        "Brand_ID" : parseInt(event.target[3].value),
        "Back_ID" : parseInt(event.target[5].value),
        "Side_ID" : parseInt(event.target[6].value),
        "Neck_ID" : parseInt(event.target[7].value),
        "Size_ID" : parseInt(event.target[4].value),
        "Guitar_Name" : event.target[1].value,
        "Price" : parseFloat(event.target[2].value),
        "Description" : event.target[10].value,
        "Image" : event.target[8].value,
        "WhereToBuy" : event.target[9].value
    }
    console.log("isi body");
    console.log(body);
    axios.put(`https://skripsi-saw-gitar-2022-be.herokuapp.com/updateguitar/`+event.target[0].value,body)
    .then((res) => {
      console.log(res);
      if (res.status !== 200) {
        setWarningMsg(
          <Alert key="danger" variant="danger">
              Update Failed, Pls Contact Super User For More Information
          </Alert>
        )
      }else{
        setWarningMsg(
          <Alert key="success" variant="success">
              Update Success, Page will reload automatically
          </Alert>
        )
        window.location.reload()
      }
    })
    .catch((err) => {
        console.log(err);
        setWarningMsg(
          <Alert key="danger" variant="danger">
              Add Data Failed, Pls Contact Super User For More Information
          </Alert>
        )
    })

  }

  if (!d) {
    modalContent = (
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>  
    )
  }else{
    modalContent = (
      <Row>
        <Form onSubmit = {handleSubmit}>
          { WarningMsg ? WarningMsg : null }
          <Form.Control
            type="hidden"
            id="GuitarId"
            className='mb-3'
            name='Guitar_ID'
            value={ !formData.Guitar_ID ? d.Guitar_ID : formData.Guitar_ID}
          />
          
          <Form.Label htmlFor="inputName">Guitar Name</Form.Label>
          <Form.Control
            type="text"
            id="inputName"
            className='mb-3'
            name='Guitar_Name'
            value= { !formData.Guitar_Name ? d.Guitar_Name : formData.Guitar_Name}
            onChange={handleChange}
            
          />
          
          <Form.Label htmlFor="inputPrice">Price</Form.Label>
          <Form.Control
            type="text"
            id="inputPrice"
            className='mb-3'
            name='Price'
            value= { !formData.Price ? d.Price : formData.Price}
            onChange={handleChange}
          />
          
          <Form.Label htmlFor="inputBrand">Brand</Form.Label>
          <Form.Select className='mb-3' value={ !formData.Brand_ID ? d.Brand_ID : formData.Brand_ID} name="Brand_ID" id='inputBrand' onChange={handleChange}>
            <option>Choose Brand</option>
            <option value="1" >Fender</option>
            <option value="2" >Ibanez</option>
            <option value="3" >Yamaha</option>
            <option value="4" >Gibson</option>
            <option value="5" >Tanglewood</option>
          </Form.Select>
          
          <Form.Label htmlFor="inputSize">Guitar Size</Form.Label>
          <Form.Select className='mb-3' name="GuitarSize" id='inputSize' onChange={handleChange} 
          value={ !formData.GuitarSize ? d.GuitarSize : formData.GuitarSize}>
            <option>Choose Guitar Size</option>
            <option value="1" >1</option>
            <option value="2">3/4</option>
            <option value="3">1/2</option>
          </Form.Select>

          <Form.Label htmlFor="inputBack">Back Wood</Form.Label>
          <Form.Select className='mb-3' value={ !formData.Back ? d.Back : formData.Back}  id="inputBack" name="Back" onChange={handleChange}>
              <option>Choose Back Wood Type</option>
              <option value="1" >Okume</option>
              <option value="2" >Mahogani</option>
              <option value="3" >Aghatis</option>
              <option value="4" >Rosewood</option>
              <option value="5" >Lacewood</option>
              <option value="6" >Nato</option>
              <option value="7" >Pau Fero</option>
              <option value="8" >Eboncore</option>
              <option value="9" >Tonewood</option>
              <option value="10">Meranti</option>
              <option value="11">Basswood</option>
              <option value="12">Walnut</option>
              <option value="13">Koa</option>
              <option value="14">Utile</option>
              <option value="15">Spruce</option>
              <option value="16">Sapele</option>
              <option value="17">Nyatoh</option>
              <option value="18">Techwood</option>
              <option value="19">Maple</option>
          </Form.Select>
          
          <Form.Label htmlFor="inputSide">Side Wood</Form.Label>
          <Form.Select className='mb-3'  value={ !formData.Side ? d.Side : formData.Side} id="inputSide" name="Side" onChange={handleChange}>
              <option>Choose Side Wood Type</option>
              <option value="1" >Okume</option>
              <option value="2" >Mahogani</option>
              <option value="3" >Aghatis</option>
              <option value="4" >Rosewood</option>
              <option value="5" >Lacewood</option>
              <option value="6" >Nato</option>
              <option value="7" >Pau Fero</option>
              <option value="8" >Eboncore</option>
              <option value="9" >Tonewood</option>
              <option value="10" >Meranti</option>
              <option value="11" >Basswood</option>
              <option value="12" >Walnut</option>
              <option value="13" >Koa</option>
              <option value="14" >Utile</option>
              <option value="15" >Spruce</option>
              <option value="16" >Sapele</option>
              <option value="17" >Nyatoh</option>
              <option value="18" >Techwood</option>
              <option value="19" >Maple</option>
          </Form.Select>
          
          <Form.Label htmlFor="inputNeck">Neck Wood</Form.Label>
          <Form.Select className='mb-3' id="inputNeck" value={ !formData.Neck ? d.Neck : formData.Neck} name="Neck" onChange={handleChange}>
              <option>Choose Neck Wood Type</option>
              <option value="1" >Okume</option>
              <option value="2" >Mahogani</option>
              <option value="3" >Aghatis</option>
              <option value="4" >Rosewood</option>
              <option value="5" >Lacewood</option>
              <option value="6" >Nato</option>
              <option value="7" >Pau Fero</option>
              <option value="8" >Eboncore</option>
              <option value="9" >Tonewood</option>
              <option value="10" >Meranti</option>
              <option value="11" >Basswood</option>
              <option value="12" >Walnut</option>
              <option value="13" >Koa</option>
              <option value="14" >Utile</option>
              <option value="15" >Spruce</option>
              <option value="16" >Sapele</option>
              <option value="17" >Nyatoh</option>
              <option value="18" >Techwood</option>
              <option value="19" >Maple</option>
          </Form.Select>
          
          {/* <Form.Label htmlFor="inputdesc">Guitar Description</Form.Label>
          <Form.Control
            type="text"
            id="inputdesc"
            className='mb-3'
          /> */}

          <Form.Label htmlFor="inputimage">Image URL</Form.Label>
          <Form.Control
            type="text"
            id="inputimage"
            className='mb-3'
            value={ !formData.Image ? d.Image : formData.Image}
            name="Image"
            onChange={handleChange}
          />

          <Form.Label htmlFor="inputWheretobuy">Where To Buy URL</Form.Label>
          <Form.Control
            type="text"
            id="inputWheretobuy"
            className='mb-3'
            value={ !formData.WhereToBuy ? d.WhereToBuy : formData.WhereToBuy}
            name="WhereToBuy"
            onChange={handleChange}
          />

          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Guitar Description</Form.Label>
            <Form.Control as="textarea" rows={3} value={ !formData.Desc ? d.Description : formData.Desc} name="Desc" onChange={handleChange}/>
          </Form.Group>

          
            <Button type='submit' variant="dark" className='mt-3'>Update Data</Button>
        </Form>
      </Row>
    )    
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Edit Data
        </Modal.Title>
      </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            {modalContent}
          </Container>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    // <div>ea</div>
  )
}

function AddModal(props) {
  // console.log(d);
  let [formData, setForm] = React.useState({
    Guitar_Name:"",
    Price:"",
    Brand_ID:"",
    GuitarSize:"",
    Back:"",
    Side:"",
    Neck:"",
    Image:"",
    Desc:"",
    WhereToBuy:"",
  })
  let [WarningMsg, setWarningMsg] = React.useState()
  let modalContent

  function handleChange(event){
      const {name, value} = event.target
      setForm(prevFormData => {
          return {
              ...prevFormData,
              [name] : value
          }
      })
      console.log(formData);
  }
  
  function handleSubmit(event){
    event.preventDefault()
    let body = {
        "Brand_ID" : parseInt(formData.Brand_ID),
        "Back_ID" : parseInt(formData.Back),
        "Side_ID" : parseInt(formData.Side),
        "Neck_ID" : parseInt(formData.Neck),
        "Size_ID" : parseInt(formData.GuitarSize),
        "Guitar_Name" : formData.Guitar_Name,
        "Price" : parseFloat(formData.Price),
        "Description" : formData.Desc,
        "Image" : formData.Image,
        "WhereToBuy" : formData.WhereToBuy
    }
    console.log("isi body");
    console.log(body);
    axios.post(`https://skripsi-saw-gitar-2022-be.herokuapp.com/addguitar`,body)
    .then((res) => {
      console.log(res);
      if (res.status !== 200) {
        setWarningMsg(
          <Alert key="danger" variant="danger">
              Add Data Failed, Pls Contact Super User For More Information
          </Alert>
        )
      }else{
        setWarningMsg(
          <Alert key="success" variant="success">
              Add Data Success, Page will reload automatically
          </Alert>
        )
        setTimeout(() => {
          window.location.reload()
        },3000)
      }
    })
    .catch((err) => {
        setWarningMsg(
          <Alert key="danger" variant="danger">
              Add Data Failed, Pls Contact Super User For More Information
          </Alert>
        )
    })

  }


  modalContent = (
    <Row>
      <Form onSubmit = {handleSubmit}>
        { WarningMsg ? WarningMsg : null }
                  
        <Form.Label htmlFor="inputName">Guitar Name</Form.Label>
        <Form.Control
          type="text"
          id="inputName"
          className='mb-3'
          name='Guitar_Name'
          value= {formData.Guitar_Name}
          onChange={handleChange}
          
        />
        
        <Form.Label htmlFor="inputPrice">Price</Form.Label>
        <Form.Control
          type="text"
          id="inputPrice"
          className='mb-3'
          name='Price'
          value= {formData.Price}
          onChange={handleChange}
        />
        
        <Form.Label htmlFor="inputBrand">Brand</Form.Label>
        <Form.Select className='mb-3' value={formData.Brand_ID} name="Brand_ID" id='inputBrand' onChange={handleChange}>
          <option>Choose Brand</option>
          <option value="1" >Fender</option>
          <option value="2" >Ibanez</option>
          <option value="3" >Yamaha</option>
          <option value="4" >Gibson</option>
          <option value="5" >Tanglewood</option>
        </Form.Select>
        
        <Form.Label htmlFor="inputSize">Guitar Size</Form.Label>
        <Form.Select className='mb-3' name="GuitarSize" id='inputSize' onChange={handleChange} 
        value={formData.GuitarSize}>
          <option>Choose Guitar Size</option>
          <option value="1" >1</option>
          <option value="2">3/4</option>
          <option value="3">1/2</option>
        </Form.Select>

        <Form.Label htmlFor="inputBack">Back Wood</Form.Label>
        <Form.Select className='mb-3' value={formData.Back}  id="inputBack" name="Back" onChange={handleChange}>
            <option>Choose Back Wood Type</option>
            <option value="1" >Okume</option>
            <option value="2" >Mahogani</option>
            <option value="3" >Aghatis</option>
            <option value="4" >Rosewood</option>
            <option value="5" >Lacewood</option>
            <option value="6" >Nato</option>
            <option value="7" >Pau Fero</option>
            <option value="8" >Eboncore</option>
            <option value="9" >Tonewood</option>
            <option value="10">Meranti</option>
            <option value="11">Basswood</option>
            <option value="12">Walnut</option>
            <option value="13">Koa</option>
            <option value="14">Utile</option>
            <option value="15">Spruce</option>
            <option value="16">Sapele</option>
            <option value="17">Nyatoh</option>
            <option value="18">Techwood</option>
            <option value="19">Maple</option>
        </Form.Select>
        
        <Form.Label htmlFor="inputSide">Side Wood</Form.Label>
        <Form.Select className='mb-3'  value={formData.Side} id="inputSide" name="Side" onChange={handleChange}>
            <option>Choose Side Wood Type</option>
            <option value="1" >Okume</option>
            <option value="2" >Mahogani</option>
            <option value="3" >Aghatis</option>
            <option value="4" >Rosewood</option>
            <option value="5" >Lacewood</option>
            <option value="6" >Nato</option>
            <option value="7" >Pau Fero</option>
            <option value="8" >Eboncore</option>
            <option value="9" >Tonewood</option>
            <option value="10" >Meranti</option>
            <option value="11" >Basswood</option>
            <option value="12" >Walnut</option>
            <option value="13" >Koa</option>
            <option value="14" >Utile</option>
            <option value="15" >Spruce</option>
            <option value="16" >Sapele</option>
            <option value="17" >Nyatoh</option>
            <option value="18" >Techwood</option>
            <option value="19" >Maple</option>
        </Form.Select>
        
        <Form.Label htmlFor="inputNeck">Neck Wood</Form.Label>
        <Form.Select className='mb-3' id="inputNeck" value={formData.Neck} name="Neck" onChange={handleChange}>
            <option>Choose Neck Wood Type</option>
            <option value="1" >Okume</option>
            <option value="2" >Mahogani</option>
            <option value="3" >Aghatis</option>
            <option value="4" >Rosewood</option>
            <option value="5" >Lacewood</option>
            <option value="6" >Nato</option>
            <option value="7" >Pau Fero</option>
            <option value="8" >Eboncore</option>
            <option value="9" >Tonewood</option>
            <option value="10" >Meranti</option>
            <option value="11" >Basswood</option>
            <option value="12" >Walnut</option>
            <option value="13" >Koa</option>
            <option value="14" >Utile</option>
            <option value="15" >Spruce</option>
            <option value="16" >Sapele</option>
            <option value="17" >Nyatoh</option>
            <option value="18" >Techwood</option>
            <option value="19" >Maple</option>
        </Form.Select>

        <Form.Label htmlFor="inputimage">Image URL</Form.Label>
        <Form.Control
          type="text"
          id="inputimage"
          className='mb-3'
          value={formData.Image}
          name="Image"
          onChange={handleChange}
        />

        <Form.Label htmlFor="inputWheretobuy">Where To Buy URL</Form.Label>
        <Form.Control
          type="text"
          id="inputWheretobuy"
          className='mb-3'
          value={formData.WhereToBuy}
          name="WhereToBuy"
          onChange={handleChange}
        />

        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Guitar Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={formData.Desc} name="Desc" onChange={handleChange}/>
        </Form.Group>

        
          <Button type='submit' variant="dark" className='mt-3'>Add New Data</Button>
      </Form>
    </Row>
  )    

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Add Data
        </Modal.Title>
      </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            {modalContent}
          </Container>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>

    // <div>ea</div>
  )
}

function DeleteModal(props) {
  const d = props.dataguitar
  let [WarningMsg, setWarningMsg] = React.useState()
  let modalTitle
  let modalContent
  let timer
  if (!d) {
    modalTitle = (
      <h1>Fetching Data, Pls Wait</h1>
    )
    modalContent = (
      <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
      </Spinner>  
    )
  }else{
    modalTitle = d.Guitar_Name
    modalContent = (
      <Row>
        { WarningMsg ? WarningMsg : null }
        <Modal.Body>Are you sure want to delete { d.Guitar_Name } ?</Modal.Body>
      </Row>
    )    
  }

  function handleDelete(event, id){
    console.log(event);
    console.log(id);

    axios.delete(`https://skripsi-saw-gitar-2022-be.herokuapp.com/deleteguitar/`+id)
    .then((res) => {
      console.log(res);
      if (res.status !== 200) {
        setWarningMsg(
          <Alert key="danger" variant="danger">
              Update Failed, Pls Contact Super User For More Information
          </Alert>
        )
      }else{
        setWarningMsg(
          <Alert key="success" variant="success">
              Update Success, Page will reload automatically
          </Alert>
        )
        setTimeout(() => {
          window.location.reload()
        },3000)
        // timer()
      }
    })
    .catch((err) => {
        console.log(err);
        setWarningMsg(
          <Alert key="danger" variant="danger">
              Update Failed, Pls Contact Super User For More Information
          </Alert>
        )
    })
    
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete {modalTitle}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            {modalContent}
          </Container>
        </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={props.onHide}>
          Close
        </Button>
        <Button variant="danger" onClick={() => handleDelete(props.onHide, d.Guitar_ID)}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>

    // <div>ea</div>
  )
}

function formatRupiah(angka, prefix){
	var number_string = angka.replace(/[^,\d]/g, '').toString(),
	split   		= number_string.split(','),
	sisa     		= split[0].length % 3,
	rupiah     		= split[0].substr(0, sisa),
	ribuan     		= split[0].substr(sisa).match(/\d{3}/gi);
 
	// tambahkan titik jika yang di input sudah menjadi angka ribuan
	if(ribuan){
		let separator = sisa ? '.' : '';
		rupiah += separator + ribuan.join('.');
	}
 
	rupiah = split[1] != undefined ? rupiah + ',' + split[1] : rupiah;
	return prefix == undefined ? rupiah : (rupiah ? 'Rp. ' + rupiah : '');
}