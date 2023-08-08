import React from 'react'
import { Route, redirect, useNavigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { Logout } from '../login';
import { useEffect } from 'react';
const PatientDashboard = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
          navigate('/');
        }
      }, [isAuthenticated, isLoading, navigate]);
    // console.log("userr",isAuthenticated);
    if (isLoading) {
        return <div>Loading ...</div>;
      }


    //   return (
    //     <Route
    //       {...rest}
    //       render={({ location }) =>
    //         isAuthenticated ? (
    //           children
    //         ) : (
    //           <Redirect to={{ pathname: '/login', state: { from: location } }} />
    //         )
    //       }
    //     />
    //   );
    // if (!isAuthenticated) {
        
    //     navigate('/');
    //     return <></>;
    // }
  return (
    <>
        <div>
            <h1>User Logged In hai</h1>
            <img src={user.picture} alt={user.name} />
            {/* <h1></h1> */}
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <Logout/>
        </div>
    </>
  )
}

export default PatientDashboard;