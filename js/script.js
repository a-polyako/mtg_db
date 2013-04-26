var availableTags = [
      "Forest",
      "Island",
      "Plains"
];
var tshift = 20;
var lshift = 50;
var searchData;
var seenTypes = [];
var deck = {};

function cmc_sort(card_a, card_b){
	return(cards_info[card_a]["cmc"] - cards_info[card_b]["cmc"]);
};

function col_sort(card_a, card_b){
	return(cards_info[card_a]["color"] - cards_info[card_b]["color"]);
};

function nam_sort(card_a, card_b){
	if(cards_info[card_a]["name"] < cards_info[card_b]["name"]) return -1;
	if(cards_info[card_a]["name"] >= cards_info[card_b]["name"]) return 1;

};

$(document).ready(function(){
	$('#search').click(function(){
		$('#modal').modal('toggle');

	});
	$('#modal_search').click(function(){
		searchData = $('#searchbox').val();
		$('#modal').modal('toggle');
		$('#resultsmodal').delay(2000).modal('show');
	});
	$('#resultsmodal').on('shown', function(){
		 $('#resultsmodal').removeData("modal")
		$sr = $('#results_body');
		$content = $('<div>');
		$content.append(cards_html[searchData]);
		$sr.html($content);
	});
	 $( ".typeahead").typeahead(availableTags)
	 $('#add1').click(function(){
	 	var seen = false;
	 	var len = $('.'+ searchData).length;
	 	var i;
	 	for(i = 0; i < seenTypes.length; i++){
	 		if(seenTypes[i] == searchData){	 			
	 			seen = true;
	 			lshift= 150*i;
	 			deck[searchData]++;
	 		}
	 	}
	 	if(!seen){
	 		seenTypes.push(searchData);
	 		lshift = 150 * (i);
	 		deck[searchData] = 1;
	 	} 
	 	
	 	if(len != 0) tshift = 20 * (len+1);
	 	else{
	 		tshift = 20;	
	 	}
	 	$img = $('<img class ='+ searchData + '>');
	 	$img.css({'position':'absolute', 'top':tshift, 'left':lshift});
	 	$img.attr('src', $('#results_body img').attr('src'));
	 	$('#content').append($img);
	 });
	 $('#add4').click(function(){
	 	var seen = false;
	 	var j;
		 var len = $('.'+ searchData).length;
		 for(j = 0; j < seenTypes.length; j++){
			if(seenTypes[j] == searchData){	 	
	 			seen = true;
	 			lshift= 150*j;
	 			deck[searchData]+=4;
		 	}
		 }
		 if(!seen){
		 	seenTypes.push(searchData);
		 	deck[searchData] = 4;
		 	lshift = 150 * (j);
		 } 
	 	for(var i = 0; i < 4; i++){
		 	
		 	len = $('.'+ searchData).length;
		 	if(len != 0) tshift = 20 * (len+1);
		 	else{
		 		tshift = 20;	
		 	}
		 	$img = $('<img class ='+ searchData + '>');
		 	$img.css({'position':'absolute', 'top':tshift, 'left':lshift});
		 	$img.attr('src', $('#results_body img').attr('src'));
		 	$('#content').append($img);
		 }
	 });
	 $('#cmc_sort').click(function(){
	 	var sorted_deck = seenTypes;
	 	sorted_deck = sorted_deck.sort(cmc_sort);
	 	var images = document.getElementsByTagName('img');
		var l = images.length;
		for (var i = 0; i < l; i++) {
		    images[0].parentNode.removeChild(images[0]);
		}
		tshift = 20;
		lshift = 0;
		var prev_cmc = 0;
		for(var i = 0; i < sorted_deck.length; i++){
			if(cards_info[sorted_deck[i]]["cmc"] != prev_cmc){
				prev_cmc = cards_info[sorted_deck[i]]["cmc"];
				lshift = 150 * i;
				tshift = 20;	
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img class ='+ sorted_deck[i] + '>');
			 	$img.css({'position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[sorted_deck[i]]);
			 	$('#content').append($img);
			 	tshift += 20;
			}
		}
	 });
	 $('#col_sort').click(function(){
	 	var sorted_deck = seenTypes;
	 	sorted_deck = sorted_deck.sort(col_sort);
	 	var images = document.getElementsByTagName('img');
		var l = images.length;
		for (var i = 0; i < l; i++) {
		    images[0].parentNode.removeChild(images[0]);
		}
		tshift = 20;
		lshift = 0;
		var prev_col = 0;
		for(var i = 0; i < sorted_deck.length; i++){
			if(cards_info[sorted_deck[i]]["color"] != prev_col){
				prev_cmc = cards_info[sorted_deck[i]]["color"];
				lshift = 150 * i;
				tshift = 20;
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img class ='+ sorted_deck[i] + '>');
			 	$img.css({'position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[sorted_deck[i]]);
			 	$('#content').append($img);
			 	tshift += 20;
			}
		}
	 });
	 $('#nam_sort').click(function(){
	 	var sorted_deck = seenTypes;
	 	sorted_deck = sorted_deck.sort(nam_sort);
	 	var images = document.getElementsByTagName('img');
		var l = images.length;
		for (var i = 0; i < l; i++) {
		    images[0].parentNode.removeChild(images[0]);
		}
		tshift = 20;
		lshift = 0;
		var prev_nam= 0;
		for(var i = 0; i < sorted_deck.length; i++){
			if(cards_info[sorted_deck[i]]["name"] != prev_nam){
				prev_cmc = cards_info[sorted_deck[i]]["cmc"];
				lshift = 150 * i;
				tshift = 20;
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img class ='+ sorted_deck[i] + '>');
			 	$img.css({'position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[sorted_deck[i]]);
			 	$('#content').append($img);
			 	tshift += 20;
			}
		}
		seenTypes = sorted_deck;
	 });
	 $("#stats").click(function(){
	 	$("#stats_modal").modal('toggle');
	 })
});

var cards_info ={
	"Forest":{"cmc":0,"color":0,"name":"Forest","price":".05"},
	"Island":{"cmc":0,"color":0,"name":"Island","price":".05"}
}

var cards_html ={
	"Forest":"<img src='./images/forest.jpg' align='left' /><div><ul><li>Forest</li><li>Basic Land</li><li>({T}: Add {G} to your mana pool.))</li><li>Legal in Vintage (Type 1)<br/> Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/>Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/>Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Island":"<img src='./images/island.jpg' align='left' /><div><ul><li>Island</li><li>Basic Land</li><li>({T}: Add {U} to your mana pool.))</li><li>Legal in Vintage (Type 1)<br/> Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/>Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/>Legal in Commander <br/>Legal in Modern</li></ul></div>"
}

var card_imgs = {
	"Forest":"./images/forest.jpg",
	"Island":"./images/island.jpg"
}