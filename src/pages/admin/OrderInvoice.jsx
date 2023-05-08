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
import { pdf } from '@react-pdf/renderer';
import InvoicePDF from './pdf';
import { Table } from 'reactstrap';
import { margin } from '@mui/system';
import '../../styles/pendingorder.css'
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
          <div className='invoice' >
            <Table  bordered
  responsive
  size="sm"
  striped>
              <tbody>
                <tr>
                  <td > User Name:</td>
                  <td>{fullData.userFirstName}</td>
                </tr>
                <tr>
                  <td>Vehicle Name:</td>
                  <td>{fullData.vehicleModelName}</td>
                </tr>
                <tr>
                  <td>Vehicle Price/Hr:</td>
                  <td>Rs. {fullData.vehiclePricePerHour}</td>
                </tr>
                <tr>
                  <td>From Date:</td>
                  <td>{moment(fullData.fromDate).format('DD/MM/YYYY')}</td>
                </tr>
                <tr>
                  <td>From Time:</td>
                  <td>{moment(fullData.fromTime,'HH:mm:ss').format('hh:mm A')}</td>
                </tr>
                <tr>
                  <td>To Date:</td>
                  <td>{moment(fullData.toDate).format('DD/MM/YYYY')}</td>
                </tr>
                <tr>
                  <td>To Time:</td>
                  <td>{moment(fullData.toTime,'HH:mm:ss').format('hh:mm A')}</td>
                </tr>
                <tr>
                  <td>Base Amount:</td>
                  <td>Rs. {fullData.amount}</td>
                </tr>
                <tr>
                  <td>Penalties:</td>
                  <td>Rs. {fullData.costForPenalties}</td>
                </tr>
                <tr>
                  <td>Tax:</td>
                  <td>Rs. {fullData.taxAndOthers}</td>
                </tr>
                <tr>
                  <td>Total Amount:</td>
                  <td>Rs. {fullData.totalAmount}</td>
                </tr>
              </tbody>
            </Table>
            <InvoicePDF data={fullData} />
          </div>
        </div>
      );
      
}

export default OrderInvoice;