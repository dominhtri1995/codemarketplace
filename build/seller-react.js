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
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */,
/* 1 */
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
      balance: 0,
      rating: 0,
      messages: []
    };
    return _this;
  }

  _createClass(AppMain, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var thisComponent = this;
      fetch('/my_message?sellerId=0', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }).then(function (response) {
        if (response.ok) {
          response.json().then(function (result) {
            if (result.message) {
              thisComponent.setState({
                messages: result.message
              });
            }
          });
        } else {
          window.pushNoti("An error has occurred", 3000, 'error');
        }
      });
    }
  }, {
    key: "listProduct",
    value: function listProduct() {
      var thisComponent = this;
      window.App.listProduct(function (instance) {
        var products = [];

        for (var i = 0; i < window.numOfProducts; i++) {
          var productPromise = instance.getProductById(i);
          Promise.all([productPromise]).then(function (data) {
            console.log(data);
            products.push({
              id: data[0][0],
              name: data[0][1],
              description: data[0][2],
              price: data[0][3].toNumber(),
              status: data[0][4]
            });
            thisComponent.setState({
              products: products
            });
          })["catch"](function (err) {
            console.error("ERROR! " + err.message);
          });
        }
      });
    }
  }, {
    key: "checkBalance",
    value: function checkBalance() {
      var thisComponent = this;
      window.App.checkBalance(function (instance) {
        instance.getMyBalance().then(function (data) {
          thisComponent.setState({
            balance: data.toNumber()
          });
          window.pushNoti("Balance updated", 2000);
        });
      });
    }
  }, {
    key: "registerSeller",
    value: function registerSeller() {
      window.App.registerSeller();
    }
  }, {
    key: "checkRating",
    value: function checkRating() {
      var thisComponent = this;
      window.App.getSeller(function (instance) {
        instance.getSellerById(0).then(function (data) {
          thisComponent.setState({
            rating: data[2].toNumber()
          });
          window.pushNoti("Rating updated", 2000);
        });
      });
    }
  }, {
    key: "addProduct",
    value: function addProduct(e) {
      e.preventDefault();
      fetch('/new_product', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: e.target.name.value,
          description: e.target.description.value,
          price: e.target.price.value,
          code: e.target.code.value,
          img: e.target.img.value
        })
      }).then(function (response) {
        if (response.ok) {
          window.pushNoti("Product added", 2000);
        } else {
          window.pushNoti("An error has occurred", 3000, 'error');
        }
      });
    }
  }, {
    key: "render",
    value: function render() {
      var thisComponent = this;
      return React.createElement("div", {
        className: "container",
        style: {
          paddingTop: '25px',
          paddingBottom: '25px'
        }
      }, React.createElement("div", {
        className: "row",
        style: {
          paddingTop: '25px',
          paddingBottom: '25px'
        }
      }, React.createElement("div", {
        className: "col-sm-15 text-center"
      }, React.createElement("h1", {
        className: ""
      }, "TensorPlace - Seller Portal"))), React.createElement("div", {
        className: "row",
        style: {
          paddingTop: '25px',
          paddingBottom: '25px'
        }
      }, React.createElement("div", {
        className: "col-lg-6 py-3 floating-div"
      }, React.createElement("form", {
        onSubmit: this.addProduct.bind(this)
      }, React.createElement("fieldset", {
        className: ""
      }, React.createElement("h2", null, "Add New Repo"), React.createElement("label", null, "Product Name:"), React.createElement("input", {
        type: "text",
        name: "name"
      }), React.createElement("label", null, "Product description:"), React.createElement("input", {
        type: "text",
        name: "description"
      }), React.createElement("label", null, "Price (WEI):"), React.createElement("input", {
        type: "number",
        name: "price"
      }), React.createElement("label", null, "Image:"), React.createElement("input", {
        type: "text",
        name: "img",
        defaultValue: "https://miro.medium.com/max/684/1*hCBt5o0qcVwga4pxPzIoUw.png"
      }), React.createElement("label", null, "Github Repo:"), React.createElement("input", {
        type: "text",
        name: "code"
      }), React.createElement("button", {
        className: "btn btn-success",
        style: {
          minWidth: '150px'
        },
        type: "submit"
      }, "Add Repo")))), React.createElement("div", {
        className: "col-lg-6 floating-div"
      }, React.createElement("div", {
        className: "text-center"
      }, React.createElement("h2", {
        className: "text-center"
      }, "Balance"), React.createElement("p", null, "Balance: ", this.state.balance, " (WEI)"), React.createElement("p", null, "Rating: ", this.state.rating), React.createElement("button", {
        className: "btn btn-success",
        style: {
          minWidth: '150px'
        },
        onClick: this.checkBalance.bind(this)
      }, "Check Balance"), React.createElement("button", {
        className: "btn btn-success ml-2",
        style: {
          minWidth: '150px'
        },
        onClick: this.checkRating.bind(this)
      }, "Check Rating"), React.createElement("br", null), React.createElement("br", null), React.createElement("h2", {
        className: "text-center"
      }, "Private Message"), this.state.messages.map(function (value, index) {
        return React.createElement("div", {
          className: "my-3 text-left"
        }, React.createElement("p", null, "From: ", value.buyerId), React.createElement("p", null, "Message: ", value.message));
      })))));
    }
  }]);

  return AppMain;
}(React.Component);

ReactDOM.render(React.createElement(AppMain, null), document.getElementById('root'));

/***/ })
/******/ ]);