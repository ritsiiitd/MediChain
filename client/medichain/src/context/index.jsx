//here comes the logic for interaction btw front end and smart contract_
import React, { useContext, createContext, useState } from 'react';
import { useAddress, useContract, useMetamask, useContractWrite, useContractRead } from "@thirdweb-dev/react";
import { ethers } from 'ethers';

import {handleDecrypt} from '../components/login/keyFunctions'
const StateContext = createContext();

//it is a regular react funtional component but it has children inside of props, so we can get those children
//that allows us to wrap entire application with the context provider but still render all of the children inside it
export const StateContextProvider = ({ children }) => {
    // const [patientData,setPatientData] = useState(null);
    const user = new ethers.providers.Web3Provider(window.ethereum);
    // const contract_ = new ethers.Contract("0x3F8df76F2FF3E427b1A66c67f3291F2C29b3D971",abi,user)
    const {contract} = useContract("0x18a674cfa613bebadB8f9227F654E055a925f49a");
    console.log("contract_ is" ,contract);
    //how to call write functions of the contract_, but cann directly by contract_.func_name(parameters)
    // const { mutateAsync: createCampaign } = useContract_Write(contract, "createCampaign");
    // const cp = await contract__.getCampaigns();
    const address = useAddress();
    const connect = useMetamask(); //now we have all we need to interact w our smart contract_
    console.log("Address is",address);
    const pd = useContractRead(contract, "patients", [address]);
    const meds = useContractRead(contract, "getMedicines", [address]);
    const diseases = useContractRead(contract, "getDiseases", [address]);
    const allergies = useContractRead(contract, "getAllergies", [address]);
    const Pdocs = useContractRead(contract, "getPatientDocs", [address]);
    console.log("OUUCHH",diseases);
    console.log("Pehle hi lelo", pd.data);
    // setPatientData(pd);
    const { mutateAsync: registerPatient, isLoading } = useContractWrite(contract, "registerPatient");
    const { mutateAsync: grantAccess } = useContractWrite(contract, "grantAccess");

    const registeraPatient = async (form) => {
        console.log("Registering patient on blockchain");
        try {
            if(form.name===''){
                return;
            }
            // console.log(form.name);
            const data = await registerPatient({ args: [address, form.age, form.name, form.uname, form.email, form.phoneNumber, form.aadharId, form.myPublicKey] });
            console.log("contract call successs", data);
          } catch (err) {
            console.log("contract call failure", err);
          }
        }
    const shareWithDoc = async (form) => {
        console.log("got patient data", pd);
        try {
            if(form.privateKey==='' || form.docaddress===''){
                return;
            }
            // console.log(form.name);
            //need to create shared EHR, decrypt patient data
            const privateKey = form.privateKey;
            const owner = pd.data[0];
            const receiver = form.docaddress;
            const name = handleDecrypt(pd.data.name,privateKey);
            const email = handleDecrypt(pd.data.email,privateKey);
            const age = pd.data.age;
            const hashedPhone = handleDecrypt(pd.data.hashedPhone,privateKey);
            const publicKey = pd.data.publicKey;
            // const medications = meds;
            console.log("REACHHE",name);

            try {
                const data = await grantAccess({ args: [owner, receiver, name, email, age, hashedPhone, diseases.data, meds.data, allergies.data, Pdocs.data] });
                console.info("contract call successs access GRANTED", data);
              } catch (err) {
                console.error("contract call failure", err);
              }

            console.log("contract call successs");
          } catch (err) {
            console.log("contract call failure", err);
          }
        }
    const { mutateAsync: registerDoctor } = useContractWrite(contract, "registerDoctor");

    const registeraDoctor = async (form) => {
        console.log("Registering Doctor on blockchain");
        try {
            if(form.name===''){
                return;
            }
            // console.log(form.name);
            const data = await registerDoctor({ args: [address, form.name, form.uname, form.email, form.phoneNumber, form.aadharId, form.myPublicKey] });
            console.log("contract call successs", data);
          } catch (err) {
            console.log("contract call failure", err);
          }
        }
        

    const patientDetails = async()=>{
        const { data, isLoading } = useContractRead(contract, "patients", [address])
        // return data;
        // console.log("got data",data);
        return data;
    }

    const getDoctors=async()=>{
        // const { patient } = useContractRead(contract, "patients", [address])
        const { data, isLoading } = useContractRead(contract, "getPatientEHRs", [address])
    }

    const shareEHRwithDoc=async()=>{
        const { data, isLoading } = useContractRead(contract, "patients", [address]);
        console.log("trying",data);
    }

        return(
            //sharing this to all pages
            <StateContext.Provider
            value={{
                address,
                contract,
                connect,
                registerPatient: registeraPatient,
                registerDoctor: registeraDoctor,
                patientDetails,
                shareEHRwithDoc,
                shareWithD : shareWithDoc
            }}
            >
            {children}
        </StateContext.Provider>
    )
}

export const useStateContext = () => useContext(StateContext);

// we will wrap our entire application with this context