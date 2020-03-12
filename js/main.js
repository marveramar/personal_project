'use strict';

console.log('>> Ready :)');
const cards = document.querySelector('#emotionList')


function callData() {
    fetch("../data/data.json")
        .then(response => response.json())
        .then(data => displayEmotions(data)
        )
}

const displayEmotions = (emotions) => {
    for (let emotion of emotions) {
        const flipCard = document.createElement('li');
        flipCard.classList.add('flipCard')
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
        cards.appendChild(flipCard)

        // const elementLi = document.createElement('li');
        // elementLi.innerHTML = `<p>${emotion.name}</p>`
        // elementDiv.appendChild(elementLi);


    }
}
const flipCard = () => {

}
callData()

