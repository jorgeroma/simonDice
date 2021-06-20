var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var nPulsado = 0;
var level = 0;

function randomChosenColour() {
    return buttonColors[Math.floor(Math.random() * 4)];
}

function playSound(color) {
    var sound = new Audio("sounds/" + color + ".mp3");
    sound.play();
}

function juego() {
    $('.boton').hide();
    var colorRonda = randomChosenColour()
    gamePattern.push(colorRonda);
    userClickedPattern = [];
    level++;
    nPulsado = 0;
    $('h1').text("Ronda " + level);
    $("#" + colorRonda).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(colorRonda);
}


$("body").keydown(function (e) { 
    if(level == 0){
        juego();
    }
});

$('.boton').click(function (e) { 
    if(level == 0){
        juego();
    }
});

$(".btn").click(function (e) {
    var userChosenColor = $(this).attr("id");
    console.log(userChosenColor);
    userClickedPattern.push(userChosenColor);

    if(level != 0){

        $('.' + userChosenColor).addClass("pressed");
        
        playSound(userChosenColor);
        
        setTimeout(function () {
            $('.' + userChosenColor).removeClass("pressed");
        }, 150);
        console.log(userClickedPattern);
        console.log(gamePattern);
        
        // if(userClickedPattern.slice(0,nPulsado+1) == gamePattern.slice(0,nPulsado+1)){
        if(userClickedPattern[nPulsado] == gamePattern[nPulsado]){
            nPulsado++;
            if(nPulsado == level){
                setTimeout(function () {
                    juego();
                }, 1000);
            } 
            
        }else{
            restart();
        }
    }
});

function restart(){
    playSound("wrong");
    $('.boton').show();
    level = 0;
    nPulsado = 0;
    gamePattern = [];
    $("body").addClass("game-over");
    setTimeout(function () {
        $("body").removeClass("game-over");
    }, 150);
    console.log(userClickedPattern);
    console.log(gamePattern);
    $('h1').html("Fin de la partida. <br><br> Pulsa una tecla para volver a empezar");
}