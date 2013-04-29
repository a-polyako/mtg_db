
var tshift = 15;
var lshift = 30;
var searchData;
var seenTypes = [];
var deck = {};
var save_name;
var run_val = 0.0;
var draw_lshift = 30;
var draw_tshift = 200;
var shuffle_deck = [];
var card_to_draw = 7;

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
	 	$img = $('<img id=on_table_img class ='+ searchData + '>');
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
		 	$img = $('<img id=on_table_img class ='+ searchData + '>');
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
				$img = $('<img id=on_table_img class ='+ sorted_deck[i] + '>');
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
				$img = $('<img id=on_table_img class ='+ sorted_deck[i] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[sorted_deck[i]]);
			 	$('#content').append($img);
			 	tshift += 15;
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
				$img = $('<img id=on_table_img class ='+ sorted_deck[i] + '>');
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
		$('#sample-hand-body').empty();   
		draw_lshift = 30;
		draw_tshift = 200;
		for(var i = 0;i<seenTypes.length;i++){	
			for(var j = 0;j<deck[seenTypes[i]];j++){
				shuffle_deck.push(seenTypes[i]);
			}
		}
		shuffle_deck = shuffleArray(shuffle_deck);
		var sh_lshift = 30;	
		if(shuffle_deck.length >= 7){
			for(var i = 0; i < 7; i++){
				$img = $('<img class ='+ shuffle_deck[i] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':20, 'left':sh_lshift});
			 	$img.attr('src', card_imgs[shuffle_deck[i]]);
			 	$('#sample-hand-body').append($img);
			 	sh_lshift += 130;			
			 }
		}
		else{
			$('#sample-hand-body').append('<p>Not enough cards in your deck to make a sample hand!</p>');
		}
	});
	$("#draw_card").click(function(){
		console.log(card_to_draw);
		console.log(shuffle_deck);
		if(card_to_draw > 13){
			alert("Card drawing limit reached");
			card_to_draw = 7;
		}
		else{
			$img = $('<img class ='+ shuffle_deck[card_to_draw] + '>');
		 	$img.css({'height':'150px','position':'absolute', 'top':draw_tshift, 'left':draw_lshift});
		 	$img.attr('src', card_imgs[shuffle_deck[card_to_draw]]);
		 	$('#sample-hand-body').append($img);
		 	draw_lshift += 130;	
		 	card_to_draw++;	
		}
	});
	$('#content').click(function(e){	
	  var cname = e.target.getAttribute("class");
	  console.log(cards_info[cname]["price"]);
	  run_val -= cards_info[cname]["price"];
	  document.getElementById("running_val").innerHTML = "Total Price: $" + (run_val.toFixed(2)).toString();
      document.getElementById("content").removeChild(e.target);

  	});
});

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}

var cards_info ={
	"Forest":{"cmc":0,"color":0,"name":"Forest","price":.05},
	"Island":{"cmc":0,"color":0,"name":"Island","price":.05},
	"Mountain":{"cmc":0,"color":0,"name":"Mountain","price":.05},
	"Swamp":{"cmc":0,"color":0,"name":"Swamp","price":.05},
	"Plains":{"cmc":0,"color":0,"name":"Plains","price":.05},
	"Wasteland":{"cmc":0,"color":0,"name":"Wasteland","price":50.05},
	"Mutavault":{"cmc":0,"color":0,"name":"Mutavault","price":34.14},
	"Force of Will":{"cmc":5,"color":2,"name":"Force of Will","price":82.27}
}

var cards_html ={
	"Forest":"<img src='./images/forest.jpg' align='left' /><div><ul><li><b>Forest</b></li><li>Basic Land</li> \
<li>{T}: Add {G} to your mana pool.</li> \
<li><br>Legal in Vintage (Type 1)<br> Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/>Legal in Commander <br/> \
Legal in Modern</li></ul></div>",
	"Island":"<img src='./images/island.jpg' align='left' /><div><ul><li><b>Island</b></li><li>Basic Land</li> \
<li>{T}: Add {U} to your mana pool.</li><li>Legal in Vintage (Type 1)<br/> \
<br>Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Plains":"<img src='./images/plains.jpg' align='left' /><div><ul><li><b>Plains</b></li><li>Basic Land</li> \
<li>({T}: Add {W} to your mana pool.</li><li>Legal in Vintage (Type 1)<br/> \
<br>Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Mountain":"<img src='./images/mountain.jpg' align='left' /><div><ul><li><b>Mountain</b></li><li>Basic Land</li> \
<li>{T}: Add {R} to your mana pool.</li><li>Legal in Vintage (Type 1)<br/> \
<br>Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Swamp":"<img src='./images/swamp.jpg' align='left' /><div><ul><li><b>Swamp</b></li><li>Basic Land</li> \
<li>{T}: Add {B} to your mana pool.</li><li>Legal in Vintage (Type 1)<br/> \
Legal in Legacy (Type 1.5)<br/>Legal in Extended (Type 1.X) <br/> \
Legal in Standard (Type 2)<br/>Legal in Classic (MTGO) <br/> \
Legal in Commander <br/>Legal in Modern</li></ul></div>",
	"Wasteland":"<img src='./images/wasteland.jpg' align='left' /><div><ul><li><b>Wasteland</b></li>Land</li> \
<li>{T}:Add {1} to your mana pool.<br>{T},Sacrifice Wasteland: Destroy target nonbasic land.</li><li> \
<br>Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Mutavault":"<img src='./images/mutavault.jpg' align='left' /><div><ul><li><b>Mutavault</b></li>Land</li> \
<li>{T}:Add {1} to your mana pool.<br>{1}:Mutavault becomes a 2/2 creature with all creature types until end of turn. It's still a land.</li><li> \
<br>Legal in Modern<br>Legal in Commander</br></li></ul></div>",
	"Force of Will":"<img src='./images/fow.jpg' align='left' /><div><ul><li><b>Force of Will</b></li>Instant</li> \
<li>You may pay 1 life and exile a blue card from your hand rather than pay Force of Will's mana cost. \
<br><br>Counter target spell.</li><br><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Cursecatcher":"<img src='./images/cursecatcher.jpg' align='left' /><div><ul><li><b>Cursecatcher</b></li>Creature - Merfolk</li> \
<li>Sacrifice Cursecatcher: Counter target instant or sorcery spell unless its controlle pays {1}. \
<br><br>1/1</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
}
var card_imgs = {
	"Forest":"./images/forest.jpg",
	"Island":"./images/island.jpg",
	"Plains":"./images/plains.jpg",
	"Swamp":"./images/swamp.jpg",
	"Mountain":"./images/mountain.jpg",
	"Wasteland":"./images/wasteland.jpg",
	"Mutavault":"./images/mutavault.jpg",
	"Force of Will":"./images/fow.jpg",
	"Cursecatcher":"./images/cursecatcher.jpg"
}