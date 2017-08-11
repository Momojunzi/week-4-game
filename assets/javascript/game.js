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
	var defender= [];
	var enemyArr = characterArr;
	var playerhp;
	var defenderhp;
	var playerAttack;
	var defenderAttack; 
	var enemyCounter = 3;
	// take array of characters and turn it into a div of images
	arrToDiv(characterArr, "#char-start-div");
	
	// click on image and choose a character to be player character
	$('.char-img-div').on('click', function() {

		if(playerChosen === false) {
			for(var i=0; i<characterArr.length; i++) {
				var character = characterArr[i];
				var clickedImg =  $(this).attr('id').split('-').join(' ');
				if(character.name === clickedImg){
					var charIndex = i;
				}
			}
			playerChar = enemyArr.splice(charIndex, 1);
			arrToDiv(playerChar, "#player-char-div", "player");
			arrToDiv(enemyArr, "#enemy-div", "enemy");
			$('#char-start-div').css({display: 'none'});
			$('#player-char-div, #enemy-div, #display-div').css({display: 'block'});
			playerhp = $('.player').data('hp');
			playerAttack = $('.player').data('attack');
			playerChosen = true;
		} 

		// click on remaining enemies and choose the defender
		$('.enemy').on('click', function() {
			chooseDefender($(this));
			
			//click attack button and do some calculations to see if character wins or defender wins	
			$('#attack-btn').on('click', function() {
				if(defenderChosen === true) {
					$('#audio-1')[0].play();
					defenderhp -= playerAttack;
					$('#display-readout').empty();
					$('#display-readout').append('<h4>You attacked ' + defender[0].name + ' for ' + playerAttack + ' damage</h4>');
					$('#defender0').html(defenderhp + 'hp')
					playerAttack += 20;
					if(defenderhp > 0) {
						setTimeout(function() {
							//$('#audio-2')[0].play();
							playerhp -= defenderAttack;
							$('#display-readout').append('<h4>' + defender[0].name + ' attacked you for ' + defenderAttack + ' damage</h4>');
							$('#player0').html(playerhp + 'hp');
						}, 2000);
					}
					
					if(playerhp <= 0 && defenderhp > 0) {
						$('#display-readout').empty().append('<h3>You ran out of health!</h3><h4>Game Over...</h4><h3>try again</h3>');
						$('#player0').html(player0 + 'hp');
						reset();
					} 

					if(defenderhp <= 0) {
						enemyCounter -= 1;
						$('#display-readout').append('<h4>You defeated' + defender[0].name + '</h4><h3 id="choose">Choose another enemy</h3>');
						$('#defender0').html(defenderhp + 'hp');
						defenderChosen = false;
						$('.enemy').on('click', function(){
							chooseDefender($(this));
						});
						if(enemyCounter === 0) {
							$('#choose').html('You Defeated all of the Bad Guys. You Win!')
						}
					}
				}
			});

		});

		$('#reset-btn').on('click', function() {
			location.reload();
		})
	});

	//function to create a div of images based on an array and append it to a dom element
	function arrToDiv(arr, parent, team) {

		for(var i=0; i<arr.length; i++) {
			var charhp = arr[i].hp;
			var charAttack = arr[i].attack;
			var charDefend = arr[i].defend;
			var charDiv = $('<div class="char-img-div col-sm-2 ' + team + '" id="' + arr[i].name.split(' ').join('-') + '">');
			charDiv.data({hp:charhp, attack: charAttack, defend: charDefend});
			charNameSplit = arr[i].name.split(' ');
			var charName = $('<div class="char-name"><p>' + charNameSplit[0] + '</p><p>' + charNameSplit[1] + '</p></div>');
			var hpdiv = $('<div class="char-hp" id=' + team + i +'>' + charhp + ' hp</div>');
			var charImage = $('<img>').attr({src: './assets/images/' + arr[i].name + '.jpg', class: 'char-img img-responsive'});
			charDiv.append(charName);
			charDiv.append(charImage);
			charDiv.append(hpdiv);
			$(parent).append(charDiv);
		}
	}
	var chooseDefender = function(myThis) {
		if(defenderChosen === false) {
			for(var i=0; i<enemyArr.length; i++) {
				if(enemyArr[i].name === myThis.attr('id').split('-').join(' ')){
					var charIndex = i;
				}
			}
			console.log(enemyArr);
			defender = enemyArr.splice(charIndex, 1);
			console.log(defender);
			$('#defender-div').empty().append('<h3>Defender</h3>');
			$('#enemy-div').empty().append('<h3>Enemies Available to Fight</h3>');
			arrToDiv(defender, '#defender-div', 'defender');
			arrToDiv(enemyArr, "#enemy-div", 'enemy');
			$('#defender-div').css({display: 'block'});
			defenderhp = $('.defender').data('hp');
			defenderAttack = $('.defender').data('defend');
			defenderChosen = true;
			console.log(playerhp, defenderhp);
		}
	}
});