import cards from './cards.js';

function createHeader() {
    const header = document.createElement('header');
    const switchBtn = document.createElement('input');
    const burgerBtn = document.createElement('button');
    const burgerMenu = document.createElement('div');
    const burgerContent = document.createElement('div');
    const menuBtn = document.createElement('span');
    const overlay = document.createElement('div');
    cards[0].forEach((el) => {
        const category = document.createElement('span');
        category.innerHTML = el;
        category.classList.add('category');
        burgerContent.append(category);
    });
    switchBtn.setAttribute('type', 'checkbox');

    switchBtn.textContent = 'Train';
    menuBtn.textContent = 'Main menu';
    overlay.classList.add('overlay');
    switchBtn.classList.add('switcher');
    burgerBtn.classList.add('burger-btn');
    burgerMenu.classList.add('burger-menu');
    burgerContent.classList.add('burger-content');
    menuBtn.classList.add('menu-button');
    document.body.prepend(overlay);
    document.body.prepend(header);
    document.body.prepend(burgerMenu);
    burgerMenu.append(burgerContent);
    burgerContent.prepend(menuBtn);
    header.append(burgerBtn);
    header.append(switchBtn);

    menuBtn.addEventListener('click', goToMenu);
    burgerBtn.addEventListener('click', () => {
        burgerMenu.classList.toggle('visible');
        overlay.classList.toggle('visible-overlay');
    });
}

function closeBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const overlay = document.querySelector('.overlay');
    if (burgerMenu.classList.contains('visible')) {
        burgerMenu.classList.remove('visible');
        overlay.classList.remove('visible-overlay');
    }
}

function createCards() {
    const cardsWrapper = document.createElement('div');
    cardsWrapper.classList.add('cards-wrapper');
    cards[0].forEach((el) => {
        const card = document.createElement('div');
        const frontCard = document.createElement('div');
        const backCard = document.createElement('div');
        const rotateBtn = document.createElement('button');
        const cardName = document.createElement('span');
        const mainPanel = document.createElement('div');
        const bottomPanel = document.createElement('div');
        const backBottomPanel = document.createElement('div');

        card.classList.add('card');
        frontCard.classList.add('front-card');
        cardName.classList.add('card-name');
        backCard.classList.add('back-card');
        rotateBtn.classList.add('rotate-btn', 'hidden');
        mainPanel.classList.add('main-panel');
        bottomPanel.classList.add('bottom-panel');
        backBottomPanel.classList.add('bottom-panel');

        cardName.innerText = el;
        const backCardName = cardName.cloneNode(true);
        bottomPanel.append(cardName);
        bottomPanel.append(rotateBtn);
        const backMainPanel = mainPanel.cloneNode(true);
        cardsWrapper.append(card);
        card.append(frontCard);
        card.append(backCard);
        frontCard.append(mainPanel);
        frontCard.append(bottomPanel);
        backCard.append(backMainPanel);
        backCard.append(backBottomPanel);
        backBottomPanel.append(backCardName);
    });
    document.body.append(cardsWrapper);
}

function createWordsCards() {
    if (!this.classList.contains('word-card')) {
        const categoryName = this.querySelector('.card-name') || this;
        const cardsArr = cards[cards[0].indexOf(categoryName.innerText) + 1];
        const rotateBtns = document.querySelectorAll('.rotate-btn');

        cardsArr.sort(() => Math.random() - 0.5);
        const frontCards = document.querySelectorAll('.front-card');
        const backCards = document.querySelectorAll('.back-card');
        /*
    backCards.forEach((el) => {
      el.innerHTML = cardsArr[i].translation;
      el.style.background = `url(${cardsArr[i].image})`;
      i++
    })
    let j = 0;
    frontCards.forEach((el) => {
      el.innerHTML = cardsArr[j].word;
      el.style.background = `url(${cardsArr[j].image})`;
      el.classList.add("word-card");
      el.dataset.word = cardsArr[j].word;
      j++;
    });
*/
        for (let i = 0; i < frontCards.length; i += 1) {
            frontCards[i].querySelector('.card-name').innerText = cardsArr[i].word;
            frontCards[i].querySelector('.main-panel').style.backgroundImage = `url(${cardsArr[i].image})`;
            frontCards[i].closest('.card').classList.add('word-card');
            frontCards[i].closest('.card').dataset.word = cardsArr[i].word;
            backCards[i].querySelector('.card-name').innerText = cardsArr[i].translation;
            backCards[i].querySelector('.main-panel').style.backgroundImage = `url(${cardsArr[i].image})`;
            rotateBtns[i].classList.remove('hidden');
        }

        closeBurgerMenu();
    }
}

function showWordsCards() {
    const cardsContainers = document.querySelectorAll('.card');
    const categories = document.querySelectorAll('.category');
    cardsContainers.forEach((cardsContainer) => {
        cardsContainer.addEventListener('click', createWordsCards);
    });
    categories.forEach((category) => {
        category.addEventListener('click', createWordsCards);
    });
}

function rotateCard() {
    const rotateBtns = document.querySelectorAll('.rotate-btn');
    rotateBtns.forEach((rotateBtn) => {
        const rotatedCard = rotateBtn.closest('.card');
        rotateBtn.addEventListener('click', () => {
            rotatedCard.style.transform = 'rotateY(180deg)';
            rotatedCard.classList.add('rotated-card');
            rotatedCard.addEventListener('mouseleave', () => {
                if (rotatedCard.classList.contains('rotated-card')) {
                    rotatedCard.style.transform = 'rotateY(0deg)';
                    rotatedCard.classList.remove('rotated-card');
                }
            });
        });

        /*
cardsContainers.forEach((cardsContainer) => {
  cardsContainer.addEventListener("mouseout", function () {
    if (this.classList.contains("rotated-card")) {
      this.style.transform = "rotateY(0deg)";
      this.classList.remove("rotated-card");
    }
  })
})

*/
    });
}

function selectMode() {
    let isPlay;
    const cardsContainers = document.querySelectorAll('.card');
    const switcher = document.querySelector('.switcher');

    function train() {
        const wordsInfo = cards.slice(1).flat();
        wordsInfo.forEach((wordInfo) => {
            if (wordInfo.word === this.dataset.word) {
                const audio = new Audio(`${wordInfo.audioSrc}`);
                audio.play();
                audio.currentTime = 0;
            }
        });
    }

    function goPlay() {
        isPlay = true;
        cardsContainers.forEach((cardsContainer) => {
            cardsContainer.classList.add('play-mode-card');
            cardsContainer.querySelector('.main-panel').classList.add('play-main');
            if (cardsContainer.classList.contains('word-card')) {
                cardsContainer.querySelector('.bottom-panel').classList.add('play-bottom');
            }
        });
    }

    function goTrain() {
        isPlay = false;
        cardsContainers.forEach((cardsContainer) => {
            cardsContainer.classList.remove('play-mode-card');
            cardsContainer.querySelector('.main-panel').classList.remove('play-main');
            cardsContainer.querySelector('.bottom-panel').classList.remove('play-bottom');

        });
    }

    function switchMode() {
        if (isPlay) {
            goTrain();
            cardsContainers.forEach((cardsContainer) => {
                cardsContainer.addEventListener('click', train);
            });
        } else {
            goPlay();
        }
        console.log(isPlay)
    }

    switcher.addEventListener('click', switchMode);
}

function goToMenu() {
    const frontCards = document.querySelectorAll('.front-card');
    const categoryNames = cards[0];
    for (let i = 0; i < frontCards.length; i++) {
        if (frontCards[i].closest('.card').classList.contains('word-card')) {
            frontCards[i].closest('.card').classList.remove('word-card');
            frontCards[i].querySelector('.rotate-btn').classList.add('hidden');
            frontCards[i].querySelector('.main-panel').style.backgroundImage = 'none';
            frontCards[i].querySelector('.card-name').innerText = categoryNames[i];
        }
    }
    closeBurgerMenu();
}

createCards();
createHeader();
showWordsCards();
rotateCard();
selectMode();