$(document).ready(function() {

	var characterArr = [
						{name: "Luke Skywalker",
						 hp: Math.floor((Math.random() * 100) + 100)}, 
						{name: "ObiWan Kenobi",
						 hp: Math.floor((Math.random() * 100) + 100)}, 
						{name: "Darth Vader",
						 hp: Math.floor((Math.random() * 100) + 100)}, 
						{name: "Darth Sidious",
			 			 hp: Math.floor((Math.random() * 100) + 100)}, 
						{name: "Yoda",
						 hp: Math.floor((Math.random() * 100) + 100)}, 						
						 {name: "Count Dooku",
						 hp: Math.floor((Math.random() * 100) + 100)}
						];
	var playerChosen = false;
	var playerChar;
	var enemyArr = characterArr;

	/*for(var i=0; i<characterArr.length; i++) {
		var charDiv = $('<div class="char-img-div col-xs-1" id="' + characterArr[i].split(' ').join('-') + '">');
		var charImage = $('<img>').attr({src: './assets/images/' + characterArr[i] + '.jpg', class: 'char-img img-responsive'});
		charDiv.append(charImage)
		$('#char-start-div').append(charDiv);
	}*/

	arrToDiv(characterArr, "#char-start-div");


	$('.char-img-div').on('click', function() {
		if(playerChosen === false) {
			var charIndex = characterArr.indexOf($(this).attr('id').split('-').join(' '));
			playerChar = enemyArr.splice(charIndex, 1);
			arrToDiv(playerChar, "#player-char-div");
			arrToDiv(enemyArr, "#enemy-div");
			$('#char-start-div').css({display: 'none'});
			$('#player-char-div, #enemy-div').css({display: 'block'});
			playerChosen === true;
			console.log(characterArr, playerChar, enemyArr, playerChar[0].hp);
		} 
	});

	function arrToDiv(arr, parent) {
		for(var i=0; i<arr.length; i++) {
			var charDiv = $('<div class="char-img-div col-xs-1" id="' + arr[i].name.split(' ').join('-') + '">');
			var charImage = $('<img>').attr({src: './assets/images/' + arr[i].name + '.jpg', class: 'char-img img-responsive'});
			charDiv.append(charImage);
			$(parent).append(charDiv);
		}
	}









});