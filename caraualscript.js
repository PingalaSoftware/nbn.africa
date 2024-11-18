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

    let currentIndex = items.length; // Start at the first original item (after prepended clones)

    // Clone all items and append/prepend them for infinite looping
    items.forEach((item) => {
        const clone = item.cloneNode(true);
        carouselInner.appendChild(clone); // Append clones to the end
    });

    items.forEach((item) => {
        const clone = item.cloneNode(true);
        carouselInner.insertBefore(clone, items[0]); // Prepend clones to the beginning
    });

    // Update items after cloning
    items = document.querySelectorAll(itemClass);

    // Adjust the initial position to show the first original set
    carouselInner.style.transition = 'none';
    carouselInner.style.transform = `translateX(-${
        currentIndex * itemWidth
    }px)`;

    // Handle next button click
    nextButton.addEventListener('click', () => {
        currentIndex++;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(-${
            currentIndex * itemWidth
        }px)`;

        // Loop back to the original items
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

    // Handle prev button click
    prevButton.addEventListener('click', () => {
        currentIndex--;
        carouselInner.style.transition = 'transform 0.5s ease-in-out';
        carouselInner.style.transform = `translateX(-${
            currentIndex * itemWidth
        }px)`;

        // Loop back to the original items
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

    // Handle window resize
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

// Set up carousels
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
});
