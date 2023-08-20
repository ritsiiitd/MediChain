import React, { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { CustomButton } from '../';
import { useStateContext} from '../../context';
import { handleGenerateKeys,handleEncrypt,handleDecrypt } from './keyFunctions'
import fs from 'fs';
import {saveAs} from 'file-saver';
// import { log } from 'console';
const Signup = () => {
  function generateRandomString(length) {
    const characters = "abcdefghijklmnopqrstuvwxyz";
    let randomString = "";
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
    }
  
    return randomString;
  }

    const navigate = useNavigate();
    const{ connect, address, registerPatient, registerDoctor } = useStateContext();
    const [ keyGenerated, setKeyGenerated ] = useState(false);
    const [ privateKey, setPrivateKey ] = useState('idk');
    const [publicKey, setPublicKey ] = useState('idk');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        uname:'',
        phoneNumber: '',
        aadharId: '',
        age: 0,
        dp: '',
        password: '',
      });
    const [encFormData, setEncFormData] = useState({
        name: '',
        email: '',
        uname:'',
        phoneNumber: '',
        aadharId: '',
        age: 0,
        myPublicKey:''
      });
    const [docencFormData, setDocEncFormData] = useState({
        name: '',
        email: '',
        uname:'',
        phoneNumber: '',
        aadharId: '',
        myPublicKey:''
      });
    
    const [loading, setLoading] = useState(false);
    
    const webAuth = new auth0.WebAuth({
      domain:'dev-e8yp6sp464fgsn24.us.auth0.com',
      clientID:'R8fkPduEfZJzTI3MDh9StZ4fYC45RCdL'
    });

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
        ...prevData,
        [name]: value,
    }));
    };

    const updform = async (keys) => {
      try {
        const encryptedName = await handleEncrypt(formData.name, keys[0]);
        const encryptedUname = await handleEncrypt(formData.uname, keys[0]);
        const encryptedEmail = await handleEncrypt(formData.email, keys[0]);
        const encryptedPhoneNumber = await handleEncrypt(formData.phoneNumber, keys[0]);
        const encryptedAadharId = await handleEncrypt(formData.aadharId, keys[0]);
        
        setEncFormData({
          name: encryptedName,
          uname: encryptedUname,
          email: encryptedEmail,
          phoneNumber: encryptedPhoneNumber,
          aadharId: encryptedAadharId,
          age: formData.age,
          myPublicKey: keys[0]
        });
        
        setPrivateKey(keys[1]);
        setPublicKey(keys[0]);
      } catch (error) {
        console.error('Error updating encFormData:', error);
      }
    };

    useEffect(() => {
      console.log("encFormData updated:", encFormData);
      registerPatient({...encFormData});
    }, [encFormData]);

    const updform2 = async (keys) => {
      try {
        const encryptedName =formData.name;
        const encryptedUname = formData.uname;
        const encryptedEmail = formData.email;
        const encryptedPhoneNumber = formData.phoneNumber;
        const encryptedAadharId = formData.aadharId;
        
        setDocEncFormData({
          name: encryptedName,
          uname: encryptedUname,
          email: encryptedEmail,
          phoneNumber: encryptedPhoneNumber,
          aadharId: encryptedAadharId,
          myPublicKey: keys[0]
        });
        
        setPrivateKey(keys[1]);
        setPublicKey(keys[0]);
      } catch (error) {
        console.error('Error updating encFormData:', error);
      }
    };

    useEffect(() => {
      console.log("docencFormData updated:", docencFormData);
      registerDoctor({...docencFormData});
    }, [docencFormData]);

   

    const manageBlockchain = async (usname)=>{
        setFormData({
          uname:usname,
        });
        const keys =  await handleGenerateKeys();
        console.log(keys[0]);
        await updform(keys);

        setKeyGenerated(true);      
      // console.log("now calling smart contract context");
       
    }
    const manageBlockchain2 = async (usname)=>{
        setFormData({
          uname:usname,
        });
        const keys =  await handleGenerateKeys();
        console.log(keys[0]);
        await updform2(keys);

        setKeyGenerated(true);      
      // console.log("now calling smart contract context");
       
    }

    const handleDownloadClick = async () => {
      const blob = new Blob([privateKey], { type: 'text/plain;charset=utf-8' });
      saveAs(blob, 'privateKey.txt');
      // setTimeout(() => {
      //   console.alert("generating key....");
      // }, 2000); // 2000 milliseconds = 2 seconds
      navigate('/');
    };

    const handleSignup = async (e) => {
      e.preventDefault();
      console.log("trying to sign up");
      try {
        const email = formData.email;
        const password = formData.password;
        const usname = email.split("@")[0].substring(0,5)+generateRandomString(5);
        // Signup with Auth0
        setLoading(true);
        
        await webAuth.signup({ 
          connection: 'Username-Password-Authentication', 
          email: email, 
          password: password,
          username: usname,
          picture: formData.dp,
          user_metadata: { type: 'patient'}
        }, async function (err) { 
          
          // Store the public key in state
          
          

        if (err) {
          return alert('Something went wrong: make sure all details are valid \n Your email might be registered already or image URL might be incorrect'); 
          console.log(err);
        }
          await manageBlockchain(usname);
          return alert('your private key is generated keep it with you safely, you will not see this again. Successful signup') 
      });

        console.log("got responsee");
 
        console.log('User signed up successfully.');
      } catch (error) {
        console.log('Error signing up:', error);
      }
      finally{
        setLoading(false);
        // navigate('/');
      }
    };
    const handleSignup2 = async (e) => {
      e.preventDefault();
      console.log("trying to sign up");
      try {
        const email = formData.email;
        const password = formData.password;
        const usname = email.split("@")[0].substring(0,5)+generateRandomString(5);
        // Signup with Auth0
        setLoading(true);
        
        await webAuth.signup({ 
          connection: 'Username-Password-Authentication', 
          email: email, 
          password: password,
          username: usname,
          picture: formData.dp,
          user_metadata: { type: 'doctor'}
        }, async function (err) { 
          
          // Store the public key in state

        if (err) {
          return alert('Something went wrong: make sure all details are valid \n Your email might be registered already or image URL might be incorrect'); 
          console.log(err);
        }
          await manageBlockchain2(usname);
          return alert('your private key is generated keep it with you safely, you will not see this again. Successful signup') 
      });

        console.log("got responsee");
 
        console.log('User signed up successfully.');
      } catch (error) {
        console.log('Error signing up:', error);
      }
      finally{
        setLoading(false);
        // navigate('/');
      }
    };
  
    return (
      <div>
      <h2>Sign Up</h2>
      <form>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Phone Number:</label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Aadhar ID:</label>
          <input
            type="text"
            name="aadharId"
            value={formData.aadharId}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Age:</label>
          <input
            type="number"
            name="age"
            value={formData.age}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Profile picture URL:</label>
          <input
            type="string"
            name="dp"
            value={formData.dp}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <CustomButton
          btnType="button"
          title={address ? 'Wallet connected' : 'Connect'}
          styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
          handleClick={()=>{
            if(address) <>'Do nothing'</>
            else connect();
          }}
        />
        <button type="submit" onClick={handleSignup} disabled={loading  || !address}>
          {loading ? 'Signing Up...' : 'Sign Up as Patient'}
        </button>
        <button type="submit" onClick={handleSignup2} disabled={loading  || !address}>
          {loading ? 'Signing Up...' : 'Sign Up as Doctor'}
        </button>
        {
          keyGenerated && <div>
          <h2>Private Key, you will need this to manage your EHR</h2>
          <p>Click the link below to download your private key file:</p>
          <a href="#" onClick={()=>handleDownloadClick()}>Download Private Key</a>
        </div>
        }
      </form>
    </div>
  );
}

export default Signup
