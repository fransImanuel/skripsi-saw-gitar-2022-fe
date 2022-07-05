import React, {useEffect,useState} from 'react';
import Navbar from '../components/Navbar';
import { Container,Row,Col,Spinner,Alert} from 'react-bootstrap';
import GuitarCard from '../components/GuitarCard';
import ReactPaginate from 'react-paginate';

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';

export default function ResultPage() {
    const {state} = useLocation()
    const d = state.data
    // console.log(d);


  return (
    <div  >
        <Navbar/>
        < Container className = 'container-result' >
            < h1 className = "text-center mb-5" > Result Recommendation </h1>
            <Row>
                {
                d ?
                <PaginatedItems  itemsPerPage={10} data={d}/>: 
                <Row className="row justify-content-center mb-3">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>

                
                // d.map( (d)=>{
                //     return (
                //     <Col sm={12} md={6} lg={4} xxl={3} className='mb-3'>
                //         <GuitarCard guitarData = {d}/>
                //     </Col>)
                // })
                }
                {
                  d.length ==0 &&<Alert key="primary" primary="primary">
                    Sorry we dont have what you want right now!!
                  </Alert>
                  
                }
            </Row>
        </Container>
        <Footer/>
    </div>
  );
}


function Items({ currentItems }) {
  return (
    <Row className="row justify-content-center mb-3">
        {currentItems && currentItems.map((item) => (
            <Col sm={12} md={6} lg={4} xxl={3} className='mb-5'>
                <GuitarCard guitarData = {item}/>
            </Col>
        ))}
    </Row>
  );
}

function PaginatedItems({ itemsPerPage,data }) {
    // console.log("PaginatedItems");
    // console.log(data);
  // We start with an empty list of items.
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    // console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(data.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(data.length / itemsPerPage));
  }, [itemOffset, itemsPerPage]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = event.selected * itemsPerPage % data.length;
    console.log(`User requested page number ${event.selected}, which is offset ${newOffset}`);
    setItemOffset(newOffset);
  };

  return (
    <>    
        <Items currentItems={currentItems} /> 
        <ReactPaginate
            className='pagination d-flex justify-content-center'
            nextLabel="next >"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            pageCount={pageCount}
            previousLabel="< previous"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            renderOnZeroPageCount={null}
        />
    </>
  );
}
