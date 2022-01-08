// SPDX-License-Identifier: MIT
pragma solidity ^0.8.11;
import "./ERC20.sol";
import "./IERC20.sol";
import "./Ownable.sol";
import "@chainlink/contracts/src/v0.8/ChainlinkClient.sol";

/**
 * Request testnet LINK and ETH here: https://faucets.chain.link/
 * Find information on LINK Token Contracts and get the latest ETH and LINK faucets here: https://docs.chain.link/docs/link-token-contracts/
 */

/**
 * THIS IS AN EXAMPLE CONTRACT WHICH USES HARDCODED VALUES FOR CLARITY.
 * PLEASE DO NOT USE THIS CODE IN PRODUCTION.
 */
contract TerraCoin is ERC20, ChainlinkClient, Ownable {
    using Chainlink for Chainlink.Request;
    address current_owner;
    
    uint256 public volume;
    uint256 public amount_of_tokens;
    address private oracle;
    bytes32 private jobId;
    uint256 private fee;

    mapping(bytes32 => address) public id_to_sender;
    mapping(address => uint256) public eth_for_address;

    
    /**
     * Network: Kovan
     * Oracle: 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8 (Chainlink Devrel   
     * Node)
     * Job ID: d5270d1c311941d0b08bead21fea7747
     * Fee: 0.1 LINK
     */
    constructor() ERC20() {
        uint256 initialSupply = 10000000000;
        _mint(msg.sender, initialSupply);
        _approve(msg.sender, address(this), initialSupply);
        current_owner = msg.sender;
        setPublicChainlinkToken();
        oracle = 0xc57B33452b4F7BB189bB5AfaE9cc4aBa1f7a4FD8;
        jobId = "d5270d1c311941d0b08bead21fea7747";
        fee = 0.1 * 10 ** 18; // (Varies by network and job)
    }
    
    function payUser() public payable {
        bytes32 requestId = requestVolumeData();
        id_to_sender[requestId] = msg.sender;
        eth_for_address[msg.sender] = msg.value;
    }
    /**
     * Create a Chainlink request to retrieve API response, find the target
     * data, then multiply by 1000000000000000000 (to remove decimal places from data).
     */
    function requestVolumeData() public returns (bytes32 requestId) 
    {
        Chainlink.Request memory request = buildChainlinkRequest(jobId, address(this), this.fulfill.selector);
        
        // Set the URL to perform the GET request on
        request.add("get", "https://min-api.cryptocompare.com/data/pricemultifull?fsyms=INR&tsyms=ETH");
        
        // Set the path to find the desired data in the API response, where the response format is:
        // {"RAW":
        //   {"ETH":
        //    {"USD":
        //     {
        //      "VOLUME24HOUR": xxx.xxx,
        //     }
        //    }
        //   }
        //  }
        request.add("path", "RAW.INR.ETH.OPEN24HOUR");
        
        // Multiply the result by 1000000000000000000 to remove decimals
        int timesAmount = 10**18;
        request.addInt("times", timesAmount);
        
        // Sends the request
        return sendChainlinkRequestTo(oracle, request, fee);
    }
    
    /**
     * Receive the response in the form of uint256
     */ 
    function fulfill(bytes32 _requestId, uint256 _volume) public recordChainlinkFulfillment(_requestId)
    {
        volume = _volume;
        uint256 eth = eth_for_address[
            id_to_sender[_requestId]
        ];

        require(eth > 0, "Insufficient ETH");

        amount_of_tokens = eth / (20*_volume);

        IERC20 paymentToken = IERC20(address(this));
        
        require(amount_of_tokens > 0, "Tokens too less!");
        approve(current_owner, id_to_sender[_requestId], amount_of_tokens);
        require(
            paymentToken.transferFrom(
                current_owner,
                id_to_sender[_requestId],
                amount_of_tokens
            ),
            "transfer Failed"
        );

        eth_for_address[id_to_sender[_requestId]] = 0;
    }

    // function withdrawLink() external {} - Implement a withdraw function to avoid locking your LINK in the contract
}

