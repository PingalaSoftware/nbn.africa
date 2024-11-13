//carousel for features

const prev = document.querySelector('#prev');
const next = document.querySelector('#next');

let carouselVp = document.querySelector('#carousel-vp');

let cCarouselInner = document.querySelector('#cCarousel-inner');
let carouselInnerWidth = cCarouselInner.getBoundingClientRect().width;

let leftValue = 0;

// Variable used to set the carousel movement value (card's width + gap)
const totalMovementSize =
    parseFloat(
        document.querySelector('.cCarousel-item').getBoundingClientRect().width,
        10
    ) +
    parseFloat(
        window.getComputedStyle(cCarouselInner).getPropertyValue('gap'),
        10
    );

prev.addEventListener('click', () => {
    if (!leftValue == 0) {
        leftValue -= -totalMovementSize;
        cCarouselInner.style.left = leftValue + 'px';
    }
});

next.addEventListener('click', () => {
    const carouselVpWidth = carouselVp.getBoundingClientRect().width;
    if (carouselInnerWidth - Math.abs(leftValue) > carouselVpWidth) {
        leftValue -= totalMovementSize;
        cCarouselInner.style.left = leftValue + 'px';
    }
});

const mediaQuery510 = window.matchMedia('(max-width: 510px)');
const mediaQuery770 = window.matchMedia('(max-width: 770px)');

mediaQuery510.addEventListener('change', mediaManagement);
mediaQuery770.addEventListener('change', mediaManagement);

let oldViewportWidth = window.innerWidth;

function mediaManagement() {
    const newViewportWidth = window.innerWidth;

    if (
        leftValue <= -totalMovementSize &&
        oldViewportWidth < newViewportWidth
    ) {
        leftValue += totalMovementSize;
        cCarouselInner.style.left = leftValue + 'px';
        oldViewportWidth = newViewportWidth;
    } else if (
        leftValue <= -totalMovementSize &&
        oldViewportWidth > newViewportWidth
    ) {
        leftValue -= totalMovementSize;
        cCarouselInner.style.left = leftValue + 'px';
        oldViewportWidth = newViewportWidth;
    }
}

//carousel for use-case

const useCasePrev = document.querySelector('#useCasePrev');
const useCaseNext = document.querySelector('#useCaseNext');

let useCaseCarouselVp = document.querySelector('#useCaseCarousel-vp');

let useCaseCarouselInner = document.querySelector('#useCaseCarousel-inner');
let useCaseCarouselInnerWidth =
    useCaseCarouselInner.getBoundingClientRect().width;

let useCaseLeftValue = 0;

// Variable used to set the carousel movement value (card's width + gap)
const useCaseTotalMovementSize =
    parseFloat(
        document.querySelector('.useCaseCarousel-item').getBoundingClientRect()
            .width,
        10
    ) +
    parseFloat(
        window.getComputedStyle(useCaseCarouselInner).getPropertyValue('gap'),
        10
    );

useCasePrev.addEventListener('click', () => {
    if (!useCaseLeftValue == 0) {
        useCaseLeftValue -= -useCaseTotalMovementSize;
        useCaseCarouselInner.style.left = useCaseLeftValue + 'px';
    }
});

useCaseNext.addEventListener('click', () => {
    const useCaseCarouselVpWidth =
        useCaseCarouselVp.getBoundingClientRect().width;
    if (
        carouselInnerWidth - Math.abs(useCaseLeftValue) >
        useCaseCarouselVpWidth
    ) {
        useCaseLeftValue -= useCaseTotalMovementSize;
        useCaseCarouselInner.style.left = useCaseLeftValue + 'px';
    }
});

const useCaseMediaQuery510 = window.matchMedia('(max-width: 510px)');
const useCaseMediaQuery770 = window.matchMedia('(max-width: 770px)');

useCaseMediaQuery510.addEventListener('change', mediaManagement);
useCaseMediaQuery770.addEventListener('change', mediaManagement);

let useCaseOldViewportWidth = window.innerWidth;

function mediaManagement() {
    const useCaseNewViewportWidth = window.innerWidth;

    if (
        useCasePrev <= -useCaseTotalMovementSize &&
        useCaseOldViewportWidth < useCaseNewViewportWidth
    ) {
        useCasePrev += useCaseTotalMovementSize;
        useCaseCarouselInner.style.left = useCasePrev + 'px';
        useCaseOldViewportWidth = useCaseNewViewportWidth;
    } else if (
        useCasePrev <= -useCaseTotalMovementSize &&
        useCaseOldViewportWidth > useCaseNewViewportWidth
    ) {
        useCasePrev -= useCaseTotalMovementSize;
        useCaseCarouselInner.style.left = useCasePrev + 'px';
        useCaseOldViewportWidth = useCaseNewViewportWidth;
    }
}
