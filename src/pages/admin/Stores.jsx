import React, { useEffect, useState } from 'react'
import TableComp from '../../components/adminUI/TableComp/TableComp'
import FormComp from '../../components/adminUI/FormComp/FormComp';
import axios from 'axios';
import closeicon from '../../components/staffUI/forms/close.png'
import api from '../../api/api';
import CommonSection from '../../components/UI/CommonSection';
import '../../styles/admin/add-table.css'
import Helmet from "../../components/Helmet/Helmet";
import '../../components/staffUI/forms/pickup.css';
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
 header: 'Admin Id',
 key: 'admin_id'
 },
]
 const [fullData,setFullData]=useState([]);

 const [store_name,setStoreName]=useState("")
 const [location,setLocation]=useState("")
 const [showForm, setShowForm] = useState(false);

 const postMeth=(storeName,storeLocation)=>{
 console.log(storeLocation,storeName)
 axios.post(api+'/store',{admin_id:1,name:storeName,location:storeLocation}).then(res=>{
  console.log('posting Data',res);
  setShowForm(false);
  getFullData();
 }).catch(err=>console.log(err))
 }

 const handleToggleVisible = () => {
 setShowForm(false);
 getFullData();
 };

 const getFullData = () => {
  axios.get(api+'/store')
    .then(data=>{
      setFullData(data.data);
    })
    .catch(err=>console.log(err));
 };

 useEffect(()=>{
 getFullData();
 },[])


 return (
 <Helmet title="Stores">
 <div>
 <CommonSection title="Stores" />
 <div className='add-button table-comp'>
 {showForm && (
    <div className="pickup-form-container">
      <form className='pickform' onSubmit={(event) => {
        event.preventDefault();
        postMeth(store_name, location);
      }}>
        <button className='close-button' onClick={() => setShowForm(false)}>
          <img src={closeicon} width="47" height="42"/>
        </button>
        <div>
          <label className='pickform1' >Store Name
            <input
              type="text"
              id="store_name"
              onChange={(event) => setStoreName(event.target.value)}
              required
            />
          </label>
        </div>
        <div>
          <label className='pickform1'>Location
            <input
              type="text"
              id="location"
              onChange={(event) => setLocation(event.target.value)}
              required
            />
          </label>
        </div>
        <button className='pickform2' type="submit">Submit</button>
      </form>
    </div>
  )}
  {!showForm && (
    <button className="add-item-button" onClick={() => setShowForm(true)}>
      Add New Store
    </button>
  )}
 </div>
 <div className='table-comp'>
 <TableComp columns={colList} data={fullData} url="/stores/" isClickable={true} onClose={() => handleToggleVisible()}/>
 </div>
 </div></Helmet>
 )
}

export default Stores
