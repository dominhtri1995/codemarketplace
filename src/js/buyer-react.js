class AppMain extends React.Component {
    constructor(props) {
        super(props);
        this.state = {products: [], purchases: [], messages: {}};
    }

    componentDidMount() {

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
                        id: i,
                        name: data[0][0],
                        description: data[0][1],
                        price: data[0][2].toNumber(),
                        status: data[0][3],
                        seller: data[0][4].toNumber(),
                        rating: data[0][5].toNumber(),
                        img: data[0][6],
                    })
                    thisComponent.setState({products: products})
                }).catch(function (err) {
                    console.error("ERROR! " + err.message)
                })
            }
        })
    }

    listPurchases() {

    }

    rateProduct(index, score) {
        window.App.rateProduct(function (instance) {
            instance.updateRating(index, score).then(function (result) {
                console.log('rate product', index, score)
                window.pushNoti("Thank you for your feedback", 2000)
            }).catch(function (err) {
                console.error("ERROR! " + err.message)
            })
        })
    }

    registerUser() {
        window.App.registerBuyer()
    }

    buyProduct(index) {
        let p = this.state.products[index]
        window.App.buyProduct(p.id, p.price)
    }

    messageChange(index, e) {
        let cur = JSON.parse(JSON.stringify(this.state.messages))
        cur[index] = e.target.value
        this.setState({messages: cur})
    }

    contactSeller(index, e) {
        var thisComponent = this
        fetch('/new_message', {
            method: 'POST', headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                buyerId: 0,
                message: thisComponent.state.messages[index] ? thisComponent.state.messages[index] : 'Can you customize this for me?',
                sellerId: thisComponent.state.products[index].seller,
            })
        }).then(function (response) {
            if (response.ok) {
                window.pushNoti("Message sent", 2000)
            } else {
                window.pushNoti("An error has occurred", 3000, 'error')
            }
        });
    }

    render() {
        return (
            <div className="container" style={{paddingTop: '25px', paddingBottom: '25px'}}>
                <div className="row">
                    <div style={{paddingTop: '25px', paddingBottom: '25px'}}>
                        <h1 className="text-center">Buyer Portal</h1>
                        <hr/>
                        <br/>
                        <div className="py-3">
                            {this.state.products.map((value, index) => {
                                return (
                                    <div className="product-display mb-3">
                                        <img style={{minWidth: '300px'}}
                                             src={value.img}
                                             width={300}
                                             height={200}/>
                                        <div className="ml-3">
                                            <h2>{value.name}</h2>
                                            <p>{value.description}</p>
                                            <p>Price: {value.price} (WEI)</p>
                                            <p>Rating: {value.rating}</p>
                                            <div className="rating">
                                                <div className="like grow"
                                                     onClick={this.rateProduct.bind(this, index, 1)}>
                                                    <i className="fa fa-thumbs-up fa-3x like" aria-hidden="true"></i>
                                                </div>
                                                <div className="dislike grow"
                                                     onClick={this.rateProduct.bind(this, index, -1)}>
                                                    <i className="fa fa-thumbs-down fa-3x like" aria-hidden="true"></i>
                                                </div>
                                            </div>
                                            <textarea onChange={this.messageChange.bind(this, index)} rows={3}
                                                      value={this.state.messages[index]}
                                                      defaultValue={"Can you customize this for me?"}/>
                                            <button className="btn btn-success" style={{minWidth: '200px'}}
                                                    onClick={this.contactSeller.bind(this, index)}>Contact Seller
                                            </button>
                                            <button className="btn btn-success ml-3" style={{minWidth: '200px'}}
                                                    onClick={this.buyProduct.bind(this, index)}>BUY
                                            </button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <button className="btn btn-success" style={{minWidth: '200px'}}
                        onClick={this.listProduct.bind(this)}>List Product
                </button>
                {/*<div className="row">*/}
                {/*    <div style={{paddingTop: '25px', paddingBottom: '25px'}}>*/}
                {/*        <h1 className="text-center">*/}
                {/*            Purchase History*/}
                {/*        </h1>*/}
                {/*        <hr/>*/}
                {/*        <br/>*/}
                {/*        <div className="py-3">*/}
                {/*           */}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</div>*/}
                {/*<button className="btn btn-success" style={{minWidth: '200px'}}*/}
                {/*        onClick={this.listPurchases.bind(this)}>List Purchases*/}
                {/*</button>*/}
                {/*<button className="btn btn-success ml-3" style={{minWidth: '200px'}}*/}
                {/*        onClick={this.registerUser.bind(this)}>Register*/}
                {/*</button>*/}
            </div>
        );
    }
}

ReactDOM.render((
    <AppMain/>
), document.getElementById('root'));