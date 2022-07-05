import logo from '../images/logo.png'
import banner_brand from '../images/banner-brand.png'
import { Link } from 'react-router-dom'


function LandingPage(){
    return(
        <div >
            <div className="img-container">
                <img src={logo} />
            </div>
            
            <div className="main-component">
                <p className="main-text fw-normal">
                    There is many kind of guitar to the point we dont know the best guitar for ourself, <br/> 
                    especially for someone who just want to learn guitar    
                </p>
                <Link to="/chooseguitar" className = "btn btn-dark">Find Guitar Recommendation With Filter</Link> <br/>  <br/> 
                <Link to="/allguitar" className = "btn btn-dark">See All Guitar Recommendation</Link>
                <p className="sub-text">
                    <span className="fw-lighter">
                        "My guitar is not a thing.
                        <br/>
                        it's extension of myself"
                    </span>
                    <br/>
                    <br/>
                    <span className="fw-bold">
                        - Joan Jet
                    </span>
                </p>
            </div>

            <div id='rssBlock'>
                <p className="cnnContents">
                    <span className="marqueeStyle">
                    <img src={banner_brand} /></span>
                </p>
            </div>

        </div>
    )
}

export default LandingPage;

