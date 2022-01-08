// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;
import "./ERC20.sol";
import "./IERC20.sol";
import "./Ownable.sol";
import "./Coin.sol";

contract Insurance {

    uint256 sz;
    struct Claim {
        uint256 id;
        uint256 cost;
        bool insurance_sign;
        string cause;
        string date;
        address farmer_address;
        address insurance_address;
        string ipfs;
        string farmer_location;
        uint256 inr;
        Farmer farmer;
    }

    struct Farmer{
        string farmer_name;
        uint256 farmer_age;
        string farmer_sex;
    }



    constructor() {
        sz = 0;    
    }
    
    mapping(address => uint256) public addressToAmountFunded;
    mapping (uint256=> Claim) public _claims;
    mapping(address => Claim[] ) public _claimsByFarmer;
    mapping(address => uint256) public _claimsByFarmersize;
    mapping(uint256 => uint256) public arr_to_farmer;
    uint256[] public claimsarr;

    event recordCreated(uint256 id); 
    
    function newClaim (string memory name, uint256 age , string memory sex, uint256 _cost, string memory _cause, string memory _date,string memory location, string memory _ipfs, uint256 _inr) public{
        Claim storage _here = _claims[sz];
        Farmer memory _farmer = Farmer({
            farmer_name: name,
            farmer_age: age,
            farmer_sex : sex
        });
        _here.farmer_address = msg.sender;
        _here.id = sz;
        _here.cause = _cause;
        _here.date = _date;
        _here.farmer_location = location;
        _here.cost = _cost;
        _here.insurance_sign = false;
        _here.ipfs = _ipfs;
        _here.farmer = _farmer;
        _here.inr = _inr;
        claimsarr.push(sz);
        _claimsByFarmer[msg.sender].push(_here);
        arr_to_farmer[sz] = _claimsByFarmersize[msg.sender];
        _claimsByFarmersize[msg.sender]++;
        sz++;
        emit recordCreated(_here.id);
    }

    function signInsurance(uint256 id) public{
        Claim storage temp = _claims[id];
        temp.insurance_sign = true;
        temp.insurance_address = msg.sender;
        uint256 here = arr_to_farmer[id];
        _claimsByFarmer[temp.farmer_address][here].insurance_address = msg.sender;
        _claimsByFarmer[temp.farmer_address][here].insurance_sign = true;
    }

    function seeClaimsInsurance () public view returns (Claim[] memory){
        uint256 cnt = 0;
        for(uint256 i = 0;i<sz;i++)
        {
            Claim memory val = _claims[claimsarr[i]];
            if (!val.insurance_sign)
            {
                cnt++;
            }
        }
        Claim[] memory temp = new Claim[](cnt);
        cnt = 0;
        for(uint256 i = 0;i<sz;i++)
        {
            Claim memory val = _claims[claimsarr[i]];
            if (!val.insurance_sign)
            {
                temp[cnt++] = val;
            }
        }
        return temp;
    }



}