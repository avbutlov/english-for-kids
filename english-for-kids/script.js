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

    card.classList.add('card');
    frontCard.classList.add('front-card');
    cardName.classList.add('card-name');
    backCard.classList.add('back-card');
    rotateBtn.classList.add('rotate-btn', 'hidden');

    cardName.innerText = el;
    backCard.innerHTML = 'back';
    cardsWrapper.append(card);
    card.append(frontCard);
    card.append(backCard);
    frontCard.append(cardName);
    frontCard.append(rotateBtn);
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
      frontCards[i].style.background = `url(${cardsArr[i].image})`;
      frontCards[i].closest('.card').classList.add('word-card');
      frontCards[i].closest('.card').dataset.word = cardsArr[i].word;
      backCards[i].innerHTML = cardsArr[i].translation;
      backCards[i].style.background = `url(${cardsArr[i].image})`;
      rotateBtns[i].classList.remove('hidden');
    }

    closeBurgerMenu();
  } else {
    const wordsInfo = cards.slice(1).flat();
    wordsInfo.forEach((wordInfo) => {
      if (wordInfo.word === this.dataset.word) {
        const audio = new Audio(`${wordInfo.audioSrc}`);
        audio.play();
        audio.currentTime = 0;
      }
    });
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

function goToPlayMode() {
  /*
  const cardsContainers = document.querySelectorAll(".card");
  const cardNames = document.querySelectorAll(".card-name");
  const rotateBtns = document.querySelectorAll(".rotate-btn");
    for (let i = 0; i < cardsContainers.length; i++) {
      cardsContainers[i].classList.add("play-mode-card");
      cardNames[i].classList.add("hidden");
      rotateBtns[i].classList.add("hidden");
    }
    for (let i = 0; i < cardsContainers.length; i++) {
      cardsContainers[i].classList.remove("play-mode-card");
      cardNames[i].classList.remove("hidden");
      rotateBtns[i].classList.remove("hidden");
    }

*/
}

function switchMode() {
}

function goToMenu() {
  const cardsWrapper = document.querySelector('.cards-wrapper');
  cardsWrapper.remove();
  createCards();
  closeBurgerMenu();
  showWordsCards();
  rotateCard();
}

createCards();
createHeader();
showWordsCards();
rotateCard();
goToPlayMode();

document.querySelector('.switcher').addEventListener('click', switchMode);
document.querySelector('.switcher').addEventListener('click', goToPlayMode);
document.querySelector('.menu-button').addEventListener('click', goToMenu);
document.querySelector('.burger-btn').addEventListener('click', () => {
  const burgerMenu = document.querySelector('.burger-menu');
  const overlay = document.querySelector('.overlay');
  burgerMenu.classList.toggle('visible');
  overlay.classList.toggle('visible-overlay');
});
