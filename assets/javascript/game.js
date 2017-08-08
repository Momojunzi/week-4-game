$(document).ready(function() {
	var characterArr = [
		{
			name: "Luke Skywalker", 
			hp:120,
			attack: 5,
			defend: 20
		}, 
		{
			name: "ObiWan Kenobi", 
			hp: 140,
			attack: 5,
			defend: 20
		}, 
		{
			name: "Darth Vader", 
			hp: 180,
			attack: 5,
			defend: 20
		}, 
		{
			name:"Darth Sidious", 
			hp: 200,
			attack: 5,
			defend: 20
		}];

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
			for(var i=0; i<characterArr.length; i++) {
				if(characterArr[i].name === $(this).attr('id').split('-').join(' ')){
					var charIndex = i;
				}
			}
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
				for(var i=0; i<enemyArr.length; i++) {
				if(enemyArr[i].name === $(this).attr('id').split('-').join(' ')){
					var charIndex = i;
				}
			}
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
			var charhp = arr[i].hp;
			var charAttack = arr[i].attack;
			var charDefend = arr[i].defend;
			var charDiv = $('<div class="char-img-div col-xs-1 ' + team + '" id="' + arr[i].name.split(' ').join('-') + '">');
			charDiv.data({hp:charhp, attack: charAttack, defend: charDefend});
			charNameSplit = arr[i].name.split(' ');
			var charName = $('<div class="char-name"><p>' + charNameSplit[0] + '</p><p>' + charNameSplit[1] + '</p></div>');
			var hpdiv = $('<div class="char-hp">' + charhp + ' hp</div>');
			var charImage = $('<img>').attr({src: './assets/images/' + arr[i].name + '.jpg', class: 'char-img img-responsive'});
			charDiv.append(charName);
			charDiv.append(charImage);
			charDiv.append(hpdiv);
			$(parent).append(charDiv);
		}
	}









});