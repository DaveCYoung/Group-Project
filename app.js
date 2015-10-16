// Requires \\
var express = require('express');
var key = require('./apikey')
var bodyParser = require('body-parser');
var googleTranslate = require('google-translate')(key.key);
console.log(key.key)
var placeholder	= {}

// Create Express App Object \\
var app = express();

// Application Configuration \\
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));

// Routes \\
app.get('/', function(req, res){
 	 res.sendFile('/html/main.html', {root : './public'});
});

app.post('/translatebefore', function(req, res){
	console.log(req.body)
	googleTranslate.translate(req.body.wordBefore, req.body.languageBefore, req.body.languageAfter, function(err, translation){
	console.log(translation)
	res.send(translation);
	})

	// console.log(req.body);
})


// app.get GET https://www.googleapis.com/language/translate/v2/detect?key=AIzaSyBjyVdN8rlzMCCNO7mNXem4FkoRK5Qm-v4&q=Google%20Translate%20Rocks


// app.get('/success', function(req, res){
// 	console.log('Form :', req.body)
// 	res.send('Success.')
// })
// Creating Server and Listening for Connections \\
var port = 3000
app.listen(port, function(){
  console.log('Server running on port ' + port);

})  

//API Key
//AIzaSyBjyVdN8rlzMCCNO7mNXem4FkoRK5Qm-v4
//