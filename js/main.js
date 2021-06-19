'use strict';


const list = document.querySelector('#memoryGame');
const reset = document.querySelector('#header__reset');
const win = document.querySelector('.win');


let id;
let matchCounter = 0;
let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let cards;

//function to get data
function callData() {
    fetch("../data/data.json")
        .then(response => response.json())
        .then(data => mixCards(data)
        )
}

//function to mix cards
const mixCards = myArray => {
    const result = myArray.sort(function () {
        return 0.5 - Math.random();
    });
    displayEmotions(result);
};

//function to display cards 
const displayEmotions = (emotions) => {
    for (let emotion of emotions) {
        id = emotion.id;
        const flipCard = document.createElement('li');
        flipCard.classList.add('flipCard');
        flipCard.setAttribute('id', id);
        const cardFront = document.createElement('div');
        cardFront.classList.add('flipCard__front');
        const text = document.createElement('p');
        text.classList.add('flipCard__front-img');
        text.innerHTML = '🍭🍭';
        cardFront.appendChild(text);
        const cardBack = document.createElement('div');
        cardBack.classList.add('flipCard__back')
        const img = document.createElement('img');
        img.setAttribute('src', emotion.image);
        img.setAttribute('class', 'flipCard__back-img');
        cardBack.appendChild(img);
        flipCard.appendChild(cardFront);
        flipCard.appendChild(cardBack);
        list.appendChild(flipCard)
    }
    cards = document.querySelectorAll('.flipCard')
    const arrayOfCards = Array.from(cards)
    const event = (arrayOfCards) => {
        for (let card of arrayOfCards) {
            card.addEventListener('click', flipCard)
        }
    }
    event(arrayOfCards)
}

//function to flip cards
const flipCard = (e) => {
    let click = e.currentTarget;
    if (lockBoard) return;
    if (this === firstCard) return;
    click.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = click;
        return;
    } else {
        hasFlippedCard = false;
        secondCard = click;
        checkForMatch(firstCard, secondCard);
    }
}
//function check Match
const checkForMatch = (firstCard, secondCard) => {
    if (firstCard.id !== secondCard.id) {
        notMatch(firstCard, secondCard);

    } else {
        match(firstCard, secondCard);

    }
}


const notMatch = (firstCard, secondCard) => {
    setTimeout(() => {
        firstCard.classList.remove('flip');
        secondCard.classList.remove('flip');

    }, 1500);
}

const match = (firstCard, secondCard) => {
    firstCard.removeEventListener('click', flipCard);
    firstCard.classList.add('match');
    secondCard.removeEventListener('click', flipCard);
    secondCard.classList.add('match')
    matchCounter += 1;
    if (matchCounter === (cards.length / 2)) {

    }
}


callData()
reset.addEventListener('click', mixCards)


