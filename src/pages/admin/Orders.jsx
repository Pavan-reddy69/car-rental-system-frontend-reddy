import React, { useEffect, useState } from 'react'
import TableComp from '../../components/adminUI/TableComp/TableComp'
import axios from 'axios';
import api from '../../api/api';
import CommonSection from '../../components/UI/CommonSection';
import FormComp from '../../components/adminUI/FormComp/FormComp';
import '../../styles/admin/add-table.css'
import { TailSpin } from 'react-loader-spinner';

function Orders() {

    
    const colList=[
    
    {
        header: 'First Name',
        key: 'userFirstName'
    },
    {
        header: 'Last Name',
        key: 'userLastName'
    },{
        header: 'User Email',
        key: 'userEmail'
    },
    {
        header: 'From Time',
        key: 'fromTime'
    },
    {
        header: 'To Time',
        key: 'toTime'
    },
    {
        header: 'Status',
        key: 'status'
    },
    {
        header: 'Estimate Price',
        key: 'estPrice'
    },
]
    // const OrderOnClickFunction=()=>{
    //     navigate(`/orders/${id}`)

    // }



    const formFields=[
        {
            label: 'User',
            dataType: 'text',
            name: 'user'
        },
        {
            label: 'From Time',
            dataType: 'time',
            name: 'fromTime'
        },
        {
            label: 'To Time',
            dataType: 'time',
            name: 'toTime'
        },
        {
            label: 'Estimate Price',
            dataType: 'number',
            name:'estPrice'
        },
        {
            label: 'Vehicle ID',
            dataType: 'number',
            name: 'vehicle_id'
        },
    ]

    const [fullData,setFullData]=useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        const getFullData=()=>{
            setLoading(true);
            axios.get(api+'/order/getOrderByStatus?orderStatus=COMPLETED')
            .then(data=>{
                setFullData(data.data);
                setLoading(false);
            })
            .catch(err=>console.log(err));
        };
    getFullData();
    
    },[])


  return (
    <div className="login-wrapper" style={{ position: "relative" }}>
    {loading && (
      <div className="loader-wrapper" style={{ position: "fixed", top: 0, left:0 , bottom: 0, right: 0, backgroundColor: "rgba(0, 0, 0, 0.5)" }}>
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
        <CommonSection title="Orders" />
        <div className='add-button table-comp'>
        <FormComp formTitle="Add Orders" FieldList={formFields} tableUrl="/order" />
        </div>
        <div className='table-comp'>
            <TableComp columns={colList} data={fullData} url="/orders/" isClickable={true} />
        </div>
    </div>
  )
}

export default Orders;