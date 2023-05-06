import React, { useEffect, useState } from 'react'
import axios from 'axios';
import api from '../../api/api';
import CommonSection from '../../components/UI/CommonSection';
import { useParams } from 'react-router-dom';
import {Row, Col } from 'reactstrap';
import '../../styles/common-section.css'
import moment from 'moment';
import '../../styles/invoice.css'
import { TailSpin } from 'react-loader-spinner';

function OrderInvoice() {
    

    const { id } = useParams();
    
    const [fullData,setFullData]=useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const getInvoiceData = () => {
          setLoading(true);
        axios
        .get(api+'/invoice/order/'+id)
        .then(data => { setFullData(data.data); })
        .catch(error => console.log(error));
        setLoading(false);
        };
      getInvoiceData();
      console.log(fullData);
      },[id]);


  return (
    <div className="login-wrapper" style={{ position: "relative" }}>
    {loading && (
      <div className="loader-wrapper" style={{ position: "absolute", top: 0, left:0 , bottom: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <TailSpin
          height="180"
          width="180"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ position: "absolute", top: 250, left: 625, bottom: 0, right: 0 }}
          wrapperClass=""
          visible={true}
        />
      </div>
    )}
 <CommonSection title="Invoice" />
 <div className='invoice'>
 <Row className='invoice-body'>
 <Col xs="6" sm="4">
 <p>User Name:</p>
 <p>Vehicle Name: </p>
 <p>Vehicle Price/Hr: </p>
 <p>From Date: </p>
 <p>From Time: </p>
 <p>To Date: </p>
 <p>To Time: </p>
 <p>Base Amount: </p>
 <p>Penalties: </p>
 <p>Tax: </p>
 <p>Total Amount: </p></Col>
 <Col xs="6" sm="4">
 <p>{fullData.userFirstName}</p>
 <p>{fullData.vehicleModelName}</p>
 <p>Rs.{fullData.vehiclePricePerHour}</p>
 <p>{moment(fullData.fromDate).format('DD/MM/YYYY')}</p>
 <p>{moment(fullData.fromTime,'HH:mm:ss').format('hh:mm A')}</p>
 <p>{moment(fullData.toDate).format('DD/MM/YYYY')}</p>
 <p>{moment(fullData.toTime,'HH:mm:ss').format('hh:mm A')}</p>
 <p>Rs.{fullData.amount}</p>
 <p>Rs.{fullData.costForPenalties}</p>
 <p>Rs.{fullData.taxAndOthers}</p>
 <p>Rs.{fullData.totalAmount}</p>
 </Col>
 </Row>
 <Col className='inv-left'>
 
 </Col>
  
 </div>
 </div>
  )
}

export default OrderInvoice;