//Declaring resources
var app = require('./api/application');
var port = 9000;


// Starting server
app.listen(port);
console.log('I welcome you on port : ' + port);
