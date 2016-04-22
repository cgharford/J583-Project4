// Create Node.js app using express framework
var express = require('express');
var app = express();

// Links to our assets (css, js, etc.)
app.use(express.static(__dirname + '/assets'));

// Use ejs for embedded templates
app.set('view engine', 'ejs');

// This is our route
app.get('/', function(req, res){
    res.render('index');
});

// Make the app listen on port 3000
app.listen(3000, function(){
    console.log("App is listening on port 3000...")
});
