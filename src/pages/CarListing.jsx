import React,{useEffect,useState} from "react";
import { Container, Row, Col } from "reactstrap";
import Helmet from "../components/Helmet/Helmet";
import CommonSection from "../components/UI/CommonSection";
import CarItem from "../components/UI/CarItem";
import '../styles/common-section.css'

import axios from "axios";
import { useLocation } from "react-router-dom";
import api from "../api/api"


const CarListing = () => {

  
  
  const location=useLocation();
  console.log(location)
  const TimeData=location.state.TimeData;
  console.log(TimeData);



  const query=location.search;
  console.log(query)
  const [carData,setCarData]= useState([])

  const [filters,setFilters]=useState([
    {
      brand:"",
      price:0,
      noOfSeats:0
    }
    ])
  const changeHandler = e => {

    setFilters(previousState => {
      return { ...previousState, [e.target.name]: e.target.value}
    });
    console.log(filters)
  }


  const getCarData = () => {
        console.log(api+'/vehicle'+'?fromTime='+TimeData.FromDate+'T'+TimeData.FromTime+'&toTime='+TimeData.ToDate+'T'+TimeData.ToTime+"&brandName="+filters.brand+"&price="+filters.price+"&noOfSeats="+filters.noOfSeats)
        console.log(api+'/vehicle'+'?fromTime='+TimeData.FromDate+'T'+TimeData.FromTime+'&toTime='+TimeData.ToDate+'T'+TimeData.ToTime+"&brandName=''"+"&price=0"+"&noOfSeats=0")
      
      axios
      .get(api+'/vehicle'+'?fromTime='+TimeData.FromDate+'T'+TimeData.FromTime+'&toTime='+TimeData.ToDate+'T'+TimeData.ToTime+"&brandName="+filters.brand+"&price="+filters.price+"&noOfSeats="+filters.noOfSeats)
      .then(data => {
        
        setCarData(data.data);
      })
      .catch(error => console.log(error));
      console.log(carData)};
   
    



  useEffect(()=>{getCarData()
  },[]);
  console.log(carData)

  return (
    <Helmet title="Cars">
      <CommonSection title="Car Listing" />
      <section>
        <Container>
          <Row>
            <Col lg="12">
              <div className="w-95 filter__elements ">
              <div className=" d-flex align-items-center gap-5 flex-wrap">
                <span className=" d-flex align-items-center gap-2 ">
                  {/* <i class="ri-sort-asc"></i> */}
                  <p>Sort by: </p>
                  <select className="filter__element" name="sort" onChange={changeHandler}>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select> 
                
                {/* <i class="ri-filter-2-fill"></i> */}
                <p>&emsp; Filters: </p>
                <span className="d-flex align-items-center gap-5 filter__element">
                <Filters filter="Brand" name="brand" options={[]} option1="Tesla" option2="Toyota" option3="BMW" changeHandler={changeHandler}/>
                <Filters filter="Seats" name="noOfSeats" option1="5" option2="7" option3="8" changeHandler={changeHandler}/>
                </span>
                
                </span>
                <button className="apply__btn btn" onClick={()=>{console.log(filters);getCarData()}}>Apply</button>
              </div>
              </div>
              
            </Col>
            {carData.length>0? 
            carData.map((item) => (
              <CarItem item={item} key={item.id} />
            )):<p>No Cars Awailable</p> }
            
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


const Filters = ({filter,name, option1, option2, option3,changeHandler})=>{
  return(
  <div>
    
    <select className="filter__element" name={name} onChange={changeHandler}>
                  <option>Select {filter}</option>
                  <option>{option1}</option>
                  <option >{option2}</option>
                  <option >{option3}</option>
    </select>
    
  </div>
  )
}
export default CarListing;

