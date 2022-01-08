// SPDX-License-Identifier: MIT
pragma solidity 0.8.11;

contract Notice {

    uint256 sz;
    struct Info {
        uint256 id;
        address sender;
        string content;
        string ipfs;
    } 

    mapping (uint256=> Info) public infos;
    uint256[] public info_arr;


    constructor() { 
        sz = 0; 
    }
    
    function seeNotices() public view returns (Info[] memory) {
        Info[] memory temp = new Info[](sz);
        for(uint256 i = 0;i<sz;i++)
        {
            Info memory val = infos[info_arr[i]];
            temp[i] = val;
        }
        return temp;
    }


        
    function newInfo (string memory _content, string memory _ipfs) public{
        Info storage info = infos[sz];
        info.id = sz;
        info.sender = msg.sender;
        info.content = _content;
        info.ipfs = _ipfs;
        info_arr.push(sz);
        sz++;
    }

}