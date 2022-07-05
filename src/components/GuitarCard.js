import React from 'react';
import { Card,Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import guitarThumbnail from '../images/guitar-img.jpg'
import {
    Modal,
    Container,
    Row,
    Col
} from 'react-bootstrap';

import 'bootstrap/dist/css/bootstrap.min.css';


function MyVerticallyCenteredModal(props) {
  const d = props.dataGuitar
  // console.log(d);
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          {d.Guitar_Name}
        </Modal.Title>
      </Modal.Header>
        <Modal.Body className="show-grid">
          <Container>
            <Row>
              <Col xs={12} sm={12} md={8} lg={6}>
                <div className="guitar-modal-container">
                  <img src={d.Image}/>
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
          </Container>
        </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

function GuitarCard(props) {
    const [modalShow, setModalShow] = React.useState(false);
    //d meant for data
    const d = props.guitarData
    return(
        <div>
            <a className = 'guitar-card' onClick = {() => setModalShow(true)}>
                <Card style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={d.Image}/>
                    <Card.Body>
                        <Card.Title>{d.Guitar_Name}</Card.Title>
                    </Card.Body>
                </Card>
            </a>

            
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
                dataGuitar = {d}
            />
        </div>
        
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

export default GuitarCard;

