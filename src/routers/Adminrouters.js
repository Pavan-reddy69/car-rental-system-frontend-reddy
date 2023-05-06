import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Orders from '../pages/admin/Orders'
import Stores from '../pages/admin/Stores'
import Users from '../pages/admin/Users'
import AdminHome from '../pages/admin/Adminhome'
import OrderInvoice from '../pages/admin/OrderInvoice'
import StoresById from '../pages/admin/StoreById'
import Staff from '../pages/admin/staff'

const Adminrouters = () =>{
    return((
        <Routes>
            <Route path='/home' element={<AdminHome/>}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='/Staff' element={<Staff/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/stores' element={<Stores/>}/>
            <Route path='/orders/:id' element={<OrderInvoice/>}/>
            <Route path='stores/:id' element={<StoresById/>}/>
        </Routes>
    ))
}

export default Adminrouters;