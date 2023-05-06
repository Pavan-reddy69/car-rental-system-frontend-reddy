import React from "react";
import Slider from "react-slick";
import { Container, Row ,Col} from "reactstrap";
import CommonSection from "../../components/UI/CommonSection";
import image1 from '../../assets/slider-img/slider-1.jpg'
import image2 from '../../assets/slider-img/slider-2.jpg'
import image3 from '../../assets/slider-img/slider-3.jpg'
import { useSpring,animated } from "react-spring";
import "../../styles/Staffhome.css"

const StaffHome = () => {
  function Number({n}) {
    const {number} = useSpring({
      from :{number:0},
      number:n,
      delay:800,
      config:{mass:1,tension:20,friction:10},
    });
    return <animated.div style={{ color: "red" }}>{number.to((n) => n.toFixed(0))}</animated.div>
  }

  return (
    <>
    <CommonSection title="Welcome Back Staff Member" />
    <div className="container-home">
      <h1>About Our Store:</h1>
      <Container>
        <Row className="bordered-row">
          <Col lg="9">
          <div className="col-lg">
          A car rental, hire car or car hire agency is a company that rents automobiles for short periods of time to the public, 
          generally ranging from a few hours to a few weeks. It is often organized with numerous local branches (which allow a user to return a vehicle 
          to a different location), 
          and primarily located near airports or busy city areas and often complemented by a website allowing online reservations.
          </div>
          </Col>
          <Col lg="3">
          <div className="col-sm">
            <img src={image1}/>
          </div>
          </Col>
        </Row>
        <Row className="bordered-row">
          <Col lg="3">
          <div className="col-sm1">
            <img src={image2}/>
          </div>
          </Col>
          <Col lg="9">
          <div className="col-lg">
          A car rental, hire car or car hire agency is a company that rents automobiles for short periods of time to the public, 
          generally ranging from a few hours to a few weeks. It is often organized with numerous local branches (which allow a user to return a vehicle 
          to a different location), 
          and primarily located near airports or busy city areas and often complemented by a website allowing online reservations.
          </div>
          </Col>
        </Row>
        <h1>Our Store Contains:</h1>
        <Row>
        
          <Col lg="4">
          <div className="bordered-column">
           <h1><b><Number n={125}/></b></h1> 
            <b>Happy Customers</b>
            </div>
          </Col>
          <Col lg="4">
          <div className="bordered-column">
           <h1><b><Number n={20}/></b></h1>
            <b>Different Cars</b>
            </div>
          </Col>
          <Col lg="4">
          <div className="column">
           <h1><b><Number n={15}/></b></h1> 
            <b>Staff Employees</b>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
    </>
  );
}

export default StaffHome;

//   const settings = {
//     fade: true,
//     speed: 2000,
//     autoplaySpeed: 6000,
//     infinite: true,
//     autoplay: true,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     pauseOnHover: false,
//   };

  
//   return (
//     <Slider {...settings} className="hero__slider">
//       <div className="slider__item slider__item-01 mt0">
//         <Container>
//           {sliderContent()}
//         </Container>
//       </div>

//       <div className="slider__item slider__item-02 mt0">
//         <Container>
//         {sliderContent()}
//         </Container>
//       </div>

//       <div className="slider__item slider__item-03 mt0">
//         <Container>
//         {sliderContent()}
//         </Container>
//       </div>
//     </Slider>
//   );
// };
