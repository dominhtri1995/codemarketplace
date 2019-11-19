/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var AppMain =
/*#__PURE__*/
function (_React$Component) {
  _inherits(AppMain, _React$Component);

  function AppMain(props) {
    var _this;

    _classCallCheck(this, AppMain);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(AppMain).call(this, props));
    _this.state = {
      products: [],
      purchases: [],
      messages: {}
    };
    return _this;
  }

  _createClass(AppMain, [{
    key: "componentDidMount",
    value: function componentDidMount() {}
  }, {
    key: "listProduct",
    value: function listProduct() {
      var thisComponent = this;
      window.App.listProduct(function (instance) {
        var products = [];

        var _loop = function _loop(i) {
          var productPromise = instance.getProductById(i);
          var productPurchasePromise = instance.getNumOfPurchase(i);
          Promise.all([productPromise, productPurchasePromise]).then(function (data) {
            console.log(data);
            instance.getTIndex(data[0][4].toNumber()).then(function (result) {
              console.log('t-index', result.toNumber());
              products.push({
                id: i,
                name: data[0][0],
                description: data[0][1],
                price: data[0][2].toNumber(),
                status: data[0][3],
                seller: data[0][4].toNumber(),
                rating: data[0][5].toNumber(),
                img: data[0][6],
                numOfPurchase: data[1].toNumber(),
                tindex: result.toNumber()
              });
              thisComponent.setState({
                products: products
              });
            });
          })["catch"](function (err) {
            console.error("ERROR! " + err.message);
          });
        };

        for (var i = 0; i < window.numOfProducts; i++) {
          _loop(i);
        }
      });
    }
  }, {
    key: "listPurchases",
    value: function listPurchases() {}
  }, {
    key: "rateProduct",
    value: function rateProduct(index, score) {
      window.App.rateProduct(function (instance) {
        instance.updateRating(index, score).then(function (result) {
          console.log('rate product', index, score);
          window.pushNoti("Thank you for your feedback", 2000);
        })["catch"](function (err) {
          console.error("ERROR! " + err.message);
        });
      });
    }
  }, {
    key: "registerUser",
    value: function registerUser() {
      window.App.registerBuyer();
    }
  }, {
    key: "buyProduct",
    value: function buyProduct(index) {
      var p = this.state.products[index];
      window.App.buyProduct(p.id, p.price);
    }
  }, {
    key: "messageChange",
    value: function messageChange(index, e) {
      var cur = JSON.parse(JSON.stringify(this.state.messages));
      cur[index] = e.target.value;
      this.setState({
        messages: cur
      });
    }
  }, {
    key: "contactSeller",
    value: function contactSeller(index, e) {
      var thisComponent = this;
      fetch('/new_message', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          buyerId: 0,
          message: thisComponent.state.messages[index] ? thisComponent.state.messages[index] : 'Can you customize this for me?',
          sellerId: thisComponent.state.products[index].seller
        })
      }).then(function (response) {
        if (response.ok) {
          window.pushNoti("Message sent", 2000);
        } else {
          window.pushNoti("An error has occurred", 3000, 'error');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      return React.createElement("div", {
        className: "container",
        style: {
          paddingTop: '25px',
          paddingBottom: '25px'
        }
      }, React.createElement("div", {
        className: "row"
      }, React.createElement("div", {
        style: {
          paddingTop: '25px',
          paddingBottom: '25px'
        }
      }, React.createElement("h1", {
        className: "text-center"
      }, "TensorPlace - Buyer Portal"), React.createElement("hr", null), React.createElement("br", null), React.createElement("div", {
        className: "py-3"
      }, this.state.products.map(function (value, index) {
        return React.createElement("div", {
          className: "product-display mb-3"
        }, React.createElement("img", {
          style: {
            minWidth: '300px'
          },
          src: value.img,
          width: 300,
          height: 200
        }), React.createElement("div", {
          className: "ml-3"
        }, React.createElement("h2", null, value.name), React.createElement("p", null, value.description), React.createElement("p", null, "Price: ", value.price, " (WEI)"), React.createElement("p", null, "Rating: ", value.rating), React.createElement("p", null, "Number of Purchase: ", value.numOfPurchase), React.createElement("p", null, "T-index : ", value.tindex), React.createElement("div", {
          className: "rating"
        }, React.createElement("div", {
          className: "like grow",
          onClick: _this2.rateProduct.bind(_this2, index, 1)
        }, React.createElement("i", {
          className: "fa fa-thumbs-up fa-3x like",
          "aria-hidden": "true"
        })), React.createElement("div", {
          className: "dislike grow",
          onClick: _this2.rateProduct.bind(_this2, index, -1)
        }, React.createElement("i", {
          className: "fa fa-thumbs-down fa-3x like",
          "aria-hidden": "true"
        }))), React.createElement("textarea", {
          onChange: _this2.messageChange.bind(_this2, index),
          rows: 3,
          value: _this2.state.messages[index],
          defaultValue: "Can you customize this for me?"
        }), React.createElement("button", {
          className: "btn btn-success",
          style: {
            minWidth: '200px'
          },
          onClick: _this2.contactSeller.bind(_this2, index)
        }, "Contact Seller"), React.createElement("button", {
          className: "btn btn-success ml-3",
          style: {
            minWidth: '200px'
          },
          onClick: _this2.buyProduct.bind(_this2, index)
        }, "BUY")));
      })))), React.createElement("button", {
        className: "btn btn-success",
        style: {
          minWidth: '200px'
        },
        onClick: this.listProduct.bind(this)
      }, "List Product"));
    }
  }]);

  return AppMain;
}(React.Component);

ReactDOM.render(React.createElement(AppMain, null), document.getElementById('root'));

/***/ })
/******/ ]);