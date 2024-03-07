import React, { useState } from 'react';
<<<<<<< HEAD
import { Navbar, Nav, Form, FormControl } from 'react-bootstrap';
import "./Topbar.scss";
import logo from "../../../Assets/Images/dark-logo.webp";
import search_icon from "../../../Assets/Images/search_icon.svg";
=======
import { Navbar, Nav } from 'react-bootstrap';
import "./Topbar.scss";
import logo from "../../../Assets/Images/dark-logo.webp";
// import search_icon from "../../../Assets/Images/search_icon.svg";
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
import Login from '../Login/Login';
import Signup from '../Signup/Signup';
import { FaCartPlus } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";

 
const Topbar = () => {
    const cartItems = useSelector((state) => state.user.cart);
    
    const [showLoginModal, setShowLoginModal] = useState(false);
    const [showRegisterModal, setShowRegisterModal] = useState(false);

    const handleCloseLoginModal = () => {
        setShowLoginModal(false);
    };
    const handleCloseRegisterModal = () => {
        setShowRegisterModal(false);
    };
    const handleLoginButtonClick = () => {
        setShowLoginModal(true);
      };
    
      const handleRegisterButtonClick = () => {
        setShowRegisterModal(true);
      };

    
   
    const totalItems = Array.isArray(cartItems) ? cartItems.reduce((totalQuantity, item) => totalQuantity + (item.quantity || 1), 0) : 0;


    return (

        <div className="topbar">
            <div className="container">
                <Navbar expand="lg" className="bg-body-tertiary">
                    <Navbar.Brand>
                        <Link to="/">
                            <img src={logo} alt="logo" className="logo" />
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll" >
                        <div className='navbarscroll_inner'>
                            <Nav
                                className=""
                                style={{ maxHeight: '100px' }}
                                navbarScroll
                            >
<<<<<<< HEAD

                            </Nav>
                            <Form >
                                <FormControl type="search" placeholder="Search" className="form-control" />
                                <div className='search_icon'><img src={search_icon} alt="" /></div>
                            </Form>
=======
                            </Nav>
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
                            <Nav className="navbar-nav ml-auto">
                                <div className='links'>
                                    <Nav.Link as={Link} to="/">
                                        Home
                                    </Nav.Link>
                                </div>
                                <div className='links'>
                                    <Nav.Link as={Link} to="/courses">
                                        Cources
                                    </Nav.Link>
                                </div>
<<<<<<< HEAD
                                <div className='links'>
                                    <Link to="/mycourses" className='nav-link'  >MyCources</Link>
                                </div>
                                <div className='links'>
                                    <Link to="/questionAnswers" className='nav-link'  >Q&A</Link>
                                </div>
                               
                                <Link to="/my_profile" className='cart_icon my_profile' >
                                    <FaUserCircle />
                                </Link>

                                <Link to="/cartitems" className='cart_icon'>
=======

                                <div className='links'>
                                    <Link to="/OfflineCources" className='nav-link'>Offline Cources</Link>
                                </div>

                                <div className='links'>
                                    <Link to="/auth/mycourses" className='nav-link'>MyCources</Link>
                                </div>
                               
                                <div className='links'>
                                    <Link to="/auth/quiz" className='nav-link'>Quiz</Link>
                                </div>
                               
                                <Link to="/auth/my_profile" className='cart_icon my_profile' >
                                    <FaUserCircle />
                                </Link>

                                <Link to="/auth/cartitems" className='cart_icon'>
>>>>>>> b9c88c5cc47ab04600ed54a978cde72875235e8f
                                    <FaCartPlus />
                                    <div className='total_items'>
                                        {totalItems}
                                    </div>
                                </Link>
                            </Nav>
                            <div className='authenticate_btns'>
                                <div className='authenticate_btns_first'>
                                    <Login 
                                     handleRegisterButtonClick={handleRegisterButtonClick}
                                     show={showLoginModal}
                                     handleShow={handleLoginButtonClick}
                                     handleClose={handleCloseLoginModal}
                                     />
                                </div>
                                <div className='authenticate_btns_second'>
                                    <Signup 
                                      handleLoginButtonClick={handleLoginButtonClick}
                                      show={showRegisterModal}
                                      handleClose={handleCloseRegisterModal}
                                      />
                                </div>
                            </div>
                        </div>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
        
    );
};

export default Topbar;
