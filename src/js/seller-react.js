class AppMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: [], balance: 0, rating: 0, messages: []};
    }

    componentDidMount() {
        var thisComponent = this
        fetch('/my_message?sellerId=0', {
            method: 'GET', headers: {'Content-Type': 'application/json'},
        }).then(function (response) {
            if (response.ok) {
                response.json().then(function (result) {
                    if (result.message) {
                        thisComponent.setState({messages: result.message})
                    }
                })
            } else {
                window.pushNoti("An error has occurred", 3000, 'error')
            }
        });
    }

    listProduct() {
        var thisComponent = this
        window.App.listProduct(function (instance) {
            let products = []
            for (let i = 0; i < window.numOfProducts; i++) {
                let productPromise = instance.getProductById(i)
                Promise.all([productPromise]).then(function (data) {
                    console.log(data)
                    products.push({
                        id: data[0][0],
                        name: data[0][1],
                        description: data[0][2],
                        price: data[0][3].toNumber(),
                        status: data[0][4]
                    })
                    thisComponent.setState({products: products})
                }).catch(function (err) {
                    console.error("ERROR! " + err.message)
                })
            }
        })
    }

    checkBalance() {
        var thisComponent = this
        window.App.checkBalance(function (instance) {
            instance.getMyBalance().then(function (data) {
                thisComponent.setState({balance: data.toNumber()})
                window.pushNoti("Balance updated", 2000)
            })
        })
    }

    registerSeller() {
        window.App.registerSeller()
    }

    checkRating() {
        var thisComponent = this
        window.App.getSeller(function (instance) {
            instance.getSellerById(0).then(function (data) {
                thisComponent.setState({rating: data[2].toNumber()})
                window.pushNoti("Rating updated", 2000)
            })
        })
    }

    addProduct(e) {
        e.preventDefault()
        fetch('/new_product', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                name: e.target.name.value,
                description: e.target.description.value,
                price: e.target.price.value,
                code: e.target.code.value,
                img: e.target.img.value,
            })
        }).then(function (response) {
            if (response.ok) {
                window.pushNoti("Product added", 2000)
            } else {
                window.pushNoti("An error has occurred", 3000, 'error')
            }
        });
    }

    render() {
        var thisComponent = this
        return (
            <div className="container" style={{paddingTop: '25px', paddingBottom: '25px'}}>
                <div className="row" style={{paddingTop: '25px', paddingBottom: '25px'}}>
                    <div className="col-sm-15 text-center">
                        <h1 className="">Seller Portal</h1>
                        {/*<button className="btn btn-success ml-3" style={{minWidth: '200px'}}*/}
                        {/*        onClick={this.registerSeller.bind(this)}>Register Seller*/}
                        {/*</button>*/}
                    </div>
                </div>
                <div className="row" style={{paddingTop: '25px', paddingBottom: '25px'}}>
                    <div className="col-lg-6 py-3 floating-div">
                        <form onSubmit={this.addProduct.bind(this)}>
                            <fieldset className="">
                                <h2>Add New Product</h2>
                                <label>Product Name:</label>
                                <input type="text" name="name"/>
                                <label>Product description:</label>
                                <input type="text" name="description"/>
                                <label>Price (WEI):</label>
                                <input type="number" name="price"/>
                                <label>Image:</label>
                                <input type="text" name="img"
                                       defaultValue={"https://miro.medium.com/max/684/1*hCBt5o0qcVwga4pxPzIoUw.png"}/>
                                <label>Code:</label>
                                <textarea name="code" rows={10}/>
                                <button className="btn btn-success" style={{minWidth: '150px'}} type="submit">
                                    Add Product
                                </button>
                            </fieldset>
                        </form>
                    </div>
                    <div className="col-lg-6 floating-div">
                        <div className="text-center">
                            <h2 className="text-center">Balance</h2>
                            <p>Balance: {this.state.balance} (WEI)</p>
                            <p>Rating: {this.state.rating}</p>
                            <button className="btn btn-success" style={{minWidth: '150px'}}
                                    onClick={this.checkBalance.bind(this)}>Check Balance
                            </button>
                            <button className="btn btn-success ml-2" style={{minWidth: '150px'}}
                                    onClick={this.checkRating.bind(this)}>Check Rating
                            </button>

                            <br/>
                            <br/>
                            <h2 className="text-center">Private Message</h2>
                            {this.state.messages.map((value, index) => {
                                return (<div className="my-3 text-left">
                                    <p>From: {value.buyerId}</p>
                                    <p>Message: {value.message}</p>
                                </div>)
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

ReactDOM.render((
    <AppMain/>
), document.getElementById('root'));