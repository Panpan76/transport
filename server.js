var express = require('express');
var app = express();
var serveur = require('http').Server(app);
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/site'));
app.set('view options', {layout: false});
app.set('view engine', 'html');
app.set('views', __dirname + '/site');

var transportsList = [];

// Routes
app
	.get('/gui', function (req, res){ // Get all transports
		res.sendFile(__dirname + '/site/index.html');
	})
	.get('/gui/form', function (req, res){ // Form to add a transport
		res.sendFile(__dirname + '/site/form.html');
	})
	.get('/transports', function (req, res){ // Get all transports
		res.status(201).send(transportsList);
	})
	.post('/transports', function(req, res){ // Create a new transport
		if(checkExist(req.body.title) && checkExist(req.body.departureDate) && checkExist(req.body.arrivalDate) && checkExist(req.body.departurePoint) && checkExist(req.body.arrivalPoint) && checkExist(req.body.status)){
			var newTransport = req.body;
			newTransport.ID = newID();
			transportsList.push(newTransport);
			res.status(201).send({success: true, msg: 'New transport created.'});
		}
		else{
			res.status(400).send({success: false, msg: 'All the fields must be full.'});
		}
	})
	.get('/transports/:id', function (req, res){ // Get this transport
		//console.log(getTransport(req.params.id));
	})
	.put('/transports/:id', function (req, res){ // Update this transport
		if(checkExist(req.body.title) && checkExist(req.body.departureDate) && checkExist(req.body.arrivalDate) && checkExist(req.body.departurePoint) && checkExist(req.body.arrivalPoint) && checkExist(req.body.status)){
			var newTransport = req.body;
			newTransport.ID = req.params.id;
			for(var i = 0; i < transportsList.length; i++){
				if(transportsList[i].ID = req.params.id){
					transportsList.splice(i, 1, newTransport);
				}
			}
			res.status(201).send({success: true, msg: 'Transport #'+req.params.id+' edited.'});
		}
		else{
			res.status(400).send({success: false, msg: 'All the fields must be full.'});
		}
	})
	.delete('/transports/:id', function(req, res){ // Delete this transport
		if(getTransport(req.params.id) === null){
      res.status(400).send({success: false, msg: 'Transport unknow.'});
    }
    else{
      transportsList.splice(getIndexTransport(req.params.id), 1);
      res.status(201).send({success: true, msg: 'Transport #'+req.params.id+' deleted.'});
    }
	});

function checkExist(variable){
	return !(typeof variable == 'undefined' || variable === null);
}

function newID(){
  var maxID = 0;
	for(var i = 0; i < transportsList.length; i++){
		if(transportsList[i].ID > maxID){
			maxID = transportsList[i].ID;
		}
	}
	return maxID+1;
}

function getTransport(id){
	for(var i = 0; i < transportsList.length; i++){
		if(transportsList[i].ID == id){
			return transportsList[i];
		}
	}
	return null;
}

function getIndexTransport(id){
	for(var i = 0; i < transportsList.length; i++){
		if(transportsList[i].ID == id){
			return i;
		}
	}
	return null;
}

serveur.listen(80);
