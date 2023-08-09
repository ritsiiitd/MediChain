import React, { useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import { CustomButton } from '../';
import { useStateContext} from '../../context';
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
    // const { signup } = useAuth0();
    // const history = useHistory();
    const navigate = useNavigate();
    const{ connect, address } = useStateContext();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: '',
        aadharId: '',
        age: '',
        dp: '',
        password: '',
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

    const handleSignup = async (e) => {
      e.preventDefault();
      console.log("trying to sign up");
      try {
        const email = formData.email;
        const password = formData.password;
  
        // Signup with Auth0
        setLoading(true);
        await webAuth.signup({ 
          connection: 'Username-Password-Authentication', 
          email: email, 
          password: password,
          username: email.split("@")[0].substring(0,5)+generateRandomString(5),
          picture: formData.dp,
          user_metadata: { type: 'patient'}
        }, function (err) { 
          if (err) {
            return alert('Something went wrong: make sure all details are valid'); 
            console.log(err);
          }
            return alert('success signup') 
        });
        console.log("got responsee");
  //SAVE INFO ON BLOCKCHAIN
        // After successful Auth0 signup, navigate to a new page
        // history.push('/dashboard'); // Change '/dashboard' to the desired route
  
        console.log('User signed up successfully.');
      } catch (error) {
        console.log('Error signing up:', error);
      }
      finally{
        setLoading(false);
        navigate('/');
      }
    };
  
    return (
      <div>
      <h2>Sign Up</h2>
      <form onSubmit={handleSignup}>
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
            if(address) navigate('create-campaign')
            else connect();
          }}
        />
        <button type="submit" disabled={loading  || !address}>
          {loading ? 'Signing Up...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
}

export default Signup
