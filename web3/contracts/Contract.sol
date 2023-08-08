// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract crowdFundingDapp {
    struct Doc{
        address owner;
        string ownerName;
        string ipfsUrl;
    }

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
        Doc[] records;
        address[] sharedWith;
    }

    struct Doctor{
        address owner;
        string name;
        string uname;
        string email;
        string hashedPhone;
        string hashedAadhar;
        Patient[] patients;
        Doc[] sharedWithMe;
    }

    struct Campaign { //like an object in JS
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string image;
        address[] donators;
        uint256[] donations;
    }

    mapping(uint256 => Campaign) public campaigns;//this will allow campaigns to be indexed like campaigns[0]
    mapping(address => Patient) public patients;//this will allow campaigns to be indexed like campaigns[0]
    // mapping(address => Patient) public patients;//this will allow campaigns to be indexed like campaigns[0]
    mapping(address => Doctor) public doctors;//this will allow campaigns to be indexed like campaigns[0]

    //global variables

    uint256 public numberOfCampaigns = 0;
    uint256 public numberOfPatients = 0;
    uint256 public numberOfDoctors = 0;

    function registerPatient(address _owner, uint256 _age, string memory _name, string memory _uname, string memory _email, string memory _hashedPhone, string memory _hashedAadhar) public returns(uint256){
        Patient storage patient = Patient("","");
        require(patient.age < 0, " negative age patient? can't do this");
        patient.owner = _owner;
        patient.name = _name;
        patient.uname = _uname;
        patient.age = _age;
        patient.email = _email;
        patient.hashedPhone = _hashedPhone;
        patient.hashedAadhar = _hashedAadhar;

        numberOfPatients++;
        return numberOfPatients-1;
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

    //creates a campaign and returns the id of newly created campaign
    function createCampaign(address _owner, string memory _title, string memory _description, uint256 _target, uint256 _deadline, string memory _image) public returns (uint256){
        Campaign storage campaign = campaigns[numberOfCampaigns];

        //check to se if everything is good
        require(campaign.deadline < block.timestamp, " The deadline should be something in future!");

        campaign.owner = _owner;
        campaign.target = _target;
        campaign.description = _description;
        campaign.title = _title;
        campaign.deadline = _deadline;
        campaign.amountCollected = 0;
        campaign.image = _image;

        numberOfCampaigns++;

        return numberOfCampaigns-1;
    }

    //payable means we will send some cryptocurrency throughout this function
    function donateToCampaign(uint256 _id) public payable{
        uint256 amount = msg.value;//will send from frontend

        Campaign storage campaign = campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(amount);

        (bool sent,) = payable(campaign.owner).call{value: amount}("");

        if(sent){
            campaign.amountCollected = campaign.amountCollected + amount;
        }
    }

    // view means only returns some data
    function getDonators(uint256 _id) view  public returns (address[] memory, uint256[] memory){
        return(campaigns[_id].donators, campaigns[_id].donations);
    }

    function getCampaigns()public view returns(Campaign[] memory){
        Campaign[] memory allCampaigns = new Campaign[](numberOfCampaigns);
        for(uint i=0;i<numberOfCampaigns;i++){
            Campaign storage item = campaigns[i];
            allCampaigns[i] = item;
        }
        return allCampaigns;
    }

}