import React, { useEffect, useState } from 'react'
import TableComp from '../../components/adminUI/TableComp/TableComp'
import axios from 'axios';
import api from '../../api/api';
import CommonSection from '../../components/UI/CommonSection';
import '../../styles/admin/add-table.css'
import { TailSpin } from 'react-loader-spinner';
function Users() {
    const colList=[
    {
        header: 'First Name',
        key: 'firstName'
    },
    {
        header: 'Last Name',
        key: 'lastName'
    },{
        header: 'Email',
        key: 'email'
    },
    {
        header: 'Customer ID',
        key: 'id'
    },
]
    const [fullData,setFullData]=useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(()=>{
        const getFullData=()=>{
            setLoading(true);
            axios.get(api+'/user/role/5')
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
        <CommonSection title="Users" />
        <div className='table-comp'>
        <TableComp columns={colList} data={fullData} isClickable={false}/>
        </div>
    </div>
  )
}

export default Users;