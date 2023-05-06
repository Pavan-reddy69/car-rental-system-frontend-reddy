import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import PickupForm from '../../components/staffUI/forms/pickupform'
import '../../styles/pendingorder.css';
import CommonSection from "../../components/UI/CommonSection";
import api from '../../api/api';
import { TailSpin } from "react-loader-spinner";

const PendingOrders = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    const storeIdFromLocalStorage = localStorage.getItem('storeId');
    setStoreId(storeIdFromLocalStorage);
    console.log("Retrieved store ID:", storeIdFromLocalStorage);
  }, []);
  
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
        const response = await axios.get(api+'/order/stores/'+storeId+'?orderStatus=PENDING');
        setPendingOrders(response.data);
  
        const inProgressResponse = await axios.get(api+'/order/stores/'+storeId+'?orderStatus=INPROGRESS'); 
        setInProgressOrders(inProgressResponse.data);
    
      } catch (error) {
        console.error('Error fetching pending orders: ', error);
      }
      setLoading(false);
    };
  
    fetchOrders();
  }, [storeId]);
  

  const handlePickup = async (id) => {
    // Find the order in the pending list
    const order = pendingOrders.find((o) => o.id === id);
    // Add the order to the in-progress list
    setInProgressOrders([...inProgressOrders, order]);
    // Remove the order from the pending list
    setPendingOrders((prevPendingOrders) =>
      prevPendingOrders.filter((o) => o.id !== id)
    );
    
    // Update the order status in the API endpoint
    const updatedOrder = { ...order, status: "INPROGRESS" };
    try {
      console.log('id',id);
      await axios.put(
        api+`/order/${id}`,
        updatedOrder
      );
      
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };
  const handleShowForm = (id) => {
    console.log(pendingOrders.find((o) => o.id === id).kmsWent);
    setShowForm((prevShowForm) => ({
      ...prevShowForm,
      [id]: !prevShowForm[id],
    }));
  };


  return (
    <div className="pending">
          {loading && (
      <div className="loader-wrapper" style={{ position: "fixed", top: 0, left:0 , bottom: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
        <TailSpin
          height="180"
          width="180"
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ position: "absolute", top: 250, left: 640, bottom: 0, right: 0 }}
          wrapperClass=""
          visible={true}
        />
      </div>
    )}
      <CommonSection title="Pending Orders"/>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Model Name</th>
            <th>Vehicle Number</th>
            <th>Scheduled Date</th>
            <th>Pickup</th>
          </tr>
        </thead>
        <tbody>
        {pendingOrders.length===0?(
          <tr>
          <td colSpan="5" className="no-data">
            No data available
           </td>
         </tr>
        ):(
        pendingOrders.map((order) => (
  <tr key={order.id}>
    <td>{order.id}</td>
    <td>{order.userFirstName}</td>
    <td>{order.vehicleModelName} </td>
    <td>{order.numberPlate}</td>
    <td>{moment(order.fromDate).format('DD/MM/YYYY')}</td>
    <td>
      {!showForm[order.id] ? (
        <button onClick={() => handleShowForm(order.id)}>Pickup</button>
      ) : (
        <PickupForm
          id={order.id}
          km= {order.kmsWent}
          onPickupSubmit={handlePickup}
          onClose={() => handleShowForm(order.id)}
        />
      )}
    </td>
  </tr>
)))}

        </tbody>
      </table>
    </div>
  );
};

export default PendingOrders;

