import { useState,useEffect } from "react";
import { Link } from 'react-router-dom';
import axios from "axios";
import '../../styles/pendingorder.css';
import CommonSection from "../../components/UI/CommonSection";
import api from "../../api/api";
import { TailSpin } from "react-loader-spinner";

const Completed = () => {
    const[completedOrders, setCompletedOrders] = useState([]);
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
          // Fetch completed orders from the API endpoint
          const completedResponse = await axios.get(api+'/order/stores/'+storeId+'?orderStatus=COMPLETED');
          setCompletedOrders(completedResponse.data);
        } catch (error) {
          console.error('Error fetching pending orders: ', error);
        }
        setLoading(false);
      };
    
          
        fetchOrders();
      }, [storeId]);
    return(
      
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
            <CommonSection title="Order History"/>
            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Customer Name</th>
                        <th>Model Name</th>
                        <th>Vehicle Number</th>
                        <th>Invoice</th>
                    </tr>
                </thead>
                <tbody>
                    {completedOrders.length===0 ? (
                        <tr>
                        <td colSpan="4" className="no-data">
                          No data available
                         </td>
                       </tr>
                    ):(
                    
                    completedOrders.map((order) => (
                        <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.userFirstName}</td>
                        <td>{order.vehicleModelName} </td>
                        <td>{order.numberPlate}</td>
                        <td><Link to={`/invoice/order/${order.id}`}>Invoice</Link></td>
                        </tr>
                    )
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Completed;