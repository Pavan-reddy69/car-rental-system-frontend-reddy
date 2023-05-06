import React, { useRef, useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col } from "reactstrap";
import { Link, NavLink } from "react-router-dom";
import "../Header/header.css";
import Login from "../../pages/Login";



const adminNavLinks = [
  {
    path: "/home",
    display: "Home",
  },
  {
    path: "/about",
    display: "About",
  },

  {
    path: "/faq",
    display: "FAQ",
  },
];



const Header = ({navLinks}) => {
  
  const menuRef = useRef(null);

  const toggleMenu = () => menuRef.current.classList.toggle("menu__active");

 
  return (
    <header className="header">
      {/* ========== main navigation =========== */}
      {renderNav()}

      {/* =============== header middle =========== */}
      {/* <div className="header__middle">
        <Container>
          <Row>
            <Col lg="4" md="3" sm="4">
              <div className="logo">
                <h1>
                  <Link to="/home" className=" d-flex align-items-center gap-2">
                    <i class="ri-car-line"></i>
                    <span>
                      Rent a <br /> Car 
                    </span>
                  </Link>
                </h1>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-earth-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>India</h4>
                  <h6>Bengaluru</h6>
                </div>
              </div>
            </Col>

            <Col lg="3" md="3" sm="4">
              <div className="header__location d-flex align-items-center gap-2">
                <span>
                  <i class="ri-time-line"></i>
                </span>
                <div className="header__location-content">
                  <h4>Monday to Saturday</h4>
                  <h6>9am - 9pm</h6>
                </div>
              </div>
            </Col>

            <Col lg="2" md="3" sm="0" className=" d-flex align-items-center justify-content-end " >
              <button className="header__btn btn ">
                <Link to="/contact">
                  <i class="ri-phone-line"></i> Request a call
                </Link>
              </button>
            </Col>
          </Row>
        </Container>
      </div> */}

      
    </header>
  );

function renderNav(){
    
    return(
      
      <div className="main__navbar fixed-top">
        <Container>
          <div className="navigation__wrapper d-flex align-items-center justify-content-between ">
            <span className="mobile__menu">
              <i class="ri-menu-line" onClick={toggleMenu}></i>
            </span>

            <div className="navigation" ref={menuRef} onClick={toggleMenu}>
              <div className="menu">
                {navLinks.map((item, index) => (
                  <NavLink
                    to={item.path}
                    className={(navClass) =>
                      navClass.isActive ? "nav__active nav__item" : "nav__item"
                    }
                    key={index}
                  >
                    {item.display}
                  </NavLink>
                ))}
              </div>
            </div>

            
            <div>
            <Col lg="6" md="6" sm="6">
              {LoginSignUp()}
            </Col>
            </div>


          </div>
        </Container>
      </div>
    )
  }
};


function LoginSignUp(){
  const[name,setName] = useState('');
  useEffect(() => {
    const roleName = localStorage.getItem('userName');
    if (roleName) {
      const userName = roleName;
      setName(userName);
    }
  }, []);
  function handleLogout(){
      localStorage.setItem('authToken',null);
      localStorage.setItem('roleName',null);
      localStorage.setItem('storeId',null);
      localStorage.setItem('userName',null);
      localStorage.setItem('userId',null);
      window.location.href = '/';
      
    }

  return (

    <>

<div className="header__top__right d-flex align-items-center justify-content-end gap-3 " style={{ whiteSpace: 'nowrap' }}>
  <div className="header__top d-flex align-items-center gap-1">
   <i class="ri-user-shared-line"></i>hi,{name} 
  </div>

  <button className="header__top__button d-flex align-items-center gap-1" onClick={handleLogout}>
    <i className="ri-user-line"></i> Logout
  </button>
</div>

    </>

  );

}



export default Header;
