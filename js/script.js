
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

var fish_legacy = {"Island":12,
				   "Wasteland":4,
				   "Mutavault":4,
				   "Cursecatcher":4,
				   "Silvergill Adept":4,
				   "Merrow Reejerey":4,
				   "Master of the Pearl Trident":4,
				   "Lord of Atlantis":4,
				   "Phantasmal Image":3,
				   "Force of Will":4,
				   "Daze":4,
				   "Dismember":2,
				   "Aether Vial":4,
				   "Standstill":3};

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
	 	var cname = cards_info[searchData]["name"];
	 	var len = $('.'+ cname).length;
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
	 	$img = $('<img id=on_table_img class =\''+ cname + '\'>');
	 	$img.css({'height':'150px', 'position':'absolute', 'top':tshift, 'left':lshift});
	 	$img.attr('src', $('#results_body img').attr('src'));
	 	$('#content').append($img);
	 	run_val += cards_info[searchData]["price"];
	 	document.getElementById("running_val").innerHTML = "Total Price: $" + (run_val.toFixed(2)).toString();
	 });
	 $('#add4').click(function(){
	 	var seen = false;
	 	var j;
	 	var cname = cards_info[searchData]["name"];
		 var len = $('.'+ cname).length;
		 for(j = 0; j < seenTypes.length; j++){
		 	console.log()
			if(seenTypes[j] == searchData){	 	
	 			seen = true;
	 			lshift= 130*j;
	 			deck[searchData]+=4;
		 	}
		 }
		 if(!seen){
		 	console.log("1");
		 	seenTypes.push(searchData);
		 	deck[searchData] = 4;
		 	lshift = 130 * (j);
		 } 
	 	for(var i = 0; i < 4; i++){
		 	len = $('.'+ cname).length;
		 	if(len != 0) tshift = 15 * (len+1);
		 	else{
		 		tshift = 15;	
		 	}
		 	$img = $('<img id=on_table_img class =\''+ cname + '\'>');
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
				lshift += 130;
				tshift = 15;	
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img id=on_table_img class ='+ cards_info[sorted_deck[i]]["name"] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[cards_info[sorted_deck[i]]["name"]]);
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
				prev_col = cards_info[sorted_deck[i]]["color"];
				lshift += 130;
				tshift = 15;
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img id=on_table_img class ='+ cards_info[sorted_deck[i]]["name"] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[cards_info[sorted_deck[i]]["name"]]);
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
		var prev_nam= cards_info[sorted_deck[0]]["name"];
		for(var i = 0; i < sorted_deck.length; i++){
			if(cards_info[sorted_deck[i]]["name"] != prev_nam){
				prev_cmc = cards_info[sorted_deck[i]]["cmc"];
				lshift += 130;
				tshift = 15;
			}
			for(var j = 0; j < deck[sorted_deck[i]]; j++){	
				$img = $('<img id=on_table_img class ='+ cards_info[sorted_deck[i]]["name"] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[cards_info[sorted_deck[i]]["name"]]);
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
				$img = $('<img class ='+ cards_info[shuffle_deck[i]]["name"] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':20, 'left':sh_lshift});
			 	$img.attr('src', card_imgs[cards_info[shuffle_deck[i]]["name"]]);
			 	$('#sample-hand-body').append($img);
			 	sh_lshift += 130;			
			 }
		}
		else{
			$('#sample-hand-body').append('<p>Not enough cards in your deck to make a sample hand!</p>');
		}
	});
	$("#draw_card").click(function(){
		if(card_to_draw > 13){
			alert("Card drawing limit reached");
			card_to_draw = 7;
		}
		else{
			$img = $('<img class ='+ cards_info[shuffle_deck[card_to_draw]]["name"] + '>');
		 	$img.css({'height':'150px','position':'absolute', 'top':draw_tshift, 'left':draw_lshift});
		 	$img.attr('src', card_imgs[cards_info[shuffle_deck[card_to_draw]]["name"]]);
		 	$('#sample-hand-body').append($img);
		 	draw_lshift += 130;	
		 	card_to_draw++;	
		}
	});
	$('#content').click(function(e){	
	  var cname = e.target.getAttribute("class");
	  cname = cname.replace(/-/g," ");
	  deck[cname]--;
	  run_val -= cards_info[cname]["price"];
	  document.getElementById("running_val").innerHTML = "Total Price: $" + Math.abs(run_val).toFixed(2).toString();
      document.getElementById("content").removeChild(e.target);

  	});
  	$('#clear_deck').click(function(e){
  		var images = document.getElementsByTagName('img');
		var l = images.length;
		for (var i = 0; i < l; i++) {
			images[0].parentNode.removeChild(images[0]);
		}
  		run_val = 0.00;
  		document.getElementById("running_val").innerHTML = "Total Price: $" + Math.abs(run_val).toFixed(2).toString();
  		deck ={};
  		seenTypes =[];
  		tshift = 15;
		lshift = 30;
		$("#stats_modal_body").append('<img id="stats_img" src=\'./images/stats.jpg\'/>');
  	});	
  	$("#lgcy_fish").click(function(){
  		var images = document.getElementsByTagName('img');
		var l = images.length;
		for (var i = 0; i < l; i++) {
		    images[0].parentNode.removeChild(images[0]);
		}
		tshift = 15;
		lshift = 0;
		var prev_cmc = 0;
		var sorted_deck = Object.keys(fish_legacy).sort(cmc_sort);
		deck = fish_legacy	;
		seenTypes = Object.keys(fish_legacy);
		console.log(deck);
		console.log(seenTypes);
		run_val = 0.0;
  		for(var i =0; i<sorted_deck.length;i++){
			if(cards_info[sorted_deck[i]]["cmc"] != prev_cmc){
				prev_cmc = cards_info[sorted_deck[i]]["cmc"];
				lshift += 130;
				tshift = 15;	
			}
			for(var j = 0; j < fish_legacy[sorted_deck[i]]; j++){	
				$img = $('<img id=on_table_img class ='+ cards_info[sorted_deck[i]]["name"] + '>');
			 	$img.css({'height':'150px','position':'absolute', 'top':tshift, 'left':lshift});
			 	$img.attr('src', card_imgs[cards_info[sorted_deck[i]]["name"]]);
			 	$('#content').append($img);
			 	tshift += 15;
			 	run_val -= cards_info[sorted_deck[i]]["price"];
	  			document.getElementById("running_val").innerHTML = "Total Price: $" + Math.abs(run_val).toFixed(2).toString();
			 }
		}
		$("#stats_modal_body").append('<img id="stats_img" src=\'./images/stats.jpg\'/>');
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
	"Force of Will":{"cmc":5,"color":2,"name":"Force-of-Will","price":82.27},
	"Cursecatcher":{"cmc":1,"color":2,"name":"Cursecatcher","price":3.56},
	"Silvergill Adept":{"cmc":2,"color":2,"name":"Silvergill-Adept","price":1.39},
	"Merrow Reejerey":{"cmc":3,"color":2,"name":"Merrow-Reejerey","price":3.10},
	"Master of the Pearl Trident":{"cmc":2,"color":2,"name":"Master-of-the-Pearl-Trident","price":1.69},
	"Lord of Atlantis":{"cmc":2,"color":2,"name":"Lord-of-Atlantis","price":4.86},
	"Phantasmal Image":{"cmc":2,"color":2,"name":"Phantasmal-Image","price":4.76},
	"Daze":{"cmc":2,"color":2,"name":"Daze","price":2.70},
	"Dismember":{"cmc":3,"color":3,"name":"Dismember","price":.6},
	"Aether Vial":{"cmc":1,"color":0,"name":"Aether-Vial","price":16.43	},
	"Standstill":{"cmc":2,"color":2,"name":"Standstill","price":5.79},
	"Llanowar Elves":{"cmc":1,"color":5,"name":"Llanowar-Elves","price":.18},
	"Grizzly Bears":{"cmc":2,"color":5,"name":"Grizzly-Bears","price":.16},
	"Giant Growth":{"cmc":1,"color":5,"name":"Giant-Growth","price":.16},
	"Lightning Bolt":{"cmc":1,"color":4,"name":"Lightning-Bolt","price":.98},
	"Stone Rain":{"cmc":3,"color":4,"name":"Stone-Rain","price":.17},
	"Ball Lightning":{"cmc":3,"color":4,"name":"Ball-Lightning","price":2.33},
	"Doom Blade":{"cmc":2,"color":3,"name":"Doom-Blade","price":.23	},
	"Festering Goblin":{"cmc":2,"color":3,"name":"Festering-Goblin","price":.23},
	"Wrath of God":{"cmc":4,"color":1,"name":"Wrath-of-God","price":9.41},
	"Serra Angel":{"cmc":5,"color":1,"name":"Serra-Angel","price":.19},
	"Savannah Lions":{"cmc":1,"color":1,"name":"Savanna-Lions","price":1.17}
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
<br>Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Mutavault":"<img src='./images/mutavault.jpg' align='left' /><div><ul><li><b>Mutavault</b></li>Land</li> \
<li>{T}:Add {1} to your mana pool.<br>{1}:Mutavault becomes a 2/2 creature with all creature types until end of turn. It's still a land.</li><li> \
<br>Legal in Modern<br>Legal in Commander</br></li></ul></div>",
	"Force of Will":"<img src='./images/fow.jpg' align='left' /><div><ul><li><b>Force of Will</b></li>Instant</li> \
<li>You may pay 1 life and exile a blue card from your hand rather than pay Force of Will's mana cost. \
<br><br>Counter target spell.</li><br><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Cursecatcher":"<img src='./images/cursecatcher.jpg' align='left' /><div><ul><li><b>Cursecatcher</b></li>Creature - Merfolk Wizard</li> \
<li>Sacrifice Cursecatcher: Counter target instant or sorcery spell unless its controlle pays {1}. \
<br><br>1/1</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Silvergill Adept":"<img src='./images/silvergill.jpg' align='left' /><div><ul><li><b>Silvergill Adept</b></li>Creature - Merfolk Wizard</li> \
<li>As an additional cost to play Silvergill Adept, reveal a Merfolk card from your hand or pay {3}.\
<br>When Silvergill Adept comes into play, draw a card<br><br>2/1</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5<)/br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Merrow Reejerey":"<img src='./images/merrow.jpg' align='left' /><div><ul><li><b>Merrow Reejerey</b></li>Creature - Merfolk Soldier</li> \
<li>Other Merfolk creatures you control get +1/+1.\
<br>Whenever you play a Merfolk spell, you may tap or untap target permananent.<br><br>2/2</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Master of the Pearl Trident":"<img src='./images/master_trident.jpg' align='left' /><div><ul><li><b>Master of the Pearl Trident</b> \
</li>Creature - Merfolk</li> \
<li>Other Merfolk creatures you control get +1/+1 and have Islandwalk.\
<br><br>2/2</li><br><li>Legal in Standard (Type 2)</li><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)</li><li>Legal in Classic (MTGO)</li> \
Legal in Commander</br></li></ul></div>",
	"Lord of Atlantis":"<img src='./images/lord_atlantis.jpg' align='left' /><div><ul><li><b>Lord of Atlantis</b> \
</li>Creature - Merfolk</li> \
<li>Other Merfolk creatures you control get +1/+1 and have Islandwalk.\
<br><br>2/2</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Phantasmal Image":"<img src='./images/phantasmal.jpg' align='left' /><div><ul><li><b>Phantasmal Image</b> \
</li>Creature - Illusion</li> \
<li>You may have Phantasmal Image enter the battlefield as a copy of any creature on the battlefield, except it's an \
Illusion in addition to its other types and it gains \
\"When this creature becomes the target of a spell or ability, sacrifice it.\"\
<br><br>0/0</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Daze":"<img src='./images/daze.jpg' align='left' /><div><ul><li><b>Daze</b></li>Instant</li> \
<li>You may return an Island you control to its owner's hand rather than pay Daze's mana cost. \
<br><br>Counter target spell unless its controller pays {1}.</li><br><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Dismember":"<img src='./images/dismember.jpg' align='left' /><div><ul><li><b>Dismember</b></li>Instant</li> \
<li>Target creature gets -5/-5 until end of turn.</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</br>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Aether Vial":"<img src='./images/vial.jpg' align='left' /><div><ul><li><b>Aether Vial</b> \
</li>Artifact</li> \
<li>At the beginning of your upkeep, you may put a charge counter on Aether Vial.<br>\
{T}: You may put a creature card with converted mana cost equal to the number of \
charge counters on Aether Vial from your hand onto the battlefield.\
<br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Standstill":"<img src='./images/standstill.jpg' align='left' /><div><ul><li><b>Standstill</b> \
</li>Enchantment</li> \
<li>When a player casts a spell, sacrifice Standstill. If you do, each of that player's opponents draws three cards.\
<br><li>Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Llanowar Elves":"<img src='./images/llanowar.jpg' align='left' /><div><ul><li><b>Llanowar Elves</b> \
</li>Creature - Elf Druid</li> \
<li>{T}:Add {G} to your mana pool.\
<br><br>1/1</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Grizzly Bears":"<img src='./images/grizzly.jpg' align='left' /><div><ul><li><b>Grizzly Bears</b> \
</li>Creature - Bear</li> \
<li><br><br>2/2</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Giant Growth":"<img src='./images/ggrowth.jpg' align='left' /><div><ul><li><b>Giant Growth</b> \
</li>Instant</li> \
<li>Target creature gets +3/+3 until end of turn. <br><br></li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)<li>Legal in Standard (Type 2)<br/></li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Lightning Bolt":"<img src='./images/bolt.jpg' align='left' /><div><ul><li><b>Lightning Bolt</b> \
</li>Instant</li> \
<li>Lightning Bolt deals 3 damage to target creature or player.\
<li><br></li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Stone Rain":"<img src='./images/rain.jpg' align='left' /><div><ul><li><b>Stone Rain</b> \
</li>Stone Rain</li> \
<li>Destroy target land.\
<li><br></li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Ball Lightning":"<img src='./images/ball.jpg' align='left' /><div><ul><li><b>Ball Lightning</b> \
</li>Creature - Elemental</li> \
<li>Trample, Haste <br>At the beginning of the end step, sacrifice Ball Lightning.\
<li><br></li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)	</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Doom Blade":"<img src='./images/dblade.jpg' align='left' /><div><ul><li><b>Doom Blade</b> \
</li>Instant</li> \
<li>Destroy target nonblack creature.</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)</li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Festering Goblin":"<img src='./images/fgoblin.jpg' align='left' /><div><ul><li><b>Festering Goblin</b> \
</li>Creature - Zombie Goblin</li> \
<li>When Festering Goblin dies, target creature gets -1/-1 until end of turn.<br>1/1</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Wrath of God":"<img src='./images/wog.jpg' align='left' /><div><ul><li><b>Wrath of God</b> \
</li>Sorcery</li> \
<li>Destroy all creatures. They can't be regenerated.</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Classic (MTGO) <br> \
Legal in Commander</br></li></ul></div>",
	"Serra Angel":"<img src='./images/serra_angel.jpg' align='left' /><div><ul><li><b>Serra Angels</b> \
</li>Creature - Angel</li> \
<li>Flying, Vigilance.\
<br><br>4/4</li><br><li>Legal in Standard (Type 2)</li><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Extended (Type 1.X)</li><li>Legal in Classic (MTGO)</li> \
Legal in Commander</br></li></ul></div>",
	"Savannah Lions":"<img src='./images/slions.jpg' align='left' /><div><ul><li><b>Savannah Lions</b> \
</li>Creature - Angel</li> \
<li><br>2/1</li><br><li>Legal in Modern</li><li> \
Legal in Vintage (Type 1)<br>Legal in Legacy (Type 1.5)<li>Legal in Classic (MTGO)</li> \
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
	"Force-of-Will":"./images/fow.jpg",
	"Cursecatcher":"./images/cursecatcher.jpg",
	"Phantasmal-Image":"./images/phantasmal.jpg",
	"Silvergill-Adept":"./images/silvergill.jpg",
	"Merrow-Reejerey":"./images/merrow.jpg",
	"Master-of-the-Pearl-Trident":"./images/master_trident.jpg",
	"Lord-of-Atlantis":"./images/lord_atlantis.jpg",
	"Daze":"./images/daze.jpg",
	"Dismember":"./images/dismember.jpg",
	"Aether-Vial":"./images/vial.jpg",
	"Standstill":"./images/standstill.jpg",
	"Llanowar-Elves":"./images/llanowar.jpg",
	"Grizzly-Bears":"./images/grizzly.jpg",
	"Giant Growth":"./images/ggrowth.jpg",
	"Lightning-Bolt":"./images/bolt.jpg",
	"Stone-Rain":"./images/rain.jpg",
	"Ball-Lightning":"./images/ball.jpg",
	"Doom-Blade":"./images/dblade.jpg",
	"Festering-Goblin":"./images/fgoblin.jpg",
	"Wrath-of-God":"./images/wog.jpg",
	"Serra-Angel":"./images/serra_angel.jpg",
	"Savanna-Lions":"./images/slions.jpg"
}