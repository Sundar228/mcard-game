const cards = document.querySelectorAll(".card");

let matched = 0;
let cardOne, cardTwo;
let disableDeck = false;
let flipped=0;
let points = 0;

function flipCard({target: clickedCard}) {
    if(cardOne !== clickedCard && !disableDeck) {
        clickedCard.classList.add("flip");
        flipped++;
        if(!cardOne) {
            points=points-10;
            return cardOne = clickedCard;
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector(".back-view img").src,
        cardTwoImg = cardTwo.querySelector(".back-view img").src;
        matchCards(cardOneImg, cardTwoImg);
    }
}

function matchCards(img1, img2) {
    if(img1 === img2) {
        matched++;
        points=points+50;

        if(matched == 8) {
            document.write('<p id="result">Number of Flips you done : '+flipped+'</p>');
            document.write('<p id="result1">Points you earned : '+points+'</p>');
            document.write('<p id="result2">Thank You!' +'</p>');
            let p = document.querySelector('#result');
            p.style.color = 'green';
            p.style.fontWeight = 'bold';
            p.style.textAlign = 'center';
            // p.style.marginLeft = '140px';
            p.style.fontSize = '30px';
            let p1 = document.querySelector('#result1');
            p1.style.color = 'green';
            p1.style.fontWeight = 'bold';
            p1.style.textAlign = 'center';
            // p1.style.marginLeft = '140px';            
            p1.style.fontSize = '30px';
            let p2 = document.querySelector('#result2');
            p2.style.color = 'green';
            p2.style.fontWeight = 'bold';
            p2.style.textAlign = 'center';
            // p2.style.marginLeft = '160px';            
            p2.style.fontSize = '30px';
            setTimeout(() => {
                return shuffleCard();
            }, 1000);

            document.body.style.backgroundImage = "url(images/answerbackground.png)";
            document.body.style.backgroundSize = "cover";       
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return disableDeck = false;
    }
    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCard() {
    matched = 0;
    disableDeck = false;
    cardOne = cardTwo = "";
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
    arr.sort(() => Math.random() > 0.5 ? 1 : -1);
    cards.forEach((card, i) => {
        card.classList.remove("flip");
        let imgTag = card.querySelector(".back-view img");
        imgTag.src = `images/img-${arr[i]}.png`;
        card.addEventListener("click", flipCard);
    });
}

shuffleCard();
    
cards.forEach(card => {
    card.addEventListener("click", flipCard);
});