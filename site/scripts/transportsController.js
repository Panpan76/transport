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
    var arrivalDate = new Date(transport.arrivalDateYear, transport.arrivalDateMonth - 1, transport.arrivalDateDay);
    newTransport.arrivalDate = arrivalDate.toDateString();
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
