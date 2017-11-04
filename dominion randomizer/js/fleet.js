//Version 1.0 8/18/16

/*
	{
		"id": ,
		"name" : ,
		"cost" : ,
		"speed" : ,
		"attack" : ,
		"diplomacy" : ,
		"capacity" : ,
		"currentDamage" : ,
		"text" : ,
		"affiliation" : ,
		"type" : ,
		"image" :
	}
*/

/*
Idea for future: Create a funtion for ship text that might effect mission or event outcomes. For example, on Delta Flyer, create a checkbox for 'Navigation on bridge'.
*/

var fleet = 
[
	{
		"id": 0,
		"name" : "Default Starship",
		"cost" : 0,
		"speed" : 0,
		"attack" : 0,
		"diplomacy" : 0,
		"capacity" : 8,
		"currentDamage" : 0,
		"text" : "",
		"affiliation" : "",
		"type" : "Constellation Class",
		"image" : ""
	},
	
	{
		"id":1,
		"name" : "Delta Flyer",
		"cost" : 6,
		"speed" : 2,
		"attack" : 2,
		"diplomacy" : 0,
		"capacity" : 5,
		"currentDamage" : 0,
		"text" : "Once per turn, you may discard a card from your hand to gain 1XP. If you have a character with 'Navigation' on your bridge, this ship gets +1 speed.",
		"affiliation" : "Federation",
		"type" : "Delta Class Shuttle",
		"image" : "https://fromthedeltaquadrant.files.wordpress.com/2012/09/delta_flyer_1024.jpg"
	},
	{
		"id": 2,
		"name" : "USS Orinoco",
		"cost" : 6,
		"speed" : 2,
		"attack" : 1,
		"diplomacy" : 0,
		"capacity" : 6,
		"currentDamage" : 0,
		"text" : "At the end of your turn, if you have a character with 'Science' or 'Engineering' on your bridge you may trash this card and gain a ship from the shipyard costing up to 8XP.",
		"affiliation" : "Federation",
		"type" : "Danube class",
		"image" : "http://vignette3.wikia.nocookie.net/memoryalpha/images/8/8a/USS_Rubicon.jpg/revision/latest?cb=20080328035812&path-prefix=en"
	},
	{
		"id": 3,
		"name" : "USS Enterprise D",
		"cost" : 10,
		"speed" : 4,
		"attack" : 4,
		"diplomacy" : 3,
		"capacity" : 10,
		"currentDamage" : 0,
		"text" : "Once per turn, if this ship is about to be destoryed, you may discard one manuver or setup from your hand to perform 'Saucer Separation'. Set aside Enterprise, and take 'Saucer Section' card as your flagship. You are not destoryed, and immediatly end your turn.",
		"affiliation" : "Federation",
		"type" : "Galaxy Class",
		"image" : ""
	},
	{
		"id": 4,
		"name" : "Aldara",
		"cost" : 8,
		"speed" : 3,
		"attack" : 4,
		"diplomacy" : 0,
		"capacity" : 9,
		"currentDamage" : 0,
		"text" : "Once per turn, a Maneuver from Starbase costs you one less XP.",
		"affiliation" : "Cardassian Union",
		"type" : "Galor Class",
		"image" : ""
	}
];