import React, { useEffect, useState } from 'react'
import TableComp from '../../components/adminUI/TableComp/TableComp'
import FormComp from '../../components/adminUI/FormComp/FormComp';
import axios from 'axios';
import api from '../../api/api';
import CommonSection from '../../components/UI/CommonSection';
import '../../styles/admin/add-table.css'
import { TailSpin } from 'react-loader-spinner';

function Stores() {
    const colList=[
    
    {
        header: 'Name',
        key: 'name'
    },
    {
        header: 'Location',
        key: 'location'
    },{
        header: 'Store ID',
        key: 'id'
    },
]
    const [fullData,setFullData]=useState([]);
    const [loading, setLoading] = useState(false);
    const formFields=[
        {
            label: 'Store Name',
            dataType: 'text',
            name: 'name'
        },
        {
            label: 'Location',
            dataType: 'text',
            name: 'location'
        },
    ]

    useEffect(()=>{
        const getFullData=()=>{
            setLoading(true);
            axios.get(api+'/store')
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
        <CommonSection title="Stores" />
        <div className='add-button table-comp'>
            <FormComp formTitle="Add Stores" FieldList={formFields} tableUrl="/store" />
        </div>
        <div className='table-comp'>
            <TableComp columns={colList} data={fullData} url="/stores/" isClickable={true}/>
        </div>
    </div>
  )
}

export default Stores