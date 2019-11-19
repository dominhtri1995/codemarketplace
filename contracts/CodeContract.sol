pragma solidity ^0.5.11;

contract CodeContract {
    uint256 public buyerCount = 0;
    uint256 public sellerCount = 0;
    uint256 public productCount = 0;
    uint256 public transactionCount = 0;
    
    
    mapping(uint => Buyer) public buyers;
    mapping(uint => Seller) public sellers;
    mapping(uint => Product) public products;
    mapping(uint => Transaction) public transactions;
    
    address owner;
    address payable wallet;
    
    struct Buyer {
        uint   id;
        address payable public_address;
        uint purchaseCount;
        mapping(uint => uint) purchases;
    }

    struct Seller {
        address payable public_address;
        uint id;
        uint productTotal;
        mapping(uint => uint) myproducts;
    }

    struct Product {
        string name;
        string description;
        string img;
        uint  price;
        bool active;
        uint id;
        uint seller_id;
        uint transactionCount;
        mapping(uint => int) ratings;
    }

    enum State {Pending, Success, Fail}

    struct Transaction {
        uint id;
        uint buyer_id;
        uint product_id;
        State state;
    }

    event Purchase(uint transaction_id, uint product_id);

    constructor() public {
        owner = msg.sender;
        wallet = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    function buyProduct(uint product_id) public payable {
        for (uint i = 0; i < buyerCount; i++) {
            if (buyers[i].public_address == msg.sender) {
                if(msg.value >= products[product_id].price) {
                    transactions[transactionCount] = Transaction(transactionCount, i, product_id, State.Pending);
                    emit Purchase(transactionCount, product_id);
                    transactionCount += 1;
                }
                return;
            }
        }
    }

    function approveTransaction(uint transaction_id) public onlyOwner{
        // Add purchase to user purchase list
        Buyer storage b = buyers[transactions[transaction_id].buyer_id];
        b.purchases[b.purchaseCount] = transactions[transaction_id].product_id;
        b.purchaseCount += 1;

        // Send money and update transaction list
        Product memory p = products[transactions[transaction_id].product_id];
        products[transactions[transaction_id].product_id].transactionCount += 1;
        sellers[p.seller_id].public_address.transfer(p.price);
        transactions[transaction_id].state = State.Success;
    }

    function cancelTransaction(uint transaction_id) public onlyOwner{
        Transaction memory p = transactions[transaction_id];
        buyers[p.buyer_id].public_address.transfer(products[p.product_id].price);
        transactions[transaction_id].state = State.Fail;
    }

    function updateRating(uint product_id, int score) public {
        if(score != 1 && score != -1) {
            return;
        }

        for (uint i = 0; i < buyerCount; i++) {
            if (buyers[i].public_address == msg.sender) {
                for (uint j = 0; j < transactionCount; j++) {
                    if (transactions[j].buyer_id == i && transactions[j].product_id == product_id) {
                        products[product_id].ratings[i] = score;
                        return;
                    }
                }
            }
        }
    }

    function getProductRating(uint product_id) public view returns (int){
        int score = 0;
        for (uint i = 0; i < buyerCount; i++) {
            score += products[product_id].ratings[i];
        }
        return score;
    }

    function getProductById(uint product_id) public view returns (string memory,string memory,uint,bool,uint,int, string memory) {
        return (products[product_id].name, products[product_id].description, products[product_id].price, products[product_id].active, products[product_id].seller_id, getProductRating(product_id), products[product_id].img);
    }

    function getNumOfPurchase(uint product_id) public view returns (int) {
        int count = 0 ;
        for (uint i = 0; i < transactionCount; i++) {
            if(transactions[i].product_id == product_id && transactions[i].state == State.Success) {
                 count += 1;
            }
        }
        return count;
    }

    function getTIndex (uint sid) public view returns (uint) {
        uint n = sellers[sid].productTotal;
        uint[] memory buckets = new uint[](n+1);

        for(uint i =0 ; i < sellers[sid].productTotal; i++) {
            if(products[sellers[sid].myproducts[i]].transactionCount >= sellers[sid].productTotal) {
                buckets[sellers[sid].productTotal] += 1;
            } else {
                buckets[products[sellers[sid].myproducts[i]].transactionCount] += 1;
            }
        }

        uint count = 0;
        for(uint i = sellers[sid].productTotal; i >= 0; i--) {
            count += buckets[i];
            if(count >= i) {
                return i;
            }
        }
        return 0;
    }

    function getBuyerById(uint buyer_id) public view returns (uint,address) {
        return (buyer_id, buyers[buyer_id].public_address);
    }

    function getProductPurchased (uint buyer_id, uint purchaseCount) public view returns (string memory,string memory,uint,bool,uint,int,string memory) {
        return getProductById(buyers[buyer_id].purchases[purchaseCount]);
    }

    function getSellerById(uint seller_id) public view returns (uint,address,int) {
        int score = 0;
        for (uint i = 0; i < productCount; i++) {
            if(products[i].seller_id == seller_id) {
                score += getProductRating(i);
            }
        }
        return (seller_id, sellers[seller_id].public_address, score);
    }

    function getTransactionById(uint transaction_id) public view returns (uint,uint,uint,State) {
        return (transaction_id, transactions[transaction_id].buyer_id, transactions[transaction_id].product_id, transactions[transaction_id].state);
    }

    function registerBuyer() public {
        for (uint i = 0; i < buyerCount; i++) {
            if (buyers[i].public_address == msg.sender) {
                return;
            }
        }

        buyers[buyerCount] = Buyer(buyerCount,msg.sender, 0);
        buyerCount += 1;
    }

    function registerSeller() public {
        for (uint i = 0; i < sellerCount; i++) {
            if (sellers[i].public_address == msg.sender) {
                return;
            }
        }

        sellers[sellerCount] = Seller(msg.sender,sellerCount,0);
        sellerCount += 1;
    }

    function registerProduct(string memory name, string memory description, string memory img, uint price, uint seller_id) public onlyOwner {
        products[productCount] = Product(name, description, img, price, true, productCount, seller_id, 0);
        sellers[seller_id].myproducts[sellers[seller_id].productTotal] = products[productCount].id;
        productCount += 1;
        sellers[seller_id].productTotal += 1;

    }

    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }

    function getMyBalance() public view returns(uint256) {
        return msg.sender.balance;
    }
}