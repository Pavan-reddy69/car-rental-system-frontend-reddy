
import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from '../pages/Home'
import About from '../pages/About'
import CarListing from '../pages/CarListing'
import CarDetails from '../pages/CarDetails'
import Faq from '../pages/Faq'
import NotFound from '../pages/NotFound'
import Orders from '../pages/admin/Orders'
import Users from '../pages/admin/Users'
import Stores from '../pages/admin/Stores'

const Routers = () => {
  return( ( <Routes>
    <Route path='/home' element={<Home/>} />
    <Route path='/about' element={<About/>} />
    <Route path='/faq' element={<Faq/>} />
    <Route path='/orders' element={<Orders/>} />
    <Route path='/users' element={<Users/>} />

    <Route path='/stores' element={<Stores/>} />
    <Route path='/cars' element={<CarListing/>} />
    <Route path='/cars/:id' element={<CarDetails/>} />
    {/* <Route path='*' element={<NotFound/>} /> */}
  </Routes>))
}

export default Routers