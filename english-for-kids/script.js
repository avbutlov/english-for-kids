import cards from './cards.js';

function closeBurgerMenu() {
    const burgerMenu = document.querySelector('.burger-menu');
    const overlay = document.querySelector('.overlay');
    const burgerBtn = document.querySelector('.burger-btn');
    if (burgerMenu.classList.contains('visible')) {
        burgerMenu.classList.remove('visible');
        burgerBtn.classList.remove('active');
        overlay.classList.remove('visible-overlay');
    }
}

function resetRatingPanel() {
    const ratingPanel = document.querySelector('.rating-panel');
    ratingPanel.innerHTML = '';
}

function goToMenu() {
    const frontCards = document.querySelectorAll('.front-card');
    const startBtn = document.querySelector('.start-btn');
    const burgerBtn = document.querySelector('.burger-btn');
    const menuBtn = document.querySelector('.menu-button');
    const categoryNames = cards[0];
    const categories = document.querySelectorAll('.category');
    for (let i = 0; i < frontCards.length; i += 1) {
        if (frontCards[i].closest('.card').classList.contains('word-card')) {
            const mainPageImages = cards[cards[0].indexOf(cards[0][i]) + 1];
            frontCards[i].closest('.card').classList.remove('word-card');
            frontCards[i].closest('.wrapper').classList.remove('word-wrapper');
            frontCards[i].querySelector('.rotate-btn').classList.add('hidden');
            frontCards[i].querySelector('.main-panel').style.backgroundImage = `url(${mainPageImages[0].image})`;
            frontCards[i].querySelector('.card-name').innerText = categoryNames[i];
            frontCards[i].classList.remove('right');
            categories[i].classList.remove('selected');
        }
        startBtn.classList.remove('started');
        burgerBtn.classList.remove('active');
        menuBtn.classList.add('selected');
        resetRatingPanel();
    }
    closeBurgerMenu();
}

function generateLayout() {
    const wrapper = document.createElement('div');
    wrapper.classList.add('wrapper');

    function createHeader() {
        const header = document.createElement('header');
        const switchBtn = document.createElement('div');
        const burgerBtn = document.createElement('div');
        const burgerMenu = document.createElement('div');
        const burgerContent = document.createElement('div');
        const menuBtn = document.createElement('span');
        const overlay = document.createElement('div');
        cards[0].forEach((el) => {
            const category = document.createElement('span');
            category.innerHTML = el;
            category.classList.add('category', 'menu-item');
            burgerContent.append(category);
        });
        switchBtn.setAttribute('type', 'checkbox');
        for (let i = 0; i < 3; i += 1) {
            const rect = document.createElement('div');
            rect.classList.add('rect');
            burgerBtn.append(rect);
        }

        menuBtn.textContent = 'Main menu';
        switchBtn.innerHTML = `<input type="checkbox" name="onoffswitch" class="onoffswitch-checkbox" id="myonoffswitch" tabindex="0" checked>
    <label class="onoffswitch-label" for="myonoffswitch">
        <span class="onoffswitch-inner"></span>
        <span class="onoffswitch-switch"></span>
    </label>`;
        overlay.classList.add('overlay');
        switchBtn.classList.add('onoffswitch');
        burgerBtn.classList.add('burger-btn');
        burgerMenu.classList.add('burger-menu');
        burgerContent.classList.add('burger-content');
        menuBtn.classList.add('menu-button', 'menu-item', 'selected');
        document.body.prepend(overlay);
        document.body.prepend(burgerMenu);
        burgerMenu.append(burgerContent);
        burgerContent.prepend(menuBtn);
        header.append(burgerBtn);
        header.append(switchBtn);
        menuBtn.addEventListener('click', goToMenu);
        burgerBtn.addEventListener('click', () => {
            burgerMenu.classList.toggle('visible');
            overlay.classList.toggle('visible-overlay');
            burgerBtn.classList.toggle('active');
        });
        wrapper.append(header);
        overlay.addEventListener('click', closeBurgerMenu);
    }

    function createRatingPanel() {
        const ratingWrapper = document.createElement('div');
        const ratingPanel = document.createElement('div');
        ratingWrapper.classList.add('rating-wrapper');
        ratingPanel.classList.add('rating-panel');
        ratingWrapper.append(ratingPanel);
        wrapper.append(ratingWrapper);
    }

    function createCards() {
        const cardsWrapper = document.createElement('div');
        cardsWrapper.classList.add('cards-wrapper');
        cards[0].forEach((el) => {
            const mainPageImages = cards[cards[0].indexOf(el) + 1];
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
            mainPanel.style.backgroundImage = `url(${mainPageImages[0].image})`;
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
        wrapper.append(cardsWrapper);
    }

    function createStartBtn() {
        const startWrapper = document.createElement('div');
        const startBtn = document.createElement('button');
        startBtn.classList.add('start-btn');
        startWrapper.classList.add('start-wrapper');
        startBtn.innerText = 'start';
        startWrapper.append(startBtn);
        wrapper.append(startWrapper);
    }

    function createWordsCards() {
        if (!this.classList.contains('word-card')) {
            const categoryName = this.querySelector('.card-name') || this;
            const categoryText = categoryName.innerText;
            const categories = document.querySelectorAll('.category');
            const menuBtn = document.querySelector('.menu-button');
            let selectedCategory;
            const previousCategory = document.querySelector('.selected');
            const cardsArr = cards[cards[0].indexOf(categoryText) + 1];
            cardsArr.sort(() => Math.random() - 0.5);
            const frontCards = document.querySelectorAll('.front-card');
            const backCards = document.querySelectorAll('.back-card');
            const rotateBtns = document.querySelectorAll('.rotate-btn');
            const startBtn = document.querySelector('.start-btn');
            if (this.classList.contains('category')) {
                selectedCategory = this;
            } else {
                for (let i = 0; i < frontCards.length; i += 1) {
                    if (categories[i].innerHTML === categoryText) {
                        selectedCategory = categories[i];
                    }
                }
            }

            for (let i = 0; i < frontCards.length; i += 1) {
                frontCards[i].querySelector('.card-name').innerText = cardsArr[i].word;
                frontCards[i].querySelector(
                    '.main-panel',
                ).style.backgroundImage = `url(${cardsArr[i].image})`;
                frontCards[i].closest('.card').classList.add('word-card');
                frontCards[i].closest('.card').dataset.word = cardsArr[i].word;
                frontCards[i].closest('.card').dataset.category = categoryText;
                frontCards[i].closest('.wrapper').classList.add('word-wrapper');
                frontCards[i].classList.remove('right');
                backCards[i].querySelector('.card-name').innerText = cardsArr[i].translation;
                backCards[i].querySelector(
                    '.main-panel',
                ).style.backgroundImage = `url(${cardsArr[i].image})`;
                rotateBtns[i].classList.remove('hidden');
            }

            startBtn.classList.remove('started');
            menuBtn.classList.remove('selected');
            if (previousCategory) {
                previousCategory.classList.remove('selected');
            }
            selectedCategory.classList.add('selected');
            resetRatingPanel();
            closeBurgerMenu();
        }
    }


    function showWordsCards() {
        const cardsContainers = document.querySelectorAll('.card');
        const categories = document.querySelectorAll('.category');
        cardsContainers.forEach((cardsContainer) => {
            setTimeout(() => {
                cardsContainer.addEventListener('click', createWordsCards);
            }, 0);
        });
        categories.forEach((category) => {
            category.addEventListener('click', createWordsCards);
        });
    }

    document.body.append(wrapper);
    createHeader();
    createRatingPanel();
    createCards();
    createStartBtn();
    showWordsCards();
}

function rotateCard() {
    const rotateBtns = document.querySelectorAll('.rotate-btn');
    rotateBtns.forEach((rotateBtn) => {
        const rotatedCard = rotateBtn.closest('.card');
        rotateBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            rotatedCard.style.transform = 'rotateY(180deg)';
            rotatedCard.classList.add('rotated-card');
            rotatedCard.addEventListener('mouseleave', () => {
                if (rotatedCard.classList.contains('rotated-card')) {
                    rotatedCard.style.transform = 'rotateY(0deg)';
                    rotatedCard.classList.remove('rotated-card');
                }
            });
        });
    });
}

function selectMode() {
    let isPlay;
    const cardsContainers = document.querySelectorAll('.card');
    const card = document.querySelector('.card');
    const switcher = document.querySelector('.onoffswitch-label');
    const startBtn = document.querySelector('.start-btn');
    const wordsInfo = cards.slice(1).flat();
    const ratingPanel = document.querySelector('.rating-panel');
    const wrapper = document.querySelector('.wrapper');
    const ratingWrapper = document.querySelector('.rating-wrapper');
    let rotateDeg = 0;
    let failuresArr;
    let cardsSeq;
    let soundsArr;

    function train() {
        if (!isPlay && this.closest('.card').classList.contains('word-card')) {
            wordsInfo.forEach((wordInfo) => {
                if (wordInfo.word === this.closest('.card').dataset.word) {
                    const audio = new Audio(`${wordInfo.audioSrc}`);
                    audio.play();
                    audio.currentTime = 0;
                }
            });
        }
    }

    function getCurrentWidth(el) {
        return Number(window.getComputedStyle(el).width.match(/\d*/)[0]);
    }

    function playAudio() {
        const audio = new Audio(soundsArr[0]);
        audio.play();
    }

    function addImgToRating(src, size) {
        const imgRight = new Image(size);
        imgRight.src = src;
        ratingPanel.append(imgRight);
    }

    function checkAnswers() {
        if (isPlay && this.closest('.card').classList.contains('word-card') && startBtn.classList.contains('started')) {
            const cardSound = new Audio();
            if (this.closest('.card').dataset.word === cardsSeq[0].word) {
                cardSound.src = 'audio/correct.mp3';
                this.classList.add('right');
                cardsSeq = cardsSeq.slice(1);
                soundsArr = soundsArr.slice(1);
                addImgToRating('https://upload.wikimedia.org/wikipedia/commons/4/42/Love_Heart_SVG.svg', 22);
                setTimeout(() => {
                    playAudio();
                }, 500);
            } else if (this.closest('.card').dataset.word !== cardsSeq[0].word && !this.classList.contains('right')) {
                addImgToRating('https://upload.wikimedia.org/wikipedia/commons/b/bb/Broken_heart.svg', 24);
                cardSound.src = 'audio/error.mp3';
                failuresArr.push(this.closest('.card').dataset.word);
            }

            cardSound.play();

            if (getCurrentWidth(ratingPanel) >= getCurrentWidth(ratingWrapper)) {
                resetRatingPanel();
            }

            if (cardsSeq.length === 0) {
                const finalWindow = document.createElement('div');
                const errors = document.createElement('span');
                finalWindow.classList.add('final');
                const finalImg = new Image(500);
                const finalAudio = new Audio();
                finalImg.classList.add('final-img');
                finalWindow.append(finalImg);
                finalWindow.append(errors);
                wrapper.remove();
                if (failuresArr.length === 0) {
                    errors.innerText = '';
                    finalImg.src = 'img/zoos.png';
                    finalAudio.src = 'audio/zelda.flac';
                } else {
                    const errorMessage = failuresArr.length === 1 ? 'error' : 'errors';
                    errors.innerText = `${failuresArr.length} ${errorMessage}. Try again!`;
                    finalAudio.src = 'audio/failure.mp3';
                    finalImg.src = 'img/gnome.png';
                }
                finalAudio.play();
                document.body.append(finalWindow);
                setTimeout(() => {
                    finalWindow.remove();
                    document.body.append(wrapper);
                    goToMenu();
                }, 5000);
            }
        }
    }

    function createWordsSequences() {
        failuresArr = [];
        cardsSeq = cards[cards[0].indexOf(card.dataset.category) + 1];
        cardsSeq.sort(() => Math.random() - 0.5);
        soundsArr = [];
        for (let i = 0; i < cardsSeq.length; i += 1) {
            soundsArr.push(cardsSeq[i].audioSrc);
        }
    }

    function startGame() {
        if (!this.classList.contains('started')) {
            const frontCards = document.querySelectorAll('.front-card');
            createWordsSequences();
            frontCards.forEach((frontCard) => {
                frontCard.addEventListener('click', checkAnswers);
            });
            this.classList.add('started');
        }
        this.style.transform = `rotate(${rotateDeg}deg)`;
        rotateDeg += 360;
        playAudio();
    }

    function goPlay() {
        cardsContainers.forEach((cardsContainer) => {
            cardsContainer.classList.add('play-mode-card');
            cardsContainer.querySelector('.main-panel').classList.add('play-main');
            cardsContainer
                .querySelector('.bottom-panel')
                .classList.add('play-bottom');
        });
        startBtn.classList.remove('hidden');
        isPlay = true;
    }

    function goTrain() {
        cardsContainers.forEach((cardsContainer) => {
            cardsContainer.classList.remove('play-mode-card');
            cardsContainer.querySelector('.main-panel').classList.remove('play-main');
            cardsContainer.querySelector('.front-card').classList.remove('right');
            setTimeout(() => {
                cardsContainer
                    .querySelector('.bottom-panel')
                    .classList.remove('play-bottom');
            }, 450);
        });
        isPlay = false;
        startBtn.classList.add('hidden');
        startBtn.classList.remove('started');
        cardsSeq = [];
        resetRatingPanel();
    }

    function switchMode() {
        if (isPlay) {
            goTrain();
        } else {
            goPlay();
        }
        console.log(isPlay);
    }

    goTrain();
    switcher.addEventListener('click', switchMode);
    cardsContainers.forEach((cardsContainer) => {
        cardsContainer.querySelector('.front-card').addEventListener('click', train);
    });
    startBtn.addEventListener('click', startGame);
    console.log(isPlay);
}

generateLayout();
rotateCard();
selectMode();