
import React, { Fragment } from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import StaffRouters from '../../routers/Staffrouters'

const Layout = () => {
const StaffnavLinks = [
        {
          path: "/home",
          display: "Home",
        },
        {
            path: "/pendingorders",
            display: "Pending",
        },
        {
            path: "/inprogress",
            display: "On Going",
        },
        {
            path: "/completed",
            display: "Order History",
        },
  ];
  return <Fragment>
    <Header navLinks={StaffnavLinks}/>
    <div>
        <StaffRouters/>
    </div>
    <Footer/>
  </Fragment>
}

export default Layout