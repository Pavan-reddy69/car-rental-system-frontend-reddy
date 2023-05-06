import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import UserLayout from './components/Layout/UserLayout';
import StaffLayout from './components/Layout/StaffLayout';
import AdminLayout from './components/Layout/AdminLayout';
import { TailSpin } from 'react-loader-spinner';

function App() {
  const [accessToken, setAccessToken] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const navigate = useNavigate();
  <TailSpin
  height="80"
  width="80"
  color="#2b025d"
  ariaLabel="tail-spin-loading"
  radius="1"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  const handleLogin = (inputObj) => {
    console.log('token', inputObj.accessToken, 'roleName', inputObj.roleName);
    setAccessToken(inputObj.accessToken);
    setUserRole(inputObj.roleName);
    navigate('/home');
  }

  useEffect(() => {

    //fetch token 
    let tkn = localStorage.getItem('accessToken');
    if (tkn) {
      setAccessToken(tkn)
    }

    //fetch role
    let role = localStorage.getItem('roleName');
    console.log('ls',role)

    if (role) {
      setUserRole(role)
    }

  }, [])
  const UserRole = {
    CUSTOMER: 'customer',
    STAFF: 'staff',
    ADMIN: 'admin',
  };
  
  function getContent() {
    
    let content;
    if (accessToken != null){
      if(userRole === UserRole.CUSTOMER) {
        content = <UserLayout />;
      } else if (userRole === UserRole.STAFF) {
        content = <StaffLayout />;
      } else if (userRole === UserRole.ADMIN) {
        content = <AdminLayout />;
      }else{
        content = <Login onLogin={handleLogin} />;
      }
    }
    else{
      content = <Login onLogin={handleLogin} />;
    }
    return content;

  }
  
  return (
    <Routes>
      <Route path='/' element={<Login onLogin={handleLogin} />} />
      <Route path='*' element={getContent()} />
    </Routes>
  );

}

export default App;