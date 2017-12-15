//App and controller for the Dominion Randomizer.
var dominion = angular.module('dominion',[]);
dominion.controller('dominionController', function($scope){
	$scope.setDefaults = function(colPlat, shelters, eventsAdventures, eventsEmpires, events, landmarks, react, spread, aprule){
		$scope.colPlat = colPlat;
		$scope.shelters = shelters;
		$scope.eventsAdventures = eventsAdventures;
		$scope.eventsEmpires = eventsEmpires;
		$scope.events = events;
		$scope.landmarks = landmarks;
		$scope.react = react;
		$scope.spread = spread;
		$scope.aprule = aprule;
	};
	$scope.setDefaults("pros", "da", true, true, 2, 1, true, true, true);

	$scope.allCards = angular.fromJson(cardsJSON);

	//Create array of objects of all sets and define their defauls.
	$scope.expansions = [
		{name: "Dominion", status: true},
		{name: "Intrigue", status: true},
		{name: "Seaside", status: false},
		{name: "Alchemy", status: false},
		{name: "Prosperity", status: true},
		{name: "Cornucopia", status: true},
		{name: "Hinterlands", status: true},
		{name: "Dark Ages", status: true},
		{name: "Guilds", status: true},
		{name: "Adventures", status: true},
		{name: "Empires", status: true}
	];

	$scope.dominionEdition = "both";
	$scope.intrigueEdition = "both";

	//Function to filter the active expansions.
	function findActive(exp){
		return exp.status === true;
	}

	//Track special setup for things like Col/Plats, Shelters, Spoils, etc.
	$scope.setup = [];

	//By default, sort the cards by name.
	$scope.propName = 'name';
	//Setting this here correctly populates the drop down for sorting with the correct default value.
	$scope.sortBy = $scope.propName;

	//Events and landmarks
	var allLandmarksArray = angular.fromJson(landmarksJSON);
	var allEventsArray = angular.fromJson(eventsJSON);

	//This will store the landmarks for the current game.
	$scope.gameLandmarks = [];

	$scope.gameEvents= [];

	//Check the indexes of an expansion. Specifically used when showing or hiding the drop downs for editions of Dominion and Intrigue.
	$scope.getExpIndex = function getExpIndex(expName){
		for (var i=0; i<$scope.expansions.length; i++){
			if ($scope.expansions[i].name === expName){
				return i;
			}
		}
	}

	//This function picks a landmark given the number to pick and the given array of landmarks.
	function pickLandmark(numberOfLandmarks, allLandmarksArray){
		var i = 0;
		//Need to copy the array here, otherwise when the card is removed, it is removed permanently.
		var lma = allLandmarksArray.slice();
		//Loop once for each landmark.
		for (i=0; i<numberOfLandmarks; i++){
			//Get a random card from the array of all the Landmarks.
			rand = Math.floor(Math.random() * lma.length);
			var currLandmark = lma[rand];
			//Remove the landmark from the array of all of them.
			lma.splice(rand,1);

			//Add the Landmark that was picked to the game.
			$scope.gameLandmarks.push(currLandmark);
		}
	}

	//To pick Events.
	function pickEvents(numberOfEvents, allEventsArray){
		//Have to make a copy of the array here otherwise it modifies the original when spliced.
		var aea = allEventsArray.slice();
		var i = 0;
		var currEvent;
		//Keep picking until the right number of events are picked.
		while(numberOfEvents > $scope.gameEvents.length){
			rand = Math.floor(Math.random() * aea.length);
			currEvent = aea[rand];
			if ($scope.eventsAdventures && currEvent.set === "Adventures"){
				aea.splice(rand,1);
				$scope.gameEvents.push(currEvent);
			}
			else if ($scope.eventsEmpires && currEvent.set === "Empires"){
				aea.splice(rand,1);
				$scope.gameEvents.push(currEvent);
			}
		}
	}

	//This fuction checks the setup, and sees if the current setup instructions have already been added.
	function checkIfExists(currType){
		for (var i=0; i<$scope.setup.length; i++){
			if ($scope.setup[i].type === currType){
				return true;
				break;
			}
		}
		return false;
	};

	//This adds the setup to the setup array if if has not been added already.
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
		var message = "Tavern Mats";
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
		var message = "Trade Route Mat and tokens on each Victory Supply pile.";
		addItemToSetup(type, message);
	}
	function addPirateMat(){
		var type="addPirateMat";
		var message = "Pirate Ship Mat and tokens.";
		addItemToSetup(type, message);
	}
	function addBaker(){
		var type="addBaker";
		var message = "Each player starts with one coin token.";
		addItemToSetup(type, message);
	}
	function addEmbargo(){
		var type="addEmbargo";
		var message = "Embargo Tokens"
		addItemToSetup(type, message);
	}
	function addTournament(){
		var type="addTournament";
		var message="Prize pile"
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

	function addYoungWitch(){
		var type="addYoungWitch";
		var message="Bane card, see card in dashed border above.";
		addItemToSetup(type, message);
	}

	/*Function for checking the kingdom cards for special setup rules. Called after kingdom is
	picked. Includes events and landmarks. Can also be called after a card is replaced (future idea).*/
	function checkForSetup(kingdom, landmarks, events){
		var allGameCards = kingdom.concat(landmarks.concat(events));
		for (var i=0; i<allGameCards.length; i++){
			//Single card setup. Checking card names.
			switch (allGameCards[i].name || allGameCards[i].card) {
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
				case 'Pilgrimage':
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
					addDebt();
					break;
				case 'Embargo':
					addEmbargo();
					break;
				case 'Tournament':
					addTournament();
					break;
				case 'Young Witch':
					addYoungWitch();
					break;
				//All the landmarks that need VP tokens (except Mountain Pass):
				case 'Aqueduct':
				case 'Arena':
				case 'Basilica':
				case 'Baths':
				case 'Battlefield':
				case 'Colonnade':
				case 'Defiled Shrine':
				case 'Labyrinth':
				case 'Tomb':
				//VPToken cards from events.
				case 'Ritual':
				case 'Salt the Earth':
				case 'Conquest':
				case 'Dominate':
					addVPTokens();
					break;
			}

			//Special case for Landmark 'Mountain Pass' since it needs Debt AND VP Tokens.
			if (allGameCards[i].card === "Mountain Pass"){
				addVPTokens();
				addDebt();
			}
			//Tokens and Tavren Mat. Checking card properties other than name.
			if (allGameCards[i].requires_coin_tokens === true){
				addCoinTokens();
			}
			if (allGameCards[i].requires_vp_tokens === true){
				addVPTokens();
			}
			if (allGameCards[i].cost_debt > 0 || allGameCards[i].debt > 0){
				addDebt();
			}
			if (allGameCards[i].is_reserve === true){
				addTavernMat();
			}
			if (allGameCards[i].spoils === true){
				addSpoils();
			}
			if (allGameCards[i].cost_potions > 0){
				addPotions();
			}
			if (allGameCards[i].is_looter){
				addRuins();
			}
		}
	}

	//Simple function for getting random integrers.
	function getRandomIntInclusive(min, max) {
		min = Math.ceil(min);
		max = Math.floor(max);
		return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive
	}

	//When the generate button is clicked.
	$scope.generate = function(){

		//Reset the special setup.
		$scope.setup = [];

		//Get an array of objects of all the active expansions.
		$scope.activeExpansions = $scope.expansions.filter(findActive);

		//Make sure at least one expansion is selected.
		if ($scope.activeExpansions.length > 0){

			//Make sure the event setup is sane.
			if (! ($scope.eventsEmpires === false && $scope.eventsAdventures === false && $scope.events != 0)){

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
							//If it is in the set, add it to the new array of filtered cards.
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

				//For Alchemy picking rules.
				var numberOfAlch = 0; //Count the number of Alchemy cards.
				if ($scope.aprule === true){
					var targetAlchCards = getRandomIntInclusive(3,5);
					//console.log(targetAlchCards);
				}
				var alchCardPicked = false;


				//If cost spread is true, use a variable for 2-5 costs of cards.
				var costTarget;
				var costCorrect;
				if ($scope.spread === true){
					costTarget = 2;
				}
				//Loop for the Kingdom. Kingdom is always 10 cards (for now).
				for (var i=0; i<10; i++){

					//If spread it true, and cards costing 2-5 have not been picked yet then pick cards more specifically.
					if ($scope.spread === true && costTarget >= 2 && costTarget <= 5) {
						costCorrect = false;
						//Loop until the card of the right cost is found.
						var cardsForCostPicking = $scope.filteredCards.slice();
						while (costCorrect === false){
							if (cardsForCostPicking.length > 0){
								//Get a random number from 0 to length of array.
								rand = Math.floor(Math.random() * cardsForCostPicking.length);
								//Get the card at the rand index.
								currentCard = cardsForCostPicking[rand];
								//Check if the currentCard has the cost we want. Decided to not count cards with a potion in the cost, but do count cards with the right debt value.
								if ( (currentCard.cost_treasure === costTarget || currentCard.cost_debt === costTarget) && currentCard.cost_potions != 1 ){
									//Used when removing cards later for reactions.
									currentCard.costSelected = true;

									//If it does, than we can break the loop.
									costCorrect = true;
									costTarget++;
								}
								else{
									//Remove the card from the list of potential cards. This is to avoid an error where no cards of the right cost are available.
									cardsForCostPicking.splice(rand,1)
								}
							}
							else{ //If no cards of the right cost can be found. Adds the last card selected above (which is random).
								alert("No card of cost "+ costTarget + " could be found. Adding Random card instead.");
								costCorrect = true;
								costTarget++; //This is needed, otherwise it keeps looping.
							}
						}///Loop!
						if (currentCard.exp	=== "Alchemy"){
							numberOfAlch++;
						}
					}
					//This is if Alechmy Picking (3 to 5 alchmey cards) is enabled.
					/*I wanted to make the end of the kingdom the part where the alchmey cards are picked.*/
					else if ($scope.kingdom.length >= (10 - targetAlchCards)  && numberOfAlch < targetAlchCards && $scope.expansions[($scope.getExpIndex("Alchemy"))].status===true && $scope.aprule===true){
						alchCardPicked = false;
						while (alchCardPicked === false){
							rand = Math.floor(Math.random() * $scope.filteredCards.length);
							currentCard = $scope.filteredCards[rand];
							if (currentCard.exp === 'Alchemy'){
								numberOfAlch++; //This had to be within the loop for all picking schemes.
								alchCardPicked=true;
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
						if (currentCard.exp	=== "Alchemy"){
							numberOfAlch++;
						}
					}

					//Add the the card picked randomly to the Kingdom
					$scope.kingdom.push(currentCard);

					//This loop is for removing the right card from the array of filtered cards.
					var foundCard = false;
					currentCardIndex = 0;
					while (foundCard===false){
						if (currentCard.name === $scope.filteredCards[currentCardIndex].name){
							foundCard=true;
						}
						else{
							currentCardIndex++;
						}
					}

					//Remove the card picked from the array of cards in the correct expansions.
					$scope.filteredCards.splice(currentCardIndex,1);

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

					/*Dealing with an edge case where alchmey picking ruels are in effect and there
					were exactly three Alchmey cards picked. In this case, an Alchmey card should not
					be replaced in the kingdom with a reaction.*/
					var shouldPickAlch = true;
					if (numberOfAlch === 3 && $scope.aprule === true){
						shouldPickAlch = false;
					}

					//If there is only one attack card, remove one non-attack from the kingdom, that was not cost selected.
					if (attackNumber === 1){
						while ($scope.kingdom.length > 9){
							rand = Math.floor(Math.random() * $scope.kingdom.length);
							if ($scope.kingdom[rand].is_attack === false && $scope.kingdom[rand].costSelected === false){
								if ($scope.kingdom[rand].exp === "Alchemy" && shouldPickAlch === false){
									//In this case, don't replace an Alchmey card.
								}
								else{
									removedFromKingdom = $scope.kingdom.splice(rand,1);
								}
							}
						}
					}
					//Otherwise, just remove any non-cost selected card.
					else{
						var correctlyRemovedCard = false;
						while (correctlyRemovedCard === false){
							rand = Math.floor(Math.random() * $scope.kingdom.length);
							if ($scope.kingdom[rand].costSelected === false) {
								if ($scope.kingdom[rand].exp === "Alchemy" && shouldPickAlch === false){
									//In this case, don't replace an Alchmey card.
								}
								else{
									removedFromKingdom = $scope.kingdom.splice(rand,1);
									correctlyRemovedCard = true;
								}
							}
						}
					}

					//Go through remaining cards in the kingdom to look for reaction cards.
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

				//LANDMARKS
				$scope.gameLandmarks = []; //Reset this games Landmarks.

				//If 'random' is selected for landmarks, randomly choose between 2,1, and 0 landmarks.
				if ($scope.landmarks == "rand"){
					pickLandmark(getRandomIntInclusive(0,2), allLandmarksArray);
				}
				//If a number and not 'random' was picked, go to the function.
				else{
					pickLandmark($scope.landmarks, allLandmarksArray);
				}

				//EVENTS
				$scope.gameEvents = [];

				if ($scope.events=="rand"){
					pickEvents(getRandomIntInclusive(0,2), allEventsArray);
				}
				else{
					pickEvents($scope.events, allEventsArray);
				}

				//Combine the Kingdom, events, and landmarks into one array with everything? Or Pass all to function.
				checkForSetup($scope.kingdom, $scope.gameLandmarks, $scope.gameEvents);

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
			//Error checking if no type of Events are in use.
			else{
				alert("If Events are in use, 'Adventures Events' or 'Empires Events'  must be selected.");
			}
		}

		//Show error if no expansions are selected.
		else {
			alert("At least one Expansion must be selected to randomize.");
		}

	};///End of Generate function.

	//Reordering cards in the list:
	$scope.reorder = function(){
		$scope.propName = $scope.sortBy;
	}

});


//*********** END OF ANGULAR CODE ***********//

//Document Ready
$(document).ready(function() {
	/*These move the select boxes for editions into the proper place in the expansions list. I could not find any
	other way to position them the way I wanted, without having them repeat for each item. This caused problems
	wiht angularJS.*/
	$("#domEdSel").detach().prependTo(".exp-list .Dominion");
	$("#intrigueEdSel").detach().prependTo(".exp-list .Intrigue");
});

//Old code from a different page.
/**
var app = angular.module('trekApp', []);
app.controller('trekController', function($scope) {

	//Call the json variable, and turn it into an object with Angular.
	$scope.shipList = angular.fromJson(fleet);

	//Get the default ship, which is always ID = 0, or the 0th record.
	$scope.selectedShip = $scope.shipList[0];
});**/
