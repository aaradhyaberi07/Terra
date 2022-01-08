// SPDX-License-Identifier: MIT

pragma solidity ^0.8.0;

contract SupplyChain {

    uint256 public test=0;
    uint256 public currentProducts=0;
    uint256 public productsAtFarmer=0;
    uint256 public productsAtDistributor=0;
    uint256 public productsAtRetailer=0;
    uint256 public productsAtConsumer=0;

    function see() view public returns(uint256){
        return test;
    }
    function set(uint256 val) public {
        test = val;
    }

    enum State {
        NA,                      // 0
        EntryByFarmer,           // 1
        PurchasedByDistributor,  // 2
        ShippedByFarmer,         // 3
        ProcessedByDistributor,  // 4
        PurchasedByRetailer,     // 5
        ShippedByDistributor,    // 6
        ProcessedByRetailer,     // 7
        PurchasedByConsumer      // 8
    }

    State constant defaultState = State.NA;


    struct Item {
        // product specifics
        uint256 productCode;
        string productName;
        uint256 productUnits;
        string produceDate;

        // ownership history 
        address ownerID;
        address distributorID;
        address retailerID;
        address consumerID;
        address originFarmerID;

        // pricing specifics
        uint256 sourceCost; // farmer -> distributor
        uint256 wholesaleCost; // distributor -> outlet
        uint256 retailCost; // outlet -> consumer

        // state of item
        State itemState;
    }

    // maps product code to item
    mapping(uint256 => Item) Items;
    // maps address to item codes they own
    mapping(address => uint256[]) Owners;
    // maps address to number of products owned
    mapping(address => uint256) numberOwned;

    // events for item
    event ProduceByFarmer(uint256 code);         //1
    event PurchasedByDistributor(uint256 code);  //2
    event ShippedByFarmer(uint256 code);         //3
    event ProcessedByDistributor(uint256 code);  //5
    event PurchasedByRetailer(uint256 code);     //6
    event ShippedByDistributor(uint256 code);    //7
    event ProcessedByRetailer(uint256 code);     //8
    event PurchasedByConsumer(uint256 code);     //9

    modifier productExists(uint256 code) {
        require(code <= currentProducts, "Produce Code Invalid!");
        _;
    }

    // view product details using code
    function viewItem(uint256 code) public view productExists(code) returns(Item memory) {
        Item memory _it = Items[code];
        return _it;
    }

    // returns array of items owned by sender
    function viewUserItems(address user) public view returns(Item[] memory) {
        // address user = msg.sender;
        uint256 num = numberOwned[user];
        Item[] memory retItems = new Item[](num);
        uint256 cur=0;

        for(uint256 i=1; i<=currentProducts; i++) {
            Item memory _it = Items[i];
            if(_it.ownerID == user) {
                retItems[cur++] = _it;
            }
        }
        return retItems;
    }

    function viewItemAtFarmer() public view returns (Item[] memory) {
        State state = State.EntryByFarmer;
        Item[] memory retItems = new Item[](productsAtFarmer);
        uint256 cur=0;
        for(uint256 i=1; i<=currentProducts; i++) {
            Item memory _it = Items[i];
            if(_it.itemState == state) {
                retItems[cur++] = _it;
            }
        }
        return retItems;
    }

    function viewItemAtDistributor() public view returns (Item[] memory) {
        State state = State.ProcessedByDistributor;
        Item[] memory retItems = new Item[](productsAtDistributor);
        uint256 cur=0;
        for(uint256 i=1; i<=currentProducts; i++) {
            Item memory _it = Items[i];
            if(_it.itemState == state) {
                retItems[cur++] = _it;
            }
        }
        return retItems;
    }

    function viewItemAtRetailer() public view returns (Item[] memory) {
        State state = State.ProcessedByRetailer;
        Item[] memory retItems = new Item[](productsAtRetailer);
        uint256 cur=0;
        for(uint256 i=1; i<=currentProducts; i++) {
            Item memory _it = Items[i];
            if(_it.itemState == state) {
                retItems[cur++] = _it;
            }
        }
        return retItems;
    }

    // produce a product by giving details
    function produceByFarmer(string memory name, uint256 units, string memory date, uint256 price) public returns (uint256) {
        uint256 code = currentProducts+1;
        
        Item memory newProduce; // Create a new struct Item in memory

        // addresses
        address distributorID; // Empty distributorID address
        address retailerID; // Empty retailerID address
        address consumerID; // Empty consumerID address
        newProduce.distributorID = distributorID; // Metamask-Ethereum address of the Distributor
        newProduce.retailerID = retailerID; // Metamask-Ethereum address of the Retailer
        newProduce.consumerID = consumerID; // Metamask-Ethereum address of the Consumer // ADDED payable
        newProduce.ownerID = msg.sender;  // Metamask-Ethereum address of the current owner as the product moves through 8 stages
        newProduce.originFarmerID = msg.sender; // Metamask-Ethereum address of the Farmer

        // product specifics
        newProduce.productUnits = units;
        newProduce.productCode = code; // Universal Product Code (UPC), generated by the Farmer, goes on the package, can be verified by the Consumer
        newProduce.productName = name; // Product Name
        newProduce.sourceCost = price;  // Product Price
        newProduce.itemState = State.EntryByFarmer; // Product State as represented in the enum above
        newProduce.produceDate = date;

        Items[code] = newProduce; // Add newProduce to items struct by upc
        Owners[msg.sender].push(code);

        // update numeric records for count of products
        currentProducts++;
        productsAtFarmer++;
        numberOwned[msg.sender]++;

        emit ProduceByFarmer(code);
        return code;
    }

    // bought by a distributor
    function purchaseItemByDistributor(uint256 code, uint256 price) public productExists(code) {

        // require(Items[code].itemState == State.EntryByFarmer, "Item not for Sale!");

        // uint256 price = Items[code].sourceCost; // to be paid to farmer

        // require(msg.value >= price, "Transfer Amount insufficient!");
        // uint256 remainingVal = msg.value - price; // to be returned to distributor

        // address payable ownerAddressPayable = payable(Items[code].ownerID); // make originFarmID payable
        // address payable distributorAddressPayable = payable(msg.sender); // make distributorID payable

        // ownerAddressPayable.transfer(price); // transfer funds from distributor to farmer
        // distributorAddressPayable.transfer(remainingVal); // transfer remaining amount to distributor

        numberOwned[Items[code].ownerID]--; // reduce number of products owned by previous owner

        Items[code].ownerID = msg.sender; // update owner
        Items[code].distributorID = msg.sender; // update distributor
        Items[code].itemState = State.ProcessedByDistributor; // update state
        Items[code].wholesaleCost = price;

        productsAtDistributor++; // added to distributors
        productsAtFarmer--; // taken from farm
        numberOwned[msg.sender]++; // add to products by new owner

        emit PurchasedByDistributor(code);
    }

    // farmer ships item
    function shippedItemByFarmer(uint code) public productExists(code) {
        Items[code].itemState = State.ShippedByFarmer; // update state
        emit ShippedByFarmer(code);
    }

    // processes and puts for sale the product - by distributor TODO
    function processItemByDistributor(uint256 code, uint256 price) public productExists(code) {
        Items[code].itemState = State.ProcessedByDistributor;
        Items[code].wholesaleCost = price;
        emit ProcessedByDistributor(code);
    }

    // item is purchased by retailer
    function purchaseItemByRetailer(uint256 code, uint256 price) public productExists(code) {

        // uint256 price = Items[code].wholesaleCost;

        // require(msg.value >= price, "Transfer Amount insufficient!");
        // uint256 remainingVal = msg.value-price;

        // address payable ownerAddressPayable = payable(Items[code].ownerID);
        // address payable retailerAddressPayable = payable(msg.sender);

        // ownerAddressPayable.transfer(price);
        // retailerAddressPayable.transfer(remainingVal);

        numberOwned[Items[code].ownerID]--;

        Items[code].ownerID = msg.sender;
        Items[code].retailerID = msg.sender;
        Items[code].itemState = State.ProcessedByRetailer;
        Items[code].retailCost = price;

        productsAtDistributor--; // added to distributors
        productsAtRetailer++; // taken from farm
        numberOwned[msg.sender]++; // add to products by new owner
        
        emit PurchasedByRetailer(code);
    }

    // item shipped by distributor
    function shippedItemByDistributor(uint code) public productExists(code) {
        Items[code].itemState = State.ShippedByDistributor;
        emit ShippedByDistributor(code);
    }

    // process and set price for sale
    function processItemByRetailer(uint256 code, uint256 price) public productExists(code) {
        Items[code].itemState = State.ProcessedByRetailer;
        Items[code].retailCost = price;
        emit ProcessedByRetailer(code);
    }

    // item purchased by consumer
    function purchaseItemByConsumer(uint256 code) public productExists(code) {

        // uint256 price = Items[code].retailCost;

        // address ownerAddressPayable = Items[code].ownerID;
        // address consumerAddressPayable = msg.sender;

        numberOwned[Items[code].ownerID]--;

        Items[code].ownerID = msg.sender;
        Items[code].consumerID = msg.sender;
        Items[code].itemState = State.PurchasedByConsumer;

        productsAtConsumer++; // added to distributors
        productsAtRetailer--; // taken from farm
        numberOwned[msg.sender]++; // add to products by new owner

        emit PurchasedByConsumer(code);
    }
}