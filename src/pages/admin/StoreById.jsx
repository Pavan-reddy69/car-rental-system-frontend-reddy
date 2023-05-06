import React, { useEffect, useState } from 'react'
import TableComp from '../../components/adminUI/TableComp/TableComp'
import axios from 'axios';
import api from '../../api/api';
import CommonSection from '../../components/UI/CommonSection';
import { useParams } from 'react-router-dom';
import '../../styles/admin/add-table.css'
import FormComp from '../../components/adminUI/FormComp/FormComp';
import { Link } from 'react-router-dom';
import Caradd from '../../components/adminUI/Add car/caradd';
import { Button } from 'reactstrap';
import '../../styles/admin/storebyid.css'

function StoreById() {

    const { id } = useParams();
    const colList=[
    
    {
        header: 'Name',
        key: 'modelName'
    },
    {
        header: 'Brand',
        key: 'brandName'
    },
    {
        header: 'Vehicle Type',
        key: 'vehicleType'
    },
    {
        header: 'Kms travelled',
        key: 'kmsWent'
    },
    {
        header: 'Mileage',
        key: 'mileage'
    },
    {
        header: 'No of Seats',
        key: 'noOfSeats'
    },
    {
        header: 'Price Per Hour',
        key: 'pricePerHour'
    },
]
    const [fullData,setFullData]=useState([]);
    const formFields=[
        {
            label: 'Brand Name:',
            dataType: 'text',
            name: 'name'
        },
        {
            label: 'Model Name:',
            dataType: 'text',
            name: 'model'
        },
        {
            label: 'Model Number:',
            dataType: 'text',
            name: 'model number'
        },
        {
            label: 'Number of Seats:',
            dataType: 'number',
            name: 'Seats'
        },
        {
            label: 'Price/hr:',
            dataType: 'number',
            name: 'mileage'
        },
        {
            label: 'airConditioning:',
            dataType: 'checkbox',
            name: 'airConditioning'
        },
        {
            label: 'Vehicle type:',
            dataType: 'text',
            name: 'vehicleType'
        },
        {
            label: 'Fuel type:',
            dataType: 'text',
            name: 'fuelType'
        },
        {
            label: 'Automatic?',
            dataType: 'text',
            name: 'vautomatic'
        },
        {
            label: 'Description',
            dataType: 'text',
            name: 'description'
        },

]
    useEffect(()=>{
        const getInvoiceData = () => {
        axios
        .get(api+'/vehicle/store/'+id)
        .then(data => { setFullData(data.data); })
        .catch(error => console.log(error));
        };
      getInvoiceData();
      console.log(fullData);
      },[id]);


  return (
    <div>
        <CommonSection title="Vehicles" />
        <Button className='btn-secondary'>
        <Link to={`/stores`}>
        <i class="ri-arrow-left-line"> back</i>
        </Link>
        </Button>
        <Button className='add__btn1' color="primary" onClick={<Caradd/>}>
          <i class="ri-add-line"></i>
            Add
          </Button>
        <TableComp columns={colList} data={fullData}/>
    </div>
  )
}

export default StoreById;