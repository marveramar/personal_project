'use strict';

console.log('>> Ready :)');
const list = document.querySelector('#memoryGame');
let id;

function callData() {
    fetch("../data/data.json")
        .then(response => response.json())
        .then(data => mixCards(data)
        )
}

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

        // const elementLi = document.createElement('li');
        // elementLi.innerHTML = `<p>${emotion.name}</p>`
        // elementDiv.appendChild(elementLi);
    }
    const cards = document.querySelectorAll('.flipCard')
    console.log(cards)
    const array = Array.from(cards)
    const event = (array) => {
        for (let card of array) {
            card.addEventListener('click', flipCard)
        }
    }
    event(array)
}
const mixCards = myArray => {
    const result = myArray.sort(function () {
        return 0.5 - Math.random();
    });
    displayEmotions(result);
};

let hasFlippedCard = false;
let firstCard, secondCard;

const flipCard = (e) => {
    const click = e.currentTarget;
    click.classList.add('flip');

    if (!hasFlippedCard) {
        hasFlippedCard = true;
        firstCard = click;
    } else {
        hasFlippedCard = false;
        secondCard = click;
        console.log(firstCard.id, secondCard.id)
    }
    //Cards match
    if (firstCard.id === secondCard.id) {
        //it's a match
        firstCard.removeEventListener('click', flipCard);
        secondCard.removeEventListener('click', flipCard);
        console.log('ey!')
    } else {
        //not a match
        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');
        }, 1500);
    }
}





callData()
