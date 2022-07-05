import React, {useEffect,useState} from 'react';
import Navbar from '../components/Navbar';
import { Container, Row,Col,Spinner} from 'react-bootstrap';
import GuitarCard from '../components/GuitarCard';

import ReactPaginate from 'react-paginate';

import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '../components/Footer';
import axios from 'axios';


export default function AllResultPage() {
    const [guitars, setGuitars] = useState();
    useEffect(() => {

        axios.get('https://skripsi-saw-gitar-2022-be.herokuapp.com/get/allguitar')
        .then((res) => {
            // console.log(res.data);
            setGuitars(res.data.data)
        })
        .catch((err) => {
            console.log(err);
        })
    }, []);


  return (
    <div  >
        <Navbar/>
        < Container className = 'container-result' >
            < h1 className = "text-center mb-5" > Result Recommendation </h1>
            {//conditional rendering here
                guitars ? 
                <PaginatedItems  itemsPerPage={10} data={guitars}/> : 
                <Row className="row justify-content-center mb-3">
                    <Spinner animation="border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </Spinner>
                </Row>
            }
            
            {/* <Row className="row justify-content-center mb-3">
                    {component}
            </Row> */}
        </Container>
        <Footer/> 
    </div>
  )
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
