function toggleAccordion(element) {
    const content = element.querySelector('.faq-content');
    const icon = element.querySelector('.material-icons');
    const isOpen = content.style.display === 'block';

    // Close all FAQ items
    document
        .querySelectorAll('.faq-content')
        .forEach((el) => (el.style.display = 'none'));
    document
        .querySelectorAll('.material-icons')
        .forEach((el) => (el.textContent = 'expand_more'));

    // Toggle the clicked FAQ item
    if (!isOpen) {
        content.style.display = 'block';
        icon.textContent = 'expand_less';
    } else {
        content.style.display = 'none';
        icon.textContent = 'expand_more';
    }
}
