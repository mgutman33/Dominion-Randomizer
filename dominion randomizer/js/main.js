var app = angular.module('trekApp', []);
app.controller('trekController', function($scope) {

	//Call the json variable, and turn it into an object with Angular.
	$scope.shipList = angular.fromJson(fleet);

	//Get the default ship, which is always ID = 0, or the 0th record.
	$scope.selectedShip = $scope.shipList[0];
});

//App and controller for the Dominion Randomizer.
var dominion = angular.module('dominion',[]);
dominion.controller('dominionController', function($scope){
	$scope.setDefaults = function(colPlat, shelters, events, landmarks, react, spread){
		$scope.colPlat = colPlat;
		$scope.shelters = shelters;
		$scope.events = events;
		$scope.landmarks = landmarks;
		$scope.react = react;
		$scope.spread = spread;
	};
	$scope.setDefaults("pros", "da", "two", "one", true, true);

	$scope.allCards = angular.fromJson(cardsJSON);

	//Create array of objects of all sets and define their defauls.
	$scope.expansions = [
		{name: "Dominion", status: true},
		{name: "Intrigue", status: true},
		{name: "Seaside", status: true},
		{name: "Alchemy", status: true},
		{name: "Prosperity", status: true},
		{name: "Cornucopia", status: true},
		{name: "Hinterlands", status: true},
		{name: "Dark Ages", status: true},
		{name: "Guilds", status: true},
		{name: "Adventures", status: true},
		{name: "Empires", status: true}
	];

	//Function to filter the active expansions.
	function findActive(exp){
		return exp.status === true;
	}

	//Track special setup for things like Col/Plats, Shelters, Spoils, etc.
	$scope.setup = [];

	//By default, sort the cards by name.
	$scope.propName = 'name';

	function checkIfExists(currType){
		for (var i=0; i<$scope.setup.length; i++){
			if ($scope.setup[i].type === currType){
				return true;
				break;
			}
		}
		return false;
	};

	function addItemToSetup(type, message){
		if (!checkIfExists(type)){
			$scope.setup.push({"type": type, "message": message});
		}
	}

	//Functions for adding special setup items.
	function addShelters(){
		var type = "addShelters";
		var message = "Shelters";
		addItemToSetup(type, message);
	}
	function addColPlat(){
		var type="addColPlat";
		var message = "Colonies and Platinums";
		addItemToSetup(type, message);
	}
	function addSpoils(){
		var type="addSpoils";
		var message = "Spoils";
		addItemToSetup(type, message);
	}
	function addCoinTokens(){
		var type="addCoinTokens";
		var message = "Coin Tokens";
		addItemToSetup(type, message);
	}
	function addVPTokens(){
		var type="addVPTokens";
		var message = "Victory Tokens";
		addItemToSetup(type, message);
	}
	function addTavernMat(){
		var type="addTavernMat";
		var message = "Taven Mats";
		addItemToSetup(type, message);
	}
	function addDebt(){
		var type="addDebt";
		var message = "Debt Tokens";
		addItemToSetup(type, message);
	}
	function addPotions(){
		var type="addPotions";
		var message = "Potions";
		addItemToSetup(type, message);
	}

	//Single special card setup.
	function addTradeMat(){
		var type="addTradeMat";
		var message = "Trade Route Mat";
		addItemToSetup(type, message);
	}
	function addPirateMat(){
		var type="addPirateMat";
		var message = "Pirate Ship Mat";
		addItemToSetup(type, message);
	}
	function addBaker(){
		var type="addBaker";
		var message = "Each player starts with one coin token.";
		addItemToSetup(type, message);
	}

	//Adventures Tokens
	function addTrashingToken(){
		var type="addTrashingToken";
		var message = "Trashing Token";
		addItemToSetup(type, message);
	}
	function addEstateToken(){
		var type="addEstateToken";
		var message = "Estate Token";
		addItemToSetup(type, message);
	}
	function addJourneyToken(){
		var type="addJourneyToken";
		var message = "Journey Token";
		addItemToSetup(type, message);
	}
	function addMinusCostToken(){
		var type="addMinusCostToken";
		var message = "-2 Cost Token";
		addItemToSetup(type, message);
	}
	function addMinusOneCardToken(){
		var type="addMinusOneCardToken";
		var message = "Minus Card Token";
		addItemToSetup(type, message);
	}
	function addMinusOneCoinToken(){
		var type="addMinusOneCoinToken";
		var message = "-1 Coin Token ";
		addItemToSetup(type, message);
	}
	function addTeacher() {
		var type="addTeacher";
		var message = "The card Teacher (from Peasant) can use the +1 Coin, +1 Card, +1 Action, or +1 Buy Token.";
		addItemToSetup(type, message);
	}

	function addPlusBuyToken(){
		var type="addPlusBuyToken";
		var message = "Plus Buy Token";
		addItemToSetup(type, message);
	}

	function addPlusActionToken(){
		var type="addPlusActionToken";
		var message = "Plus Action Token";
		addItemToSetup(type, message);
	}

	function addPlusCoinToken(){
		var type="addPlusCoinToken";
		var message = "+1 Coin Token";
		addItemToSetup(type, message);
	}

	function addPlusCardToken(){
		var type="addPlusCardToken";
		var message = "+1 Card Token";
		addItemToSetup(type, message);
	}

	function addIslandMat() {
		var type="addIslandMat";
		var message="Island Mats";
		addItemToSetup(type,message);
	}

	function addRuins(){
		var type="addRuins";
		var message = "Ruins (10 per [number of players minus one])"
		addItemToSetup(type,message);
	}

	/*Function for checking the kingdom cards for special setup rules. Called after kingdom is
	picked. Includes events and landmarks. Can also be called after a card is replaced (future idea).*/
	function checkForKingdomSetup(kingdom){
		for (var i=0; i<kingdom.length; i++){
			//Single card setup. Checking card names.
			switch (kingdom[i].name) {
				case 'Pirate Ship':
					addPirateMat();
					break;
				case 'Trade Route':
					addTradeMat();
					break;
				case 'Baker':
					addBaker();
					break;
				//Adventures Tokens
				case 'Plan':
					addTrashingToken();
					break;
				case 'Inheritance':
					addEstateToken();
					break;
				case 'Ferry':
					addMinusCostToken();
					break;
				case 'Ranger':
				case 'Giant':
					addJourneyToken();
					break;
				case 'Relic':
				case 'Borrow':
				case 'Raid':
					addMinusOneCardToken();
					break;
				case 'Bridge Troll':
				case 'Ball':
					addMinusOneCoinToken();
					break;
				case 'Peasant':
					addTeacher();
					break;
				case 'Seaway':
					addPlusBuyToken();
					break;
				case 'Lost Arts':
					addPlusActionToken();
					break;
				case 'Training':
					addPlusCoinToken();
					break;
				case 'Pathfinding':
					addPlusCardToken();
					break;
				case 'Island':
					addIslandMat();
					break;
				case 'Miser':
					addTavernMat();
					break;
				case 'Gladiator/Fortune':
				case 'Capital':
				case 'Tax':
				case 'Mountain Pass':
					addDebt();
					break;
			}

			//Tokens and Taven Mat. Checking card properties other than name.
			if (kingdom[i].requires_coin_tokens === true){
				addCoinTokens();
			}
			if (kingdom[i].requires_vp_tokens === true){
				addVPTokens();
			}
			if (kingdom[i].cost_debt > 0){
				addDebt();
			}
			if (kingdom[i].is_reserve === true){
				addTavernMat();
			}
			if (kingdom[i].spoils === true){
				addSpoils();
			}
			if (kingdom[i].cost_potions > 0){
				addPotions();
			}
			if (kingdom[i].is_looter){
				addRuins();
			}
		}
	}
	//When the generate button is clicked.
	$scope.generate = function(){

		//Reset the special setup.
		$scope.setup = [];

		//Get an array of objects of all the active expansions.
		$scope.activeExpansions = $scope.expansions.filter(findActive);

		//Make sure at least one expansion is selected.
		if ($scope.activeExpansions.length > 0){
			//Get all the cards from the active sets.
			$scope.filteredCards = []; //Array of all cards in the active sets.
			var counter;
			var inner;
			//Loop through every card.
			for (counter = 0; counter < $scope.allCards.length; counter++){
				//..Future: Check if card is on blacklist..//

				//Inner loop for sets.
				for (inner = 0; inner < $scope.activeExpansions.length; inner++){
					//For each card, check if it is in any of the sets.
					if ($scope.allCards[counter].exp === $scope.activeExpansions[inner].name){
						//Reset the costSelected flag for each card.
						$scope.allCards[counter].costSelected = false;
						//If it is, add it to the new array of filtered cards.
						$scope.filteredCards.push($scope.allCards[counter]);
					}
				}
			}

			//Randomly pick 10 cards from the filteredCards.
			$scope.kingdom = []; //Array for the 10 Kingdom cards.
			var i; //counter.
			var currentCard; //Card in this iteration.
			var rand; //Store the random number generated since it will need to be used twice.
			var baneFlag = false; //Track if a Bane card will be needed.
			var attackNumber = 0; //Track number of attack cards.
			var reactionNumber = 0;
			var numberOfPros = 0; //Count the number of Prosperity cards.
			var numberOfDA = 0; //Count the number of Dark Ages cards.
			//If cost spread is true, use a variable for 2-5 costs of cards.
			var costTarget;
			var costCorrect;
			if ($scope.spread === true){
				costTarget = 2;
			}
			//Loop for the Kingdom.
			for (i=0; i<10; i++){

				//If spread it true, and cards costing 2-5 have not been picked yet then pick cards more specifically.
				if ($scope.spread === true && costTarget >= 2 && costTarget <= 5) {
					costCorrect = false;
					//Loop until the card of the right cost if found.
					while (costCorrect === false){
						//Get a random number from 0 to length of array.
						rand = Math.floor(Math.random() * $scope.filteredCards.length);
						//Get the card at the rand index.
						currentCard = $scope.filteredCards[rand];
						//Check if the currentCard has the cost we want.
						if (currentCard.cost_treasure === costTarget || currentCard.cost_debt === costTarget){
							//Used when removing cards later for reactions.
							currentCard.costSelected = true;

							//If it does, than we can break the loop.
							costCorrect = true;
							costTarget++;
						}
					}
				}
				//If spread it not true, or all cards 2-5 have been picked, pick randomly.
				else{
					//Get a random number from 0 to length of array.
					rand = Math.floor(Math.random() * $scope.filteredCards.length);
					//Get the card at the rand index.
					currentCard = $scope.filteredCards[rand];
					currentCard.costSelected = false;
				}

				//Add the the card picked randomly to the Kingdom
				$scope.kingdom.push(currentCard);
				//Remove the card picked from the array of cards in the correct expansions.
				$scope.filteredCards.splice(rand,1);

				//Check for Young Witch.
				if (baneFlag === false){
					if (currentCard.name === "Young Witch"){
						baneFlag = true;
					}
				}

				//Check if card is from Prosperity.
				if ($scope.colPlat === "pros" && currentCard.exp === "Prosperity"){
					numberOfPros++;
				}

				//Check if card is from Dark Ages.
				if ($scope.shelters === "da" && currentCard.exp === "Dark Ages"){
					numberOfDA++;
				}

				//Check if the card is an attack.
				if (currentCard.is_attack){
					attackNumber++;
				}
				//Check if the card is a reaction.
				if (currentCard.is_reaction){
					reactionNumber++;
				}
			}///End of Kingdom Picking loop.

			//******* REACTION IF ATTACK IS PRESENT *******//

			//If include reaction is true and there are no reactions, and at least one attack.
			if ($scope.react && reactionNumber < 1 && attackNumber > 0){
				//Check if there are any attacks.
				var reactionPool = $scope.filteredCards.slice(); //Make a copy of the filteredCards.
				var reactionFlag = false;
				var newReact; //This will be the new added reaction card.
				var removedFromKingdom; //This is the card that was removed.

				//Remove a random card from the kingdom.

				//If there is only one attack card, remove one non-attack from the kingdom, that was not cost selected.
				if (attackNumber === 1){
					while ($scope.kingdom.length > 9){
						rand = Math.floor(Math.random() * $scope.kingdom.length);
						if ($scope.kingdom[rand].is_attack === false && $scope.kingdom[rand].costSelected === false){
							removedFromKingdom = $scope.kingdom.splice(rand,1);
						}
					}
				}
				//Otherwise, just remove any non-cost selected card.
				else{
					var correctlyRemovedCard = false;
					while (correctlyRemovedCard === false){
						rand = Math.floor(Math.random() * $scope.kingdom.length);
						if ($scope.kingdom[rand].costSelected === false) {
							removedFromKingdom = $scope.kingdom.splice(rand,1);
							correctlyRemovedCard = true;
						}
					}
				}

				//Go through remaining cards in the kingdom.
				while(reactionFlag === false && reactionPool.length > 0){
					rand = Math.floor(Math.random() * reactionPool.length);
					newReact = reactionPool[rand];

					//Check if it's a reaction card.
					if (newReact.is_reaction){
						//If it is, flag it, and add it to the kingdom. Remove it from the filteredCards.
						reactionFlag = true;
						$scope.kingdom.push(newReact);
						$scope.filteredCards.splice(rand,1);
					}
					//If it's not a reaction card...
					else {
						//Remove that card from the reaction pool.
						reactionPool.splice(rand,1);
					}
				}
				//If all remaining cards are search but there are no reactions, display error message.
				if (reactionFlag === false){
					alert("No reaction card could be found in the sets specified.");
					//If this happens, return the card that was originally removed, otherwise there will not be enough cards.
					$scope.kingdom.push(removedFromKingdom[0]);
				}
			}

			//******* YOUNG WITCH AND BANE CARD *******//

			//Remove the is_bane property from previous generation.
			for (i=0; i<$scope.kingdom.length; i++){
				$scope.kingdom[i].is_bane = false;
			}

			var baneCard;

			var banePool = $scope.filteredCards.slice(); //Copy the remaining filteredCards.
			//If young witch is in the kingdom...
			while (baneFlag === true && banePool.length > 0){
				rand = Math.floor(Math.random() * banePool.length);
				//Pick the random card.
				baneCard = $scope.filteredCards[rand];
				//Remove it from the banePool.
				banePool.splice(rand,1);
				//Check if it is a suitable bane card.
				if ( (baneCard.cost_treasure === 3 || baneCard.cost_treasure === 2) && baneCard.cost_potions === 0){
					baneCard.is_bane = true;
					$scope.kingdom.push(baneCard);
					//Remove the card picked from the array of cards in the correct expansions.
					$scope.filteredCards.splice(rand,1);
					baneFlag = false;
				}
			}

			if (baneFlag){
				alert("A Bane card could not be found in the remaining selected cards. The card Young Witch from Cornucopia requires an 11th card be added to the Kingdom of cost 2 or 3. No cards are available that meet that critera.");
			}

			//Special setup for Colonies/Platinums.

			//Always On
			if ($scope.colPlat === "on"){
				addColPlat();
			}

			//Randomize Based on Prosperity Cards. If there are 2 or fewer Prosperity cards, don't use Colonies or Platinums.
			else if ($scope.colPlat === "pros"){
				//Make a copy of the Kingdom, so I don't accidentaly modify it.
				var countingKingdom = $scope.kingdom.slice();
				//If there are 7 or more Prosperity cards, use Colonies and Platinums.
				if (numberOfPros >= 7){
					addColPlat();
				}
				//If there more than 2 and less than 7 Prosperity cards, randomize based on number of cards.
				else if (numberOfPros > 2 && numberOfPros < 7){
					//Get a random number between 1 and size of kingdom (usually 10).
					rand = Math.ceil(Math.random() * countingKingdom.length);
					//If the random number is less than or equal to the number of Prosperity cards, include Colonines and Platinums.
					if (rand <= numberOfPros){
						addColPlat();
					}
				}
			}
			//Randomized based on first card.
			else if ($scope.colPlat === "first"){
				if ($scope.kingdom[0].exp==="Prosperity"){
					addColPlat();
				}
			}
			//Total Random. 40% chance of getting Colonines and Platinums.
			else if ($scope.colPlat === "rand"){
				if (Math.random() * 100 > 59 ){
					addColPlat();
				}
			}


			//Special Setup for shelters. Same as Coloines and Platinums above, see comments there.
			if ($scope.shelters === "on"){
				addShelters();
			}
			else if ($scope.shelters === "first"){
				if ($scope.kingdom[0].exp == "Dark Ages"){
					addShelters();
				}
			}

			else if ($scope.shelters === "rand"){
				//Aprox 40% chance.
				if (Math.random() * 100 > 59 ){
					addShelters();
				}
			}

			else if ($scope.shelters === "da"){
				//Make a copy of the Kingdom, so I don't accidentaly modify it.
				var countingKingdom = $scope.kingdom.slice();
				if (numberOfDA >= 7){
					addShelters();
				}
				else if (numberOfDA > 2 && numberOfPros < 7){
					rand = Math.ceil(Math.random() * countingKingdom.length);
					if (rand < numberOfDA){
						addShelters();
					}
				}
			}

			//Events and landmarks
			allLandmarksArray = angular.fromJson(landmarksJSON);
			allEventsArray = angular.fromJson(eventsJSON);



			//Combine the Kingdom, events, and landmarks into one array with everything? Or Pass all to function.
			checkForKingdomSetup($scope.kingdom);

			//Debugging number of cost selected cards.
			var m;
			var cc = 0;
			for (m=0;m<$scope.kingdom.length;m++){
				if ($scope.kingdom[m].costSelected){
					cc++;
				}
			}
			//console.log("Cost Selected Cards:" + cc);
		}

		//Show error if no expansions are selected.
		else {
			alert("At least one Expansion must be selected to randomize.");
		}

	};///End of Generate function.

	//Reordering:
	$scope.reorder = function(){
		$scope.propName = $scope.sortBy;
	}

});


//*********** END OF ANGULAR CODE ***********//

var cardHeight = 800; //This must match the SASS variable of the same name!
var splaySize = 60;

//Create a jQuery object of all the cards.
var $allcards = $(".big-wrap .container-fluid .card");

function afixCard($cardObj, indexNum){
	$cardObj.addClass('locked').css({"top" : splaySize * indexNum});
}

function unfixCard($cardObj, indexNum){
	$cardObj.removeClass('locked').css({"top" : cardHeight * indexNum});
}

/*Lock cards as you scroll.*/
function lockCards(){
	var i;
	//For each card, check if the point at which it should lock is reached.
	for (i = 1; i < $allcards.length; i++){
		if ( $(window).scrollTop() >= (cardHeight * i) - (splaySize * i) ){
			afixCard($allcards.eq(i), i);
		}
		else {
			unfixCard($allcards.eq(i),i);
		}
	}
}

//Handle when the top link for a card is clicked.
function scrollToCard($cardLink){
	//Get what card the link is in.
	var $parentCard = $cardLink.parents(".card");
	//This will store what number card it is.
	var cardNumber;
	if ($parentCard.hasClass('top-card')){
		//If it's the top card, just scroll back to the top.
		cardNumber = 0;
	}
	else if ($parentCard.hasClass('locked')){
		//If it is locked, get the number by the top value / splay size.
		cardNumber = parseInt($parentCard.css("top")) / splaySize;
	}
	else {
		//If it is not locked or the top card, divide by the cardHeight to get the number.
		cardNumber = parseInt($parentCard.css("top")) / cardHeight;
	}

	//Smooth scroll to the section.
	$('html, body').animate({
		  scrollTop: (cardNumber * cardHeight)
	}, 850);
}

function hintArrowScroll($arrow){
	var curCard = $arrow.parents(".card");
	scrollToCard(curCard.next(".card").find("a.section-anchor"));
}

function scrollAnimations($topTitle){
	if ( $(window).scrollTop() > 450){
		$(".portfolio-link").addClass("in-view");
	}
	if ( $(window).scrollTop() > 335) {
		$topTitle.addClass("repositioned");
	}
	else {
		$topTitle.removeClass("repositioned");
	}
}

//Variable for the loop.
var prevZ;
/*Set properties for each card except the first.
The 0th item is not modified here, so start the index at 1.*/
var i;
for (i = 1; i < $allcards.length; i++){
	//Get top and z-index of previous card.
	prevZ = parseInt($allcards.eq(i-1).css("z-index"));
	//Set the current card top to the previous + card hight, and the z-index to previous + 100.
	$allcards.eq(i).css({"top" : i * cardHeight, "z-index" : prevZ + 100});
}

//Document Ready
$(document).ready(function() {
	//Lock cards on load, and whenever there is a scroll, lock cards.
	lockCards();
	$(window).scroll(function(){
		lockCards();
		scrollAnimations($(".top-card h1"));
	});
	//When any section anchor is clicked, scroll it into view.
	$("a.section-anchor").click(function(event) {
		//Run function.
		scrollToCard($(this));
		event.preventDefault();
	});
	$(".hint-arrow>a").click(function(event) {
		hintArrowScroll($(this));
		event.preventDefault();
	});

	$('[data-toggle="tooltip"]').tooltip().css("cursor","pointer");
});
