const cards = document.querySelectorAll('.card');
let hasFlippedCard = false;
let firstCard, secondCard;
let lockBoard = false;

//FUÇÃO PARA VIRAR A CARTA
function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.classList.add('flip');
    if(!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = this;
        return;
    }

    secondCard = this;
    hasFlippedCard = false;
    checkForMatch();
}

//FUNÇÃO QUE CHECA SE AS CARTAS SÃO IGUAIS
function checkForMatch() {
    if(firstCard.dataset.card === secondCard.dataset.card) {
        disableCards();
        return;
    }

    unflipCards();
}

//FUNÇÃO QUE DESABILITA AS CARTAS
function disableCards() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    resetBoard();
}

//FUNÇÃO QUE DESVIRA AS CARTAS
function unflipCards() {
    lockBoard = true;

    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

        resetBoard();
    }, 1500);
}

//FUNÇÃO RESETA O TABULEIRO
function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
}

//FUNÇÃO QUE EMBARALHA AS CARTAS
(function shuffle() {
    cards.forEach((card) => {
        let ramdomPosition = Math.floor(Math.random() * 12);
        card.style.order = ramdomPosition;
    })
})();

//ADICIONA EVENTO DE CLIQUE NA CARTA
cards.forEach((card) => {
    card.addEventListener('click', flipCard)
});