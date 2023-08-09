//here comes the logic for interaction btw front end and smart contract_
import React, { useContext, createContext } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from 'ethers';
const StateContext = createContext();

//it is a regular react funtional component but it has children inside of props, so we can get those children
//that allows us to wrap entire application with the context provider but still render all of the children inside it
export const StateContextProvider = ({ children }) => {
    const user = new ethers.providers.Web3Provider(window.ethereum);
    // const contract_ = new ethers.Contract("0x3F8df76F2FF3E427b1A66c67f3291F2C29b3D971",abi,user)
    const {contract} = useContract("0x11Dd57429753215fda3816cB1a2937073d0B0d57");
    console.log("contract_ is" ,contract);
    //how to call write functions of the contract_, but cann directly by contract_.func_name(parameters)
    // const { mutateAsync: createCampaign } = useContract_Write(contract, "createCampaign");
    // const cp = await contract__.getCampaigns();
    const address = useAddress();
    const connect = useMetamask(); //now we have all we need to interact w our smart contract_
    console.log("Address is",address);

    const { mutateAsync: registerPatient, isLoading } = useContractWrite(contract, "registerPatient");

    const registeraPatient = async (form) => {
        try {
            const data = await registerPatient({ args: [address, form._age, form._name, form._uname, form._email, form._hashedPhone, form._hashedAadhar] });
            console.log("contract call successs", data);
          } catch (err) {
            console.log("contract call failure", err);
          }
        }
        
        return(
            //sharing this to all pages
            <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                registerPatient: registeraPatient,
            }}
            >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

// we will wrap our entire application with this context