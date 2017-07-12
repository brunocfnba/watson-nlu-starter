$().ready(function(){
	
	var answerEl = $( '#answer' );
	var errorEl = $( '#error' );
	var loadingEl = $( '#loading' );

	answerEl.hide();
	errorEl.hide();
	loadingEl.hide();
	$( '#send' ).click(function() {
		
		answerEl.hide();
		errorEl.hide();
		loadingEl.show();
		var sentence = $( '#sentence' ).val();
		
		$.ajax({
			type: 'GET',
	        url : 'getSentiment?sentence=' + sentence,
	        contentType: false,
	        processData: false,
	        dataType: 'json',
	        success : function(response) {
	        	if(response.hasOwnProperty('error')){
	        		answerEl.hide();
					errorEl.text(response.error);
					loadingEl.hide();
					errorEl.show();
				}
				else{
					errorEl.hide();
		        	var score = response.sentiment.document.score;
		        	var sentiment = response.sentiment.document.label;
		        	var lang = response.language;
		        	$( '#sentiment-ans' ).text(sentiment);
		        	$( '#conf-ans' ).text((Math.round(Math.abs(parseFloat(score)*100))) + '%');
		        	$( '#lang-ans' ).text(lang);
		        	loadingEl.hide();
		        	answerEl.show();
					//alert('response: ' + JSON.stringify(response));
				}

	        },
	        error : function(request, textStatus, errorThrown) {
	            alert(request.status + ', Error: ' + request.statusText);
	        }
		});
	
	});
});
