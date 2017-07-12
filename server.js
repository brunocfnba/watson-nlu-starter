var express = require("express"),
    app = express();

var port = process.env.PORT || 8080;

var nlu_inst = require('watson-developer-cloud/natural-language-understanding/v1.js');
var nlu = new nlu_inst({
  'username': '847d76eb-16da-466d-8293-35048078235b',
  'password': '2MZ4XgOUZHdo',
  'version_date': '2017-02-27'
});

app.use(express.static(__dirname + '/public'));

app.get('/getSentiment', function (request, response) {

  var sentence = request.query.sentence;
  console.log('Sentence = ' + sentence);
  
  if (!sentence){
  	response.end('{"status": "failed", "error": "no sentence to process"}');
  }
  //response.end('Hi');
  
  var parameters = {
  'text': sentence,
  'features': {
    'sentiment': {}
    }
  };
  
  console.log('PARAM = ' + parameters);
  
  nlu.analyze(parameters, function(err, content) {
	  if (err){
	    console.log('error:', err);
	    response.end(JSON.stringify(err));
	  }
	  else {
	  	console.log('success:', content);
	    response.end(JSON.stringify(content));
	  }
  });
 
 //response.end('aloha');

});

app.listen(port);
console.log("Listening on port ", port);

require("cf-deployment-tracker-client").track();
