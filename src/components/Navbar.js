import React from 'react';
import { useNavigate } from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';



function Navbar(){
    const [show, setShow] = React.useState(true)
    let navigate = useNavigate();

    function controlNavbar(){
        if (window.scrollY > 30) {
            setShow(false)
        }else{
            setShow(true)
        }
    }

    React.useEffect(()=>{
        window.addEventListener('scroll',controlNavbar)
        return(()=>{
            window.removeEventListener('scroll', controlNavbar)
        })
    }, [])

    function handleLogout(event){
        console.log(sessionStorage.getItem("adminlogin"))
        sessionStorage.removeItem("adminlogin")
        navigate('/')

    }

    return (
        <div>
            <nav id = "navbar" className = {`autohide ${ show ?  'scrolled-up' :'scrolled-down'  }`} >
                <div className="nav-wrapper">
                    <div className="logo">
                        <a href="/"><i className="fa fa-angellist"></i> <span className="logo-text">DSS</span>Guitar.</a>
                    </div>
                    <ul id="menu">  
                        <a href="https://www.linkedin.com/in/frans-imanuel-567154190/" className="btn btn-dark">About Me</a>
                        <li>
                            <a href="/login">Admin</a>
                        </li>
                        {
                            (window.location.pathname == "/adminpage") && (
                                <li>
                                    <a onClick={handleLogout} style={{cursor: "pointer"}}>logout</a>
                                </li>
                            )
                        }
                        
                    </ul>
                </div>
            </nav>


            {/* <!-- Menu Icon --> */}
            <div className="menuIcon">
                <span className="icon icon-bars"></span>
                <span className="icon icon-bars overlay"></span>
            </div>


            <div className="overlay-menu">
                <ul id="menu">
                    <li><a href="#about">About Me</a></li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;