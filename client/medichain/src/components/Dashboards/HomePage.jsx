// HomePage.js
import React, { useEffect, useState } from 'react';
import Navbar from './Navbar';
import { useStateContext} from '../../context';
import { CustomButton } from '../';
import { useNavigate } from 'react-router-dom';4
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { handleDecrypt } from '../login/keyFunctions';
// impor {Navbar}

function HomePage() {
    const { user, isAuthenticated, isLoading } = useAuth0();
    const [userName,setName] = useState("");

    const{ connect, address, patientDetails } = useStateContext();
    const navigate = useNavigate();
    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
          navigate('/');
        }
        
      }, [isAuthenticated, isLoading, navigate]);
    // You can fetch patient data from your backend here
    const [patientData, setData] = useState([]);

    const fetchData = async () => {
      try {
        const data = await patientDetails(); // Assuming patientDetails is an async function
        // console.log(data," DATATTATA");
        setData(data);
        // console.log(patientData[1]);
        const privKey = "-----BEGIN RSA PRIVATE KEY-----\n"+
        "MIIEowIBAAKCAQEAizNI2Cw6wQuK4V8dmEnVaJpS7S4YA0ugR8duqn+4qIsa6G6d\n"+
        "GIXtGolZpBenlA46574IXiTC69qHfa2Q1rMXWaI2ykjB2l7InjotwU2oxbPghSgY\n"+
        "YpExh5zH0o1LQqTYorg7X0dB/cyEqqRma2n8vMf8h2ojtIjVUxk237fXmvnhSiBa\n"+
        "UYD4RvQ9QOf8NDHfnBbe+4DyfKgdyGmKuM7+qh89+z4l00ExawW6yr9yP/lKtkp5\n"+
        "JjiNvT4sSI150pvLSoX5A9YZ1UrVNy6jZ4detENx6ry6iDRw/xbwMcsIFQsnlcv/\n"+
        "0y1r0+QVKmgUFpB7gawBRXSSgS6oJ9w0oJkbWQIDAQABAoIBAENv1wyTcOtxMhk5\n"+
        "QVcz/eWtThuFxzBhhQcBQUXsloNg0OpmHElzKIlAnWL36sG5myQGVnt1h9FHj3h9\n"+
        "i7vYC6nrAmxBj1jBrqOpP910SB1vpYgdAqNOABbZB52jwiBJSIKcincASKIyYNti\n"+
        "xhOnxz+WC2t3KlEeMWsOvhzoLdXwGKNRbIcziZKrXh0ST00ySne/Gz8oVNhdUuO1\n"+
        "KaKRXLPoGdxoARQh8VGJQsVSCCpYObmFyxJ/+9CRlMQpnJvzyTBlsLWhhfu+mOJ2\n"+
        "kn1RMPL80w0OsW7xjrdAIlgBr1F/qPhO3Ngq5CWP5Mq9a7DLuTWhpsjx82Hb7m7t\n"+
        "uL8FfTkCgYEA8RKhW3jCpyD+IJG/Y8EuD9QKd+bl50sqxYIMFsYTyjffHuMAo4du\n"+
        "W6fae/AMB7yhQtbIkLK1u5T5DAgCZoaIHGKuPDT2FvWK9FnIZKBmFiYLNlp4uJhd\n"+
        "YhPnFz4l+1qS+Pqxjl32KqFpZ0XZEq6OqMyCjwVV4vtMTVkLBafw9O8CgYEAk9HS\n"+
        "PTNnNtx72so27bH5WT0w52SPyar3Hj7JESFcDSMU35pD4gTYSj6b0Yw1jpFWi+5I\n"+
        "Yb+d/ZzE3YI8yytOQn06DHnXQgd+0jKhLZKDdM3GJBnnKpPI82a4oZ9SXHIasily\n"+
        "3mmwGasysKUuiVB3yNwhp3H92bnpgyXtrkOLRDcCgYBvqJRqPMXUCVkLltZSCwEd\n"+
        "vbXXkW/9MHiwIKsexUIXUMeck8IQ/EKmW1m8PBQmZT1AKyGcu9mm97pe0zrhaACV\n"+
        "PTO8mT8+pR5mTUufKBgAvEBHPaJaxd/C9Lr9rgCDqpEWl280JNtHJZofhl+j4owb\n"+
        "LRZvziXYy1KtJMgRJ5dYqwKBgEwo4O9TWqxzcQTLBv30oooN8vJlZ4f6JBRbOPEw\n"+
        "hOLn3ktOigcbg+zM0S9n0/g+fZ7fCEAEn/wZF30hKv1qtImhR5VB+Vw1zGu0VkLK\n"+
        "qBw4IQxcpDPVrMVreVkcYyzqRULiBCL/xRGUmStWD+IDqZO9h0Fkg+v3044Urp8I\n"+
        "geqFAoGBAIpjUQjvwtqlQ5umg2K/BqQIZH0XYaw3THE8gPG/dGysOvmfL5rIGEe4\n"+
        "OLYWNtk/w3lDcpcsqiDZfVLsyPH7apwxoyAIO0c7WCyxGQLw8e9CQ5tRp8vzkqAF\n"+
        "Y4LIb1LI24OETUUtGVXAiWej5cVvSgmjNbB1Z3fjnkvNJrpAethT\n"+
        "-----END RSA PRIVATE KEY-----"

      const ret = handleDecrypt(patientData[1],privKey);
      // const ret2 = handleDecrypt(patien],privKey);
      console.log("Decrypted",ret);
      // console.log("Decrypted",ret2);
        // setPatientData(data); // Update state with the fetched data
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // useEffect(()=>{
      fetchData();
    // },[address])
    useEffect(() => {
      // console.log(patientData[1]);
      
    }, [patientData]);
    // console.log(patientData);
    
  return (
    <>    
    <div className=" bg-cover bg-center" style={{ backgroundImage: 'url("/background-image.jpg")' }}>
      <div className="bg-opacity-50 h-full flex items-center">
        <div className="container mx-auto text-white text-center">
            {
                address ?(
                    <>
                    <h1 className="text-4xl font-semibold mb-4">Welcome, {address}</h1>
                    <div className="mb-4">
                        {/* <p>Age: {patientData.age}</p> */}
                        {/* <p>Email: {patientData.email}</p> */}
                        {/* Display other patient details */}
                    </div>
                    </>
                ) : (
                    <h1 className="text-4xl font-semibold mb-4">Kindly connect your metamask wallet to proceed</h1>
                )
            }
          
          
          {/* Add any other content or buttons as needed */}
        </div>
      </div>
    </div>
    </>
  );
}

export default HomePage;
