// ShareEHR.js
import React, { useEffect, useState } from 'react';
import { useStateContext} from '../../context';
function ShareEHR() {
  const{ registerPatient,shareWithD} = useStateContext();
  const [privateKey, setPrivateKey] = useState('');
  const [docaddress, setDocAddress] = useState('');
  const [sh, setsh] = useState(false);
  const [sharedDoctors, setSharedDoctors] = useState([]); // Fetch this data from the backend
  const [allDoctors, setAllDoctors] = useState([]); // Fetch this data from the backend

  const handlePrivateKeyChange = (e) => {
    setPrivateKey(e.target.value);
  };
  const handleAddressChange = (e) => {
    setDocAddress(e.target.value);
  };

  const getSharedDoctors = async ()=>{
    // const alld = await getDoctors();
    // setAllDoctors(alld);
  }
  const handleRevokeClick = (doctorId) => {
    // Implement the logic to revoke sharing with the doctor
  };
  

    const share = async(e) => {
      e.preventDefault();
      // useEffect(() => {
      //   console.log("encFormData updated:");
      //   shareEHRwithDoc({privateKey,docaddress});
      // }, [privateKey, docaddress]);
      await shareWithD({privateKey,docaddress});
  };
  

  return (
    <div className="container mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Share EHR</h2>
      <div className="mb-4">
      <form onSubmit={share} >

        <label htmlFor="privateKey" className="block font-semibold">Enter Private Key:</label>
        <input
          type="text"
          id="privateKey"
          value={privateKey}
          required
          onChange={handlePrivateKeyChange}
          className="border p-2 w-full"
          />
        <label htmlFor="Doctor Address" className="block font-semibold">Enter doctor's address:</label>
        <input
          type="text"
          id="docaddress"
          value={docaddress}
          required
          onChange={handleAddressChange}
          className="border p-2 w-full"
          />
        <button type="submit">Share</button>
        </form>
      </div>
      {/* Display shared doctors and buttons to revoke */}
      <div>
        <h3 className="text-xl font-semibold mb-2">Shared Doctors</h3>
        <ul>
          {sharedDoctors.map((doctor) => (
            <li key={doctor.id} className="flex justify-between items-center mb-2">
              <span>{doctor.name}</span>
              <button onClick={() => handleRevokeClick(doctor.id)} className="text-red-500">Revoke</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default ShareEHR;
