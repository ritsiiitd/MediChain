// Navbar.js
import React from 'react';
import { useStateContext} from '../../context';
import { CustomButton } from '../';
import { useNavigate } from 'react-router-dom';4
import {BrowserRouter, Link, Route, Routes} from 'react-router-dom';
function Navbar() {
  const navigate = useNavigate;
  const{ connect, address, registerPatient } = useStateContext();
  return (
   
      <header className='w-[100%] flex justify-between items-center bg-[#002626] sm:px-8 px-4'>
        <Link to="/">
            <img alt="logo" className='w-[170px] mt-1.6 object-contain'/>
        </Link>
        <div className='flex flex-row gap-1'>
        <CustomButton
            btnType="button"
            title={address ? 'Wallet connected' : 'Connect'}
            styles={address ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
            handleClick={()=>{
              if(address) <>'Do nothing'</>
              else connect();
            }}
          />

        <Link to="/shareEHR" className="object-contain mt-3 mb-2 font-inter font-medium font-semibold text-white bg-[#E55812] px-4 py-2 rounded-md">
          Share
        </Link>
        <Link to="/updateEHR" className="object-contain mt-3 mb-2 font-inter font-medium font-semibold text-white bg-[#E55812] px-4 py-2 rounded-md">
          Update
        </Link>
        </div>

      </header>
  );
}

export default Navbar;
