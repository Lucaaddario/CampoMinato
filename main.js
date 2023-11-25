/*-----------------------
FASE DI PREPARAZIONE
------------------------*/

//CATTURA ELEMENTI HTML
let scoreCounter = document.querySelector('#score');
const grid = document.querySelector('.grid');
const endGameScreen = document.querySelector('.end-game-screen');
const endGameText = document.querySelector('.end-game-text');
const playAgainBtn = document.querySelector('.play-again');

//INFORMAZIONI LOGICA DI GIOCO
const totalCells = 100;
const totalBomb = 16;
const maxScore = totalCells - totalBomb;
const bombList = [];
let score = 0;

//GENERARE BOMBE CASUALMENTE
while (bombList.length < totalBomb) {
    const number = Math.floor(Math.random() * totalCells)+1;
    if (!bombList.includes(number)){
        bombList.push(number);
    }
}

/*-----------------------
GRID AND GAME LOGIC
------------------------*/
//Iniziallizazione di celle e righe pari inizialmente false
isCellEven = false;
isRowEven = false;

//Conta da uno a cento e per ogni numero mi crei una cella e la riempi con il suo n. di riferimento
for (let index = 1; index <= totalCells; index++) {
    const cella = document.createElement('div');
    cella.classList.add('cell');
    cella.innerText = index;

    //La cella è pari se il numero è divisibile per due
    isCellEven = index % 2 === 0;

    //Colora di 'dark' le celle dispari delle righe dispari
    if(isRowEven && isCellEven){
        cella.classList.add('cell-dark');
        //Colora di 'dark' le celle pari delle righe pari
    } else if (!isRowEven && !isCellEven){
        cella.classList.add('cell-dark');
    }
    //Se il numero è multiplo di 10 la riga diventa pari se era dispari e diventa dispari se era pari
    if(index % 10 === 0){
        isRowEven = !isRowEven;
    }


    //Gestiamo il Click della cella
    cella.addEventListener("click", ()=>{
        if (cella.classList.contains('cell-clicked')){
            return
        }

        //se clicco su una bomba
        if (bombList.includes(index)){
            cella.classList.add('cell-bomb');
            endGame(false);
            //se non clicco su una bomba
        }else{
            cella.classList.add('cell-clicked');
            updateScore();
        }
    })


    //Appendo le celle al suo wrapper (grid)
    grid.appendChild(cella);
}

/*-----------------------
FUNZIONI DEL GIOCO
------------------------*/
//updateScore Function
function updateScore() {
    score++;
    scoreCounter.innerText = String(score).padStart(5 , 0);
    if(score === maxScore){
        endGame(true);
    }
}
//endGame Function
function endGame(isVisctory) {
    if (isVisctory === true){
        endGameScreen.classList.add('win');
        endGameText.innerHTML = 'YOU<br>WIN';
    } else {
        revealBombs();
    }
    endGameScreen.classList.remove('hidden');
}

//RevealBombs Function
function revealBombs() {
const celle = document.querySelectorAll('.cell')
for (let index = 1; index < celle.length; index++) {
    if (bombList.includes(index)){
        const celltoReveal = celle[index-1]
        celltoReveal.classList.add('cell-bomb')
    }
}
}

/*------------------------
IMPLEMENTAZIONE DEL BOTTONE
------------------------*/
playAgainBtn.addEventListener("click", ()=>{
    location.reload();
})