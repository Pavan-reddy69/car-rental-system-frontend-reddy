import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from '../pages/Login'
import StaffHome from '../pages/Staff/Staffhome'
import InProgress from '../pages/Staff/inprogress'
import Completed from  '../pages/Staff/completed'
import PendingOrders from '../pages/Staff/pendingorder'
import OrderInvoice from '../pages/admin/OrderInvoice'

const StaffRouters = () => {
  return <Routes>
    <Route exact path="/home" element={<StaffHome />} />
    <Route exact path='/pendingorders' element={<PendingOrders/>}/>
    <Route exact path='/inprogress' element={<InProgress/>}/>
    <Route exact path='/completed' element={<Completed/>}/>
    <Route exact path='/invoice/order/:id' element={<OrderInvoice/>}/>
  </Routes>
}

export default StaffRouters;