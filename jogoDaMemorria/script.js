const cards_img = [
    "./img/jett.jpg",
    "./img/killjoy.jpg",
    "./img/raze.jpg",
    "./img/omen.jpg",
    "./img/sova.jpg",
    "./img/viper.jpg",
];

const ONE_SECOND= 1_000

// for(let tempo=0;checkEndOfGame;tempo++){
//     return tempo;
// }

let firstCard;
let secondCard;
let plays= 0;
let hits = 0;



function game(){
    let cards = sortCardsDisposal(); 
    CardsBoard(cards);

}

function sortCardsDisposal() {
    const cardsDisposal= [];

    cards_img.forEach(cardimg =>{
        cardsDisposal.push(cardimg);
        cardsDisposal.push(cardimg);
    });

    return cardsDisposal.sort(randomOrderCriterial);
}

function CardsBoard(cards) {
    const boardEl= document.querySelector(".board");
    boardEl.innerHTML= "";

    cards.forEach(card => {
        boardEl.innerHTML +=`
        <div class="card" onclick="flipCard(this)">
            <div class="card-frente">
                <img src="./img/valorant.jpg">
            </div>
            <div class="card-atras">
                <img src="${card}">
            </div>
       </div>
        `
    })
}

function flipCard(card) {
    if(isCardAlreadyFlipped(card) || isBothCardAlreadyFlipped()) return;

    card.classList.add("is-flipped")

    const isfirstCard = firstCard == undefined
    if (isfirstCard) {
        firstCard= card;
        return;
    }else{
        secondCard = card;
        plays = plays +1;
    }

    let isMatch = firstCard.innerHTML === secondCard.innerHTML;
    if(isMatch){
        hits= hits + 1;
        resetPlay();
     
    }else{
        setTimeout(unflipCardsAndResetPlay,ONE_SECOND);
    }

    checkEndOfGame();
}


function checkEndOfGame(){
    const allCards= hits === cards_img.length;
    if(allCards){
        setTimeout(finishGame(), ONE_SECOND)
    }
}

function isCardAlreadyFlipped(card){
    return card.classList.contains("is-flipped");
}

function isBothCardAlreadyFlipped(){
    return firstCard !== undefined && secondCard !== undefined;
}


function unflipCardsAndResetPlay() {
    firstCard.classList.remove("is-flipped");
    secondCard.classList.remove("is-flipped");
    resetPlay();
}

function randomOrderCriterial() {
    return Math.random() -0.5;
}

function resetPlay() {
    firstCard= undefined;
    secondCard= undefined;
}
function finishGame(){
    alert(`Parabens voce terminou com ${plays} jogadas`)
}

game();