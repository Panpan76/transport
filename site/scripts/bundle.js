(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
angular.module("transportsApp", ['ngRoute'])
.controller('TransportsController', ["$http", require("./TransportsController")]);

},{"./TransportsController":2}],2:[function(require,module,exports){
module.exports = function($http){
  var self = this;

  this.transportsList;

  this.getAll = function(){
    var request = $http({
      method: 'GET',
      url: '/transports',
      headers: {'Accept': 'application/json'},
      callback: 'JSON_CALLBACK'
    });

    request
      .success(function(data, status, headers, config){
        self.transportsList = data;
        console.log(data);
        console.log(self.transportsList);
      }).error(function(data, status, headers, config){
        console.log(status+' : '+data);
      });
  };

  this.addTransport = function(transport){
    var newTransport = {};
    newTransport.title = transport.title;
    var departureDate = new Date(transport.departureDateYear, transport.departureDateMonth - 1, transport.departureDateDay);
    newTransport.departureDate = departureDate.toDateString();
    newTransport.arrivalDate = new Date(transport.arrivalDateYear, transport.arrivalDateMonth - 1, transport.arrivalDateDay);
    newTransport.departurePoint = transport.departurePoint;
    newTransport.arrivalPoint = transport.arrivalPoint;
    newTransport.status = transport.status;
    var request = $http({
      method: 'POST',
      url: '/transports',
      data: newTransport,
      callback: 'JSON_CALLBACK'
    });

    request
      .success(function(data, status, headers, config){
        console.log(data);
        window.location = '..';
      }).error(function(data, status, headers, config){
        console.log(status+' : '+data.msg);
      });
  };

  this.removeTransport = function(id){
    var request = $http({
      method: 'DELETE',
      url: '/transports/'+id,
      headers: {'Accept': 'application/json'},
      callback: 'JSON_CALLBACK'
    });

    request
      .success(function(data, status, headers, config){
        console.log(data);
        self.getAll();
      }).error(function(data, status, headers, config){
        console.log(status+' : '+data);
      });
  };

  self.getAll();
};

},{}]},{},[1,2]);
