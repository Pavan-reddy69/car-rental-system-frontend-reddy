import {React, useState } from "react";
import "../../styles/find-car-form.css";
import { Form, FormGroup } from "reactstrap";
import { useNavigate, Navigate } from "react-router-dom";
const FindCarForm = () => {

  const [TimeData,setTimeData]=useState({})

  
  const changeHandler = e => {
      setTimeData({...TimeData,[e.target.name]: e.target.value})
      console.log(TimeData)
    }
  
  
  const ValidateTimeData =()=>{
    if (Object.keys(TimeData).length>3){
      console.log(Object.values(TimeData),Object.keys(TimeData).length)
      navigate('/cars',{state:{TimeData:TimeData}})
      
    }
    else{
      console.log(Object.values(TimeData),Object.keys(TimeData).length)
      console.log('empty')
    }

  }

  const navigate=useNavigate()

  return (
    <Form className="form">
      <div className=" d-flex align-items-center justify-content-between flex-wrap">

        <FormGroup className="form__group">
          <p>From</p>
          <input type="date" placeholder="Journey date" name="FromDate" onChange={changeHandler} required valid/>
          <input type="time" placeholder="Journey date" name="FromTime" onChange={changeHandler} required valid/>
        </FormGroup>
        <FormGroup className="form__group">
          <p>To</p>
          <input type="date" placeholder="Journey date" name="ToDate" onChange={changeHandler} required valid/>
          <input type="time" placeholder="Journey date" name="ToTime" onChange={changeHandler} required valid/>
          
        </FormGroup>
        {/* {<FormGroup className="select__group">
          <p>Type of Car</p>
          <select>

            <option value="SUV">SUV</option>
            <option value="ac">AC Car</option>  
            <option value="non-ac">Non AC Car</option>
          </select>
        </FormGroup>} */}

        <FormGroup className="form__group">
          <button onClick={ValidateTimeData} className="btn find__car-btn" >Find Car</button>
        </FormGroup>
      </div>
    </Form>
  );
};

export default FindCarForm;
