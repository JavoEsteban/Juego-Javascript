/*
Reglas:
-Juego de 2 players que juegan en turnos
-En cada turno, el jugador puede lanzar el dado todas las veces que quiera, y el resultado se va acumulando al puntaje de su ronda
-Sin embargo, si el resultado de un lanzamiento, el jugador pierde todo el puntaje de su ronda, y pasa al turno del siguiente player
-Cada jugador puede elegir "Mantener" su resultado y añadir el puntaje de la ronda a su puntaje global, y comienza el turno del siguiente player
-El primer player en alcanzar 100 puntos en su puntaje global gana el juego


*/


let scores = [0, 0]; //Almacena el puntaje de cada uno de los jugadores
let roundScore = 0; //Almacena el puntaje del turno de un jugador
let activePlayer = 0; //indica cual jugador esta en turno 0 para player 1 y 1 para player 2

document.querySelector('.dice').style.display = 'none';



function newGame() {
    scores=[0,0]
    roundScore=0;
    activePlayer=0;
    document.querySelector('.dice').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

}
document.querySelector('.btn-roll').addEventListener('click', function () {
    let dice = (Math.floor(Math.random() * 6) + 1);
    let diceDom = document.querySelector('.dice');

    diceDom.style.display = 'block';
    diceDom.src = 'dice-' + dice + '.png';

    if (dice != 1) {
        roundScore += dice;
        document.getElementById('current-' + activePlayer).textContent = roundScore;
    } else {
        activePlayer===0 ? activePlayer=1 : activePlayer = 0;
        roundScore = 0;
        document.getElementById('current-' + activePlayer).textContent = roundScore;

    }
});

document.querySelector('.btn-hold').addEventListener('click', function () {
    let currentScore = document.getElementById('current-' + activePlayer);
    let globalScore = document.getElementById('score-' + activePlayer);

    scores[activePlayer] += roundScore; //suma al puntaje global el puntaje obtenido en la ronda actual.
    globalScore.textContent = scores[activePlayer];
    
    currentScore.textContent = 0;
    roundScore=0;

    if (activePlayer == 0) {
        activePlayer = 1;
        document.querySelector('.player-1-panel').classList.add('active');
        document.querySelector('.player-0-panel').classList.remove('active');

    } else {
        activePlayer = 0;
        document.querySelector('.player-0-panel').classList.add('active');
        document.querySelector('.player-1-panel').classList.remove('active');

    }
    isWinner();
});

function isWinner(){
    if(scores[0]>=100){
        alert('Player 1 wins!!');
        newGame();
    }else if(scores[1]>=100){
        alert('Player 2 wins!!');
        newGame();
    }
}
document.querySelector('.btn-new').addEventListener('click',function() {
    newGame();
});