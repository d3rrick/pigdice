var Player = function(name,turn){
  this.name = name;
  this.score = 0;
  this.total = 0;
  this.turn = turn;
};

Player.prototype = {
   taketurn(){
    this.turn ? this.turn=false : this.turn=true;
   },
   roll(){
    this.score = Math.floor(Math.random()*6)+1;
   
   },
   addPoints(){
    this.total += 0;
   },
   AutomaticRestart(){
    if(this.total >= 100){
      this.score =0;
      this.total =0;
    }
   }

 
};

$(function(){
 
 var playerOneName;
 var playerTwoName;
  $('#formid').submit(function(event){
     event.preventDefault();
    playerOneName = $("#one").val();
    playerTwoName = $("#two").val();
    if (playerOneName == "" || playerTwoName == "") {
      alert("Please enter a name for each player");
      return;
    }
    $(this).slideUp(500);
    $(".game-area").show();
    $("#pl1n").text(playerOneName);
    $("#pl2n").text( playerTwoName);

  }); 

  var player1 = new Player('playerOneName',true);
  var player2 = new Player('playerTwoName',false);

  $(".roll").click(function(){

    if(player1.turn == true){
        if(player1.total >=100 ){
          alert(player1.name+" is the winner!!!");
          // reset game
          // or restart game
          $('#sc1').html(""); 
          $('#tt1').html("");
          $('#t1').html("");
          $('#t2').html("");
          player1.AutomaticRestart();

            
          }else{
            $('.pl1').removeClass('failure');
            player1.roll();
            $('.pl1').addClass('pl1style');
            $('#sc1').html(player1.score); 
            $('#dc').attr('src',"\img/dice-"+player1.score+".png");
            $('#tt1').html(player1.total);
            // 
            if(player1.score == 1){
              $('.pl1').removeClass('pl1style');
               $('.pl1').addClass('failure');

              player1.total = 0;
              $('#tt1').html(player1.total);
              
              player1.taketurn();
              player2.taketurn();
              
              // 
            }else{
              player1.total += player1.score;
              $('#tt1').html(player1.total);
              // 
            }
          }
    }

    else{
      if(player2.total >=100){
        alert(player2.name+' is the winner!!!');
          $('#sc1').html(""); 
          $('#tt1').html("");
          $('#t1').html("");
          $('#t2').html("");
          player2.AutomaticRestart();

      }else{
        $('.pl2').removeClass('failure');
        player2.roll();

         $('.pl2').addClass('pl2style');
        $('#dc').attr('src',"\img/dice-"+player2.score+".png");
         $('#sc2').html(player2.score); 
         // $('#dc').attr('src',"\img/dice-"+player2.score+".png");
        
        // console.log("player 2 currrent score "+player2.currentSCore)
        if(player2.score == 1){
          $('.pl2').removeClass('pl2style');
          $('.pl2').addClass('failure');
          player2.total = 0;
           $('#tt2').html(player2.total);
          player2.taketurn();
          player1.taketurn();
         
          // 
        }else{
          player2.total += player2.score;
           $('#tt2').html(player2.total);
          // 
        }
      }
    }

  }); // end roll click

  $('.hold').click(function(){
   if(player1.turn == true){
    player1.taketurn();
    player2.taketurn();
    player1.addPoints(player1.total);
    $('#t1').html(player1.total);
   }else{
    player1.taketurn();
    player2.taketurn();
    player2.addPoints(player2.total);
    $('#t2').html(player2.total);
   }

  });


});