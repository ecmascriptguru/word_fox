'use strict';

var env = "dev";
// var env = "product";

var createTab = function(params, callback) {
	var func = (typeof callback === "function") ? callback : function() {};
	chrome.tabs.create(params, func);
};

var amazonSearchStartPoint = "https://www.amazon.com/s/ref=amb_link_483004722_1?ie=UTF8&bbn=12035955011&field-enc-merchantbin=ATVPDKIKX0DER&hidden-keywords=ORCA&rh=i%3Afashion-novelty&field-keywords=";

var restAPI = (function(window, jQuery) {
	var _baseURL = null,
		_mainHost = null,
		_v1ApiBaseUrl = null;

	if (env == "dev") {
		_mainHost = "http://localhost:8000/";
	} else {
		_mainHost = "http://ec2-184-73-108-215.compute-1.amazonaws.com/";
	}
	_baseURL = _mainHost + "api/product";
	_v1ApiBaseUrl = _mainHost + "api/v1/";

	var getProducts = function(url, callback) {
			var url = (url) ? url : _baseURL;
			$.ajax({
				url: url,
				method: "get",
				data: null,
				dataType: 'json',
				success: function(res) {
					if (typeof callback === "function") {
						callback(res);
					} else {
						console.log(res);
					}
				},
				failure: function(e, xhr) {
					if (typeof callback === "function") {
						callback(e);
					} else {
						console.log(e);
					}
				}
			});
		},

		insertProducts = function(params, callback) {
			$.ajax({
				url: _baseURL,
				method: "POST",
				contentType: 'application/json',
				data: JSON.stringify(params),
				// data: params,
				success: function(res) {
					if (typeof callback === "function") {
						callback(res);
					} else {
						console.log(res);
					}
				},
				failure: function(e, xhr) {
					if (typeof callback === "function") {
						callback(e);
					} else {
						console.log(e);
					}
				}
			});
		},

		login = function(email, password, callback) {
			$.ajax({
				url: _v1ApiBaseUrl + "login",
				data: JSON.stringify({
					email: email,
					password: password
				}),
				method: "post",
				contentType: "application/json",
				success: function(res) {
					res = JSON.parse(res);
					if (typeof callback == "function") {
						callback(res);
					} else {
						console.log(res);
					}
				}
			});
		},

		saveProduct = function(params, callback) {
			$.ajax({
				url: _v1ApiBaseUrl + "items/save",
				method: "post",
				contentType: "application/json",
				data: JSON.stringify(params),
				success: function(res) {
					if (typeof callback == "function") {
						callback(res);
					} else {
						console.log(res);
					}
				},
				failure: function(e, xhr) {
					if (typeof callback == "function") {
						callback(e);
					} else {
						console.log(e);
					}
				}
			});
		},

		unsaveProduct = function(params, callback) {
			$.ajax({
				url: _v1ApiBaseUrl + "items/unsave",
				method: "post",
				contentType: "application/json",
				data: JSON.stringify(params),
				success: function(res) {
					if (typeof callback == "function") {
						callback(res);
					} else {
						console.log(res);
					}
				},
				failure: function(e, xhr) {
					if (typeof callback == "function") {
						callback(e);
					} else {
						console.log(e);
					}
				}
			});
		};

	return {
		base: _mainHost,
		login: login,
		save: saveProduct,
		unsave: unsaveProduct,
		get: getProducts,
		add: insertProducts
	};
	
})(window, $)