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

  // const postFunction=(e,est,v_id)=>{
  //   e.preventDefault();
  //   alert("Order Confirmed");
  //   axios
  //   .post(api+"/order",{
  //   user:"", 
  //   fromTime:TimeData.fromTime,
  //   toTime:TimeData.toTime,
  //   estPrice:est,
  //   vehicle_id:v_id
  //   }).then(res=>console.log('Posting Data',res)).catch(error => console.log(error))
  //   }

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
                  {/* <i class="ri-sort-asc"></i>
                  <p>Sort by: </p>
                  <select className="filter__element" name="sort" onChange={changeHandler}>
                  <option value="low">Low to High</option>
                  <option value="high">High to Low</option>
                </select> 
                 */}
                {/* <i class="ri-filter-2-fill"></i> */}
                <p>&emsp; Filters: </p>
                <span className="d-flex align-items-center gap-5 filter__element">
                <Filters filter="Brand" name="brand" options={[]} option1="Tesla" option2="Toyota" option3="BMW" option4="Mahindra"
                        option5="Tata" option6="Maruti" option7="Kia" option8="Hyundai" changeHandler={changeHandler}/>
                <Filters filter="Seats" name="noOfSeats" option1="5" option2="7" changeHandler={changeHandler}/>
                </span>
                
                </span>
                <button className="apply__btn btn" onClick={()=>{console.log(filters);getCarData()}}>Apply</button>
              </div>
              </div>
              
            </Col>
            {carData.length>0? 
            carData.map((item) => (
              <CarItem item={item} key={item.id} TimeData={TimeData}/>
            )):<p>No Cars Available</p> }
            
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};


const Filters = ({filter,name, option1, option2, option3,option4 ,option5,option6,option7,option8,changeHandler})=>{
  return(
  <div>
    
    <select className="filter__element" name={name} onChange={changeHandler}>
                  <option>Select {filter}</option>
                  <option>{option1}</option>
                  <option >{option2}</option>
                  <option >{option3}</option>
                  <option>{option4}</option>
                  <option>{option5}</option>
                  <option>{option6}</option>
                  <option>{option7}</option>
                  <option>{option8}</option>
    </select>
    
  </div>
  )
}
export default CarListing;

