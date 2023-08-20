import React, { useState } from 'react'
import { Route, redirect, useNavigate} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import {  HomePage, Navbar, ShareEHR } from '../Dashboards';
import { Logout } from '../login';
import { useEffect } from 'react';
const PatientDashboard = () => {
    const { user, isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();
    const [userMetadata, setUserMetadata] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      const getUserMetadata = async () => {
        const domain = "dev-e8yp6sp464fgsn24.us.auth0.com";
    
        try {
          const accessToken = await getAccessTokenSilently({
            authorizationParams: {
              audience: `https://${domain}/api/v2/`,
              scope: "read:current_user",
            },
          });
    
          const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
    
          const metadataResponse = await fetch(userDetailsByIdUrl, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
    
          const { user_metadata } = await metadataResponse.json();
    
          setUserMetadata(user_metadata);

          if(user_metadata==="doctor"){
            redirect('/doctor_dashboard')
          }
        } catch (e) {
          console.log(e.message);
        }
      };
    
      getUserMetadata();
    }, [getAccessTokenSilently, user?.sub]);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
          navigate('/');
        }
      }, [isAuthenticated, isLoading, navigate]);
      useEffect(() => {
        if (isAuthenticated && user) {
          console.log("user is",user);
        }
      }, [isAuthenticated, user, navigate]);
    // console.log("userr",isAuthenticated);
    if (isLoading) {
        return <div>Loading ...</div>;
      }
      if(isAuthenticated){
        return (
          <>
          <div>
          <Navbar/>
              <div>
                  {/* <h1></h1> */}
                  <div>
                    <img src={user.picture} alt={user.name} />
                    <h2>{user.name}</h2>
                    <p>{user.email}</p>
                    <h3>User Metadata</h3>
                    {userMetadata ? (
                      <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
                    ) : (
                      "No user metadata defined"
                    )}
                  </div>

                  <HomePage user:user isAuthenticated:isAuthenticated/>
                  <Logout/>
              </div>
          </div>
            
          </>
        )
      }
      return(
        <></>
      );
  
}

export default PatientDashboard;