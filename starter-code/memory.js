// //******************************************************************
// // Game Logic
// //******************************************************************
var MemoryGame = function() {
  this.cards = [
  		{ name: "trainer",         img: "trainer.jpg" },
  		{ name: "glasses",         img: "glasses.jpg" },
  		{ name: "will",            img: "will.jpg" },
  		{ name: "dustin",          img: "dustin.jpg" },
  		{ name: "lucas",           img: "lucas.jpg" },
      { name: "phone",           img: "phone.jpg" },
  		{ name: "mike",            img: "mike.jpg" },
  		{ name: "arm",             img: "arm.jpg" },
  		{ name: "eleven",          img: "eleven.jpg" },
  		{ name: "waffle",          img: "waffle.jpg" },
  		{ name: "bike",            img: "bike.jpg" },
  		{ name: "lights",          img: "lights.jpg" },
      { name: "trainer",         img: "trainer.jpg" },
  		{ name: "glasses",         img: "glasses.jpg" },
  		{ name: "will",            img: "will.jpg" },
      { name: "dustin",          img: "dustin.jpg" },
  		{ name: "lucas",           img: "lucas.jpg" },
  		{ name: "phone",           img: "phone.jpg" },
  		{ name: "mike",            img: "mike.jpg" },
  		{ name: "arm",             img: "arm.jpg" },
  		{ name: "eleven",          img: "eleven.jpg" },
  		{ name: "waffle",          img: "waffle.jpg" },
  		{ name: "bike",            img: "bike.jpg" },
  		{ name: "lights",          img: "lights.jpg" },
  	];
    this.selectedCards = [];
    this.pairsClicked = 0;
    this.correctPairs = 0;
};

MemoryGame.prototype.shuffle = function() {
  var array = this.cards;
  var m = array.length, t, i;

  while (m) {
    i = Math.floor(Math.random() * m--);

    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }

  this.cards = array;

  return this.cards;
};

MemoryGame.prototype.selectCard = function(card) {
  card.removeClass("back").addClass("front");
  card.siblings().removeClass("front").addClass("back blocked");

  if (this.selectedCards.length === 1) {
    var previousCard = this.selectedCards[0];
    this.pairsClicked++;
    $("#pairs_clicked").text(this.pairsClicked);

    if (previousCard.attr("name") === card.attr("name")) {
      document.getElementById("right").play();
      this.selectedCards.splice(0, this.selectedCards.length);
      this.correctPairs++;
      $("#pairs_guessed").text(this.correctPairs);
      $("h3").addClass("green").text("Right answer!").show("slow");
      setTimeout(function() {
        $("h3").text("").removeClass("green").hide("slow");
      }, 1000);
    } else {
      $("h3").text("Wrong Answer!").show( "slow" );
      document.getElementById("wrong").play();
      setTimeout(function(){
        card.removeClass("front blocked").addClass("back");
        card.siblings().removeClass("back").addClass("front");
        previousCard.removeClass("front").addClass("back");
        previousCard.siblings().removeClass("back").addClass("front");
        $("h3").text("").hide("slow");
      }, 1000);
      this.selectedCards.splice(0, this.selectedCards.length);
    }

  } else {
    this.selectedCards.push(card);
  }
};

MemoryGame.prototype.finished = function() {
  if (this.correctPairs === this.cards.length / 2) {
    $("body").append("<div class='finished'><div><h1>CONGRATULATIONS!</h1><h2>You have finished the game</h2><div id='refresh' class='btn'>Play again</div><div></div>");
    setTimeout(function() {
      $(".finished").fadeIn(1000);
    }, 750);
    document.getElementById("congratulations").play();
    $('#refresh').click(function() {
      location.reload();
    });
  }
};

// //******************************************************************
// // HTML/CSS Interactions
// //******************************************************************

var memoryGame;

$(document).ready(function(){
  memoryGame = new MemoryGame();
  memoryGame.shuffle();
  var html = '';

  memoryGame.cards.forEach(function(pic, index) {
    var sanitizedName = pic.name.split(' ').join('_');

   html += '<div class= "card" name="card_' + sanitizedName + '">';
    html += '<div class="back"';
    html += '    name="' + pic.name + '">';
    html += '</div>';
    html += '<div class="front" ';
    html += 'style="background: url(img/' + pic.img + '") no-repeat"';
    html += '    name="'       + pic.name +  '">';
    html += '</div>';
    html += '</div>';
  });

  // Add all the divs to the HTML
  document.getElementById('memory_board').innerHTML = html;
  $("#memory_board").append("<h3></h3>");

  // Click a card

  $('.back').on('click', function(){
    memoryGame.selectCard($(this));
    memoryGame.finished();
  });
});
