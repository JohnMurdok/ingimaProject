var express    = require('express'),
    app        = express(),
    applicationResources = require('./resources.js'),
	bodyParser = require('body-parser');

//declaring resources for the app
app.resources = applicationResources;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//Trace connection
app.use("*",function(req,res,next){
	console.info(req.ip + " " + req.originalUrl);
	next();
});

app.use(function(req, res,next){
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader('Access-Control-Allow-Credentials', true);
	// Check if preflight request
	if (req.method === 'OPTIONS') {
		res.status(200);
		res.end();
	}
	else {
		// Pass to next layer of middleware
		next();
	}
});
//Basic Handling error
app.use(function(err, req, res, next) {
  res.status(500).json({
	  error:err.stack
  });
});

//init routers
app.initRouters = function(){
  for(var i in app.resources.routers){
    router = require('./'+app.resources.routers[i]+'/'+app.resources.routers[i]+'.js');
    app.use("/api/"+app.resources.routers[i],router);
  }
};

app.initRouters();
module.exports = app;