// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract MediChain {
    // struct Document{
    //     address owner;
    //     string ownerName;
    //     string ipfsUrl;
    // }


//double encryption
    struct sharedEHR{
        address owner;
        address receiver;
        string name;
        string email;
        uint256 age;
        string hashedPhone;
        string[] diseases;
        string[] medications;
        string[] allergies;
        string[] docs;
    }

// single encryption
    struct Patient{
        address owner;
        string name;
        uint256 age;
        string uname;
        string email;
        string hashedPhone;
        string hashedAadhar;
        string[] diseases;
        string[] medications;
        string[] allergies;
        string[] docs;
        address[] sharedWith;
        string publicKey;
    }

    struct Keys{
        address owner;
        address sendTo;
        string decryptKey;
    }

    struct Doctor{
        address owner;
        string name;
        string uname;
        string email;
        string hashedPhone;
        string hashedAadhar;
        address []myPatients;
        string publicKey;
    }

    // mapping(uint256 => Campaign) public campaigns;//this will allow campaigns to be indexed like campaigns[0]
    mapping(address => Patient) public patients;//this will allow campaigns to be indexed like campaigns[0]
    mapping(address => sharedEHR) public EHRs;//this will allow campaigns to be indexed like campaigns[0]
    // mapping(address => Document) public documents;//this will allow campaigns to be indexed like campaigns[0]
    mapping(address => Patient) public keys;//this will allow campaigns to be indexed like campaigns[0]
    // mapping(address => Document) public documents;//this will allow campaigns to be indexed like campaigns[0]
    // mapping(address => Patient) public patients;//this will allow campaigns to be indexed like campaigns[0]
    mapping(address => Doctor) public doctors;//this will allow campaigns to be indexed like campaigns[0]

    //global variables
    Patient[] public allPatients;
    Doctor[] public allDoctors;
    sharedEHR[] public allEHRs;

    uint256 public numberOfCampaigns = 0;
    uint256 public numberOfPatients = 0;
    uint256 public numberOfDoctors = 0;
    uint256 public numberOfEHRs = 0;

    function registerPatient(address _owner, uint256 _age, string memory _name, string memory _uname, string memory _email, string memory _hashedPhone, string memory _hashedAadhar, string memory _publicKey) public returns(uint256){
        // Patient storage patient = Patient("","")
        Patient storage patient=patients[_owner];
        // require(patient.age < 0, " negative age patient? can't do this");
        patient.owner = _owner;
        patient.name = _name;
        patient.uname = _uname;
        patient.age = _age;
        patient.email = _email;
        patient.hashedPhone = _hashedPhone;
        patient.hashedAadhar = _hashedAadhar;
        patient.publicKey = _publicKey;
        allPatients.push(patient);
        numberOfPatients++;
        return numberOfPatients-1;
    }
    function registerDoctor(address _owner, string memory _name, string memory _uname, string memory _email, string memory _hashedPhone, string memory _hashedAadhar, string memory _publicKey) public returns(uint256){
        // Patient storage patient = Patient("","")
        Doctor storage doctor=doctors[_owner];
        // require(patient.age < 0, " negative age patient? can't do this");
        doctor.owner = _owner;
        doctor.name = _name;
        doctor.uname = _uname;
        // patient.age = _age;
        doctor.email = _email;
        doctor.hashedPhone = _hashedPhone;
        doctor.hashedAadhar = _hashedAadhar;
        doctor.publicKey = _publicKey;
        allDoctors.push(doctor);
        numberOfDoctors++;
        return numberOfDoctors-1;
    }

    function addMedicine(address _owner, string memory _med) public returns(address){
        patients[_owner].medications.push(_med);
        return _owner;
    }
    function getMedicines(address _owner) view public returns(string[] memory){
        string[] memory names = new string[](patients[_owner].medications.length);
        for (uint256 i = 0; i < patients[_owner].medications.length; i++) {
            names[i] = patients[_owner].medications[i];
        }
        return names;
    }
    function addDisease(address _owner, string memory _dis) public returns(address){
        patients[_owner].diseases.push(_dis);
        return _owner;
    }
    function getDiseases(address _owner) view public returns(string[] memory){
        string[] memory names = new string[](patients[_owner].diseases.length);
        for (uint256 i = 0; i < patients[_owner].diseases.length; i++) {
            names[i] = patients[_owner].diseases[i];
        }
        return names;
    }
    function addAllergies(address _owner, string memory _al) public returns(address){
        patients[_owner].allergies.push(_al);
        return _owner;
    }
    function getAllergies(address _owner) view public returns(string[] memory){
        string[] memory names = new string[](patients[_owner].allergies.length);
        for (uint256 i = 0; i < patients[_owner].allergies.length; i++) {
            names[i] = patients[_owner].allergies[i];
        }
        return names;
    }

    function addDocument(address _owner, string memory _doc) public returns(address){
        patients[_owner].docs.push(_doc);
        return _owner;
    }
    function deleteDocument(address _owner, uint256 _index) public returns(address){
        // require(_index < EHRs[_owner].docs.length, "Invalid index");
        
        // Remove the EHR at the specified index
        for (uint256 i = _index; i < patients[_owner].docs.length - 1; i++) {
            patients[_owner].docs[i] = patients[_owner].docs[i + 1];
        }
        patients[_owner].docs.pop();
        return _owner;
    }

    function getPatients()public view returns(Patient[] memory){
        return allPatients;
    }
    function getDoctors()public view returns(Doctor[] memory){
        return allDoctors;
    }
    function getEHRs()public view returns(sharedEHR[] memory){
        return allEHRs;
    }
    function getPatientDocs(address _owner)public view returns(string[] memory){
        string[] memory names = new string[](patients[_owner].docs.length);
        for (uint256 i = 0; i < patients[_owner].docs.length; i++) {
            names[i] = patients[_owner].docs[i];
        }
        return names;
    }

    function grantAccess(address _owner,address _receiver,string memory _name,string memory _email,uint256 _age,string memory _hashedPhone,string[] memory _diseases,string[] memory _medications, string[] memory _allergies, string[] memory _docs) public {
        sharedEHR storage shared = EHRs[_owner];
        shared.owner= _owner;
        shared.receiver= _receiver;
        shared.name= _name;
        shared.age= _age;
        shared.email= _email;
        shared.hashedPhone= _hashedPhone;
        shared.diseases= _diseases;
        shared.medications= _medications;
        shared.allergies= _allergies;
        shared.docs= _docs;
        allEHRs.push(shared);
    }
    
    function deleteEHR(address _owner, address _receiver) public {
        uint256 indexToDelete = 0;
        bool found = false;
        
        // Search for the EHR in the allEHRs array
        for (uint256 i = 0; i < allEHRs.length; i++) {
            if (allEHRs[i].owner == _owner && allEHRs[i].receiver == _receiver) {
                indexToDelete = i;
                found = true;
                break;
            }
        }

        // If the EHR is found, delete it from allEHRs and EHRs mapping
        if (found) {
            // Delete from allEHRs array
            for (uint256 i = indexToDelete; i < allEHRs.length - 1; i++) {
                allEHRs[i] = allEHRs[i + 1];
            }
            allEHRs.pop();

            // Delete from EHRs mapping
            delete EHRs[_owner];
        }
    }

    function getPatientEHRs(address _patient) public view returns (sharedEHR[] memory) {
        sharedEHR[] memory patientEHRs = new sharedEHR[](allEHRs.length);
        uint256 count = 0;
        
        // Iterate through allEHRs to find EHRs owned by the specified patient
        for (uint256 i = 0; i < allEHRs.length; i++) {
            if (allEHRs[i].owner == _patient) {
                patientEHRs[count] = allEHRs[i];
                count++;
            }
        }

        // Resize the patientEHRs array to remove empty slots
        assembly {
            mstore(patientEHRs, count)
        }

        return patientEHRs;
    }

    function getSharedEHRsWithReceiver(address _receiver) public view returns (sharedEHR[] memory) {
        sharedEHR[] memory sharedEHRs = new sharedEHR[](allEHRs.length);
        uint256 count = 0;

        // Iterate through allEHRs to find EHRs shared with the specified receiver
        for (uint256 i = 0; i < allEHRs.length; i++) {
            if (allEHRs[i].receiver == _receiver) {
                sharedEHRs[count] = allEHRs[i];
                count++;
            }
        }

        // Resize the sharedEHRs array to remove empty slots
        assembly {
            mstore(sharedEHRs, count)
        }

        return sharedEHRs;
    }
}