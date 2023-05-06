import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import DropOffForm from '../../components/staffUI/forms/dropform'
import '../../styles/pendingorder.css';
import CommonSection from "../../components/UI/CommonSection";
import api from '../../api/api';
import { TailSpin } from "react-loader-spinner";

const InProgress = () => {
  const [inProgressOrders, setInProgressOrders] = useState([]);
  const [completedOrders, setCompletedOrders] = useState([]);
  const [showForm, setShowForm] = useState({});
  const [loading, setLoading] = useState(false);
  const [storeId, setStoreId] = useState('');

  useEffect(() => {
    const storeIdFromLocalStorage = localStorage.getItem('storeId');
    setStoreId(storeIdFromLocalStorage);
    console.log("Retrieved store ID:", storeId);
  }, []);
  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      try {
      const inProgressResponse = await axios.get(api+'/order/stores/'+storeId+'?orderStatus=INPROGRESS'); 
      setInProgressOrders(inProgressResponse.data);
      // Fetch completed orders from the API endpoint
      const completedResponse = await axios.get(api+'/order/stores/'+ storeId+'?orderStatus=COMPLETED');
      setCompletedOrders(completedResponse.data);
      
    } catch (error) {
      console.error('Error fetching pending orders: ', error);
    }
    setLoading(false);
  };

      
    fetchOrders();
   
  }, [storeId]);

  const handleDropOff = async (id) => {
    // Move the order from the pending list to the in-progress list
    const order = inProgressOrders.find((o) => o.id === id);
    setCompletedOrders([...completedOrders, id]);
    setInProgressOrders((prevInProgressOrders) =>
      prevInProgressOrders.filter((o) => o.id !== id)
    );

    // Update the in-progress orders list in the API endpoint
    const updatedOrder = { ...order, status: "COMPLETED" };
    try {
      await axios.put(
        api+`/order/${id}`,
        updatedOrder
      );
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleShowForm = (id) => {
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
          position='relative'
          color="#fff"
          ariaLabel="tail-spin-loading"
          radius="1"
          wrapperStyle={{ position: "absolute", top: 250, left: 640, bottom: 0, right: 0 }}
          wrapperClass=""
          visible={true}
        />
      </div>
    )}
     <CommonSection title="On Going Orders"/>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer Name</th>
            <th>Model Name</th>
            <th>Vehicle Number</th>
            <th>Dropoff Date</th>
            <th>Dropoff</th>
          </tr>
        </thead>
        <tbody>
        {inProgressOrders.length === 0 ? (
        <tr>
         <td colSpan="5" className="no-data">
           No data available
          </td>
        </tr>
          ) : (
          inProgressOrders.map((order) => (
          <tr key={order.id}>
            <td>{order.id}</td>
            <td>{order.userFirstName}</td>
            <td>{order.vehicleModelName}</td>
            <td>{order.numberPlate}</td>
            <td>{moment(order.toDate).format('DD/MM/YYYY')}</td>
             <td>
              {!showForm[order.id] ? (
                 <button onClick={() => handleShowForm(order.id)}>Drop-off</button>
              ) : (
             <DropOffForm
                 id={order.id}
                 kms= {order.kmsWent}
                 onDropOffSubmit={handleDropOff}
              onClose={() => handleShowForm(order.id)}
              />
          )}
        </td>
      </tr>
    ))
          )}
        </tbody>

      </table>
    </div>
  );
};
export default InProgress;