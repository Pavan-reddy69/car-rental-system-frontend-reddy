
import React, { Fragment } from 'react'

import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import Routers from '../../routers/Routers'

const UserLayout = () => {
  const userNavLinks = [
    {
      path: "/home",
      display: "Home",
    },
    {
      path: "/about",
      display: "About",
    },
  
    {
      path: "/faq",
      display: "FAQ",
    },
  ];
  
  return <Fragment>
    <Header navLinks={userNavLinks}/>
    <div>
        <Routers/>
    </div>
    <Footer/>
  </Fragment>
}

export default UserLayout