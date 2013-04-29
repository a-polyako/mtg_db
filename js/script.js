
var tshift = 15;
var lshift = 30;
var searchData;
var seenTypes = [];
var deck = {};
var save_name;
var run_val = 0.0;

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
	document.getElementById("running_val").innerHTML = "Total Price: $" + (run_val.toFixed(2)).toString();
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
	 $('#add1').click(function(){
	 	var seen = false;
	 	var len = $('.'+ searchData).length;
	 	var i;
	 	for(i = 0; i < seenTypes.length; i++){
	 		if(seenTypes[i] == searchData){	 			
	 			seen = true;
	 			lshift= 130*i;
	 			deck[searchData]++;
	 		}
	 	}
	 	if(!seen){
	 		seenTypes.push(searchData);
	 		lshift = 130 * (i);
	 		deck[searchData] = 1;
	 	} 
	 	
	 	if(len != 0) tshift = 15 * (len+1);
	 	else{
	 		tshift = 15;	
	 	}
	 	$img = $('<img class ='+ searchData + '>');
	 	$img.css({'height':'150px', 'position':'absolute', 'top':tshift, 'left':lshift});
	 	$img.attr('src', $('#results_body img').attr('src'));
	 	$('#content').append($img);
	 	run_val += cards_info[searchData]["price"];
	 	document.getElementById("running_val").innerHTML = "Total Price: $" + (run_val.toFixed(2)).toString();
	 });
	 $('#add4').click(function(){
	 	var seen = false;
	 	var j;
		 var len = $('.'+ searchData).length;
		 for(j = 0; j < seenTypes.length; j++){
			if(seenTypes[j] == searchData){	 	
	 			seen = true;
	 			lshift= 130*j;
	 			deck[searchData]+=4;
		 	}
		 }
		 if(!seen){
		 	seenTypes.push(searchData);
		 	deck[searchData] = 4;
		 	lshift = 130 * (j);
		 } 
	 	for(var i = 0; i < 4; i++){
		 	
		 	len = $('.'+ searchData).length;
		 	if(len != 0) tshift = 15 * (len+1);
		 	else{
		 		tshift = 15;	
		 	}
		 	$img = $('<img class ='+ searchData + '>');
		 	$img.css({'height':'150px', 'position':'absolute', 'top':tshift, 'left':lshift});
		 	$img.attr('src', $('#results_body img').attr('src'));
		 	$('#content').append($img);
		 	run_val += cards_info[searchData]["price"];
		 }
 		document.getElementById("running_val").innerHTML = "Total Price: $" + run_val.toFixed(2).toString();

	 });
	 $('#cmc_sort').click(function(){
	 	var sorted_deck = seenTypes;
	 	sorted_deck = sorted_deck.sort(cmc_sort);
	 	var images = document.getElementsByTagName('img');
		var l = images.length;
		for (var i = 0; i < l; i++) {
		    images[0].parentNode.removeChild(images[0]);
		}
		tshift = 15;
		lshift = 0;
		var prev_cmc = 0;
		for(var i = 0; i < sorted_deck.length; i++){
			if(cards_info[sorted_deck[i]]["cmc"] != prev_cmc){
				prev_cmc = cards_info[sorted_deck[i]]["cmc"];
				lshift = 130 * i;
				tshift = 15;	
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img class ='+ sorted_deck[i] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[sorted_deck[i]]);
			 	$('#content').append($img);
			 	tshift += 15;
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
		tshift = 15;
		lshift = 0;
		var prev_col = 0;
		for(var i = 0; i < sorted_deck.length; i++){
			if(cards_info[sorted_deck[i]]["color"] != prev_col){
				prev_cmc = cards_info[sorted_deck[i]]["color"];
				lshift = 130 * i;
				tshift = 15;
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img class ='+ sorted_deck[i] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
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
		tshift = 15;
		lshift = 0;
		var prev_nam= 0;
		for(var i = 0; i < sorted_deck.length; i++){
			if(cards_info[sorted_deck[i]]["name"] != prev_nam){
				prev_cmc = cards_info[sorted_deck[i]]["cmc"];
				lshift = 130 * i;
				tshift = 15;
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img class ='+ sorted_deck[i] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[sorted_deck[i]]);
			 	$('#content').append($img);
			 	tshift += 15;
			}
		}
		seenTypes = sorted_deck;
	 });
	 $("#stats").click(function(){
	 	$("#stats_modal").modal('toggle');
	 })
	 $("#save").click(function(){
	 	$("#save_modal").modal('toggle');
	 })
	 $("#save_file").click(function(){
	 	save_name = $('#save_name_box').val();
		$('#save_modal').modal('toggle');
		$('#saved_confirm_modal').delay(2000).modal('show');
	 })
	 $('#saved_confirm_modal').on('shown', function(){
	 	$('#save_modal').removeData("save_modal")
		$sr = $('#save_body');
		$content = $('<p>');
		$content.append("File ");
		$content.append(save_name);
		$content.append(".dec saved!</p>");
		$sr.html($content);
	});
	$("#sample_hand").click(function(){
		$("#sample_hand_modal").modal('toggle');
	})
});

var cards_info ={
	"Forest":{"cmc":0,"color":0,"name":"Forest","price":.05},
	"Island":{"cmc":0,"color":0,"name":"Island","price":.05},
	"Mountain":{"cmc":0,"color":0,"name":"Mountain","price":.05},
	"Swamp":{"cmc":0,"color":0,"name":"Swamp","price":.05},
	"Plains":{"cmc":0,"color":0,"name":"Plains","price":.05},
}

var cards_html ={
	"Forest":"<img src='./images/forest.jpg' align='left' /><div><ul><li>Forest</li><li>Basic Land</li> \
<li>({T}: Add {G} to your mana pool.))</li> \
<li>Legal in Vintage (Type 1)<br/> Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/>Legal in Commander <br/> \
Legal in Modern</li></ul></div>",
	"Island":"<img src='./images/island.jpg' align='left' /><div><ul><li>Island</li><li>Basic Land</li> \
<li>({T}: Add {U} to your mana pool.))</li><li>Legal in Vintage (Type 1)<br/> \
Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Plains":"<img src='./images/plains.jpg' align='left' /><div><ul><li>Island</li><li>Basic Land</li> \
<li>({T}: Add {W} to your mana pool.))</li><li>Legal in Vintage (Type 1)<br/> \
Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Mountain":"<img src='./images/mountain.jpg' align='left' /><div><ul><li>Island</li><li>Basic Land</li> \
<li>({T}: Add {R} to your mana pool.))</li><li>Legal in Vintage (Type 1)<br/> \
Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Swamp":"<img src='./images/swamp.jpg' align='left' /><div><ul><li>Island</li><li>Basic Land</li> \
<li>({T}: Add {B} to your mana pool.))</li><li>Legal in Vintage (Type 1)<br/> \
Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>"
}
var card_imgs = {
	"Forest":"./images/forest.jpg",
	"Island":"./images/island.jpg",
	"Plains":"./images/plains.jpg",
	"Swamp":"./images/swamp.jpg",
	"Mountain":"./images/mountain.jpg"
}