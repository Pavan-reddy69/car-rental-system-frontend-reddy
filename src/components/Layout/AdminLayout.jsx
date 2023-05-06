import React, { Fragment } from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Adminrouters from '../../routers/Adminrouters'

const AdminLayout = () => {
const AdminnavLinks = [
        {
        path: "/home",
        display: "Home",
        },
        {
          path: "/stores",
          display: "Stores",
        },
        {
            path: "/users",
            display: "Users",
        },
        {
          path: "/staff",
          display: "Staff",
      },
        {
            path: "/orders",
            display: "Orders",
        },
  ];
  return <Fragment>
    <Header navLinks={AdminnavLinks}/>
    <div>
        <Adminrouters/>
    </div>
    <Footer/>
  </Fragment>
}

export default AdminLayout