function setupInfiniteCarousel({
    prevButtonId,
    nextButtonId,
    carouselVpId,
    carouselInnerId,
    itemClass
}) {
    const prevButton = document.querySelector(prevButtonId);
    const nextButton = document.querySelector(nextButtonId);
    const carouselVp = document.querySelector(carouselVpId);
    const carouselInner = document.querySelector(carouselInnerId);

    let items = document.querySelectorAll(itemClass);
    const itemWidth =
        items[0].getBoundingClientRect().width +
        parseFloat(
            window.getComputedStyle(carouselInner).getPropertyValue('gap'),
            10
        );

    let currentIndex = items.length;

    items.forEach((item) => {
        const clone = item.cloneNode(true);
        carouselInner.appendChild(clone);
    });

    items.forEach((item) => {
        const clone = item.cloneNode(true);
        carouselInner.insertBefore(clone, items[0]);
    });

    items = document.querySelectorAll(itemClass);

    carouselInner.style.transition = 'none';
    carouselInner.style.transform = `translateX(-${
        currentIndex * itemWidth
    }px)`;

    nextButton.addEventListener('click', () => {
        currentIndex++;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(-${
            currentIndex * itemWidth
        }px)`;

        setTimeout(() => {
            if (currentIndex >= items.length - items.length / 3) {
                currentIndex = items.length / 3;
                carouselInner.style.transition = 'none';
                carouselInner.style.transform = `translateX(-${
                    currentIndex * itemWidth
                }px)`;
            }
        }, 500);
    });

    prevButton.addEventListener('click', () => {
        currentIndex--;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(-${
            currentIndex * itemWidth
        }px)`;

        setTimeout(() => {
            if (currentIndex < items.length / 3) {
                currentIndex = items.length - items.length / 3 - 1;
                carouselInner.style.transition = 'none';
                carouselInner.style.transform = `translateX(-${
                    currentIndex * itemWidth
                }px)`;
            }
        }, 500);
    });

    window.addEventListener('resize', () => {
        const newItemWidth =
            items[0].getBoundingClientRect().width +
            parseFloat(
                window.getComputedStyle(carouselInner).getPropertyValue('gap'),
                10
            );

        currentIndex = items.length / 3;
        carouselInner.style.transition = 'none';
        carouselInner.style.transform = `translateX(-${
            currentIndex * newItemWidth
        }px)`;
    });
}

setupInfiniteCarousel({
    prevButtonId: '#prev',
    nextButtonId: '#next',
    carouselVpId: '#carousel-vp',
    carouselInnerId: '#cCarousel-inner',
    itemClass: '.cCarousel-item'
});

setupInfiniteCarousel({
    prevButtonId: '#useCasePrev',
    nextButtonId: '#useCaseNext',
    carouselVpId: '#useCaseCarousel-vp',
    carouselInnerId: '#useCaseCarousel-inner',
    itemClass: '.useCaseCarousel-item'
});;

setupInfiniteCarousel({
    prevButtonId: '#mediaPrev',
    nextButtonId: '#mediaNext',
    carouselVpId: '#mediaCarousel-vp',
    carouselInnerId: '#mediaCarousel-inner',
    itemClass: '.mediaCarousel-item'
});

document.addEventListener('DOMContentLoaded', () => {
    const specialDates = document.querySelectorAll('.date.special');

    specialDates.forEach((dateElement) => {
        const infoIcon = document.createElement('i');
        infoIcon.className = 'info-icon material-icons';
        infoIcon.textContent = 'info';
        dateElement.appendChild(infoIcon);

        dateElement.addEventListener('click', (event) => {
            if (event.target.classList.contains('info-icon')) return;

            dateElement.classList.toggle('expanded');
        });
    });
});
