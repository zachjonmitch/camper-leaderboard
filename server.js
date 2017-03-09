var express = require('express');
var path = require('path');
var app = express();
var PORT = process.env.PORT || 8080;

app.use(express.static('components'));
app.use(express.static('styles'));

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.listen(PORT, function() {
    console.log("Listening on port " + PORT);
})