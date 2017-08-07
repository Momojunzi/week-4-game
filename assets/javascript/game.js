$(document).ready(function() {
	var characterArr = ["Luke Skywalker", "ObiWan Kenobi", "Darth Vader", "Darth Sidious", "Yoda", "Count Dooku",];
	var playerChosen = false;
	var defenderChosen = false;
	var playerChar;
	var defender;
	var enemyArr = characterArr;
	var playerhp;
	var defenderhp; 

	arrToDiv(characterArr, "#char-start-div");
	
	$('.char-img-div').on('click', function() {

		if(playerChosen === false) {
			var charIndex = characterArr.indexOf($(this).attr('id').split('-').join(' '));
			playerChar = enemyArr.splice(charIndex, 1);
			arrToDiv(playerChar, "#player-char-div", "player");
			arrToDiv(enemyArr, "#enemy-div", "enemy");
			$('#char-start-div').css({display: 'none'});
			$('#player-char-div, #enemy-div').css({display: 'block'});
			playerhp = $('.player').data('hp');
			playerChosen = true;
		} 

		$('.enemy').on('click', function() {
		
			if(defenderChosen === false) {
				var charIndex = enemyArr.indexOf($(this).attr('id').split('-').join(' '));
				defender = enemyArr.splice(charIndex, 1);
				$('#enemy-div').empty();
				arrToDiv(defender, '#defender-div', 'defender');
				arrToDiv(enemyArr, "#enemy-div", 'enemy');
				$('#defender-div').css({display: 'block'});
				defenderhp = $('.defender').data('hp');
				defenderChosen = true;
				console.log(playerhp, defenderhp);
			}
		});
	});

	function arrToDiv(arr, parent, team) {

		for(var i=0; i<arr.length; i++) {
			var charDiv = $('<div class="char-img-div col-xs-1 ' + team + '" id="' + arr[i].split(' ').join('-') + '">');
			charDiv.data('hp', Math.floor((Math.random() * 100) + 100));
			var charImage = $('<img>').attr({src: './assets/images/' + arr[i] + '.jpg', class: 'char-img img-responsive'});
			charDiv.append(charImage);
			$(parent).append(charDiv);
		}
	}









});