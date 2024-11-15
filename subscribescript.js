document
    .getElementById('newsletter-form')
    .addEventListener('submit', async function (e) {
        e.preventDefault(); // Prevent form from submitting normally

        const devUrl = 'https://edua-admin.ledgermail.io';
        // const prodUrl = "";
        const originUrl = window.location.origin; // Gets the current origin dynamically
        console.log(originUrl);

        const nameField = document.getElementById('name');
        const emailField = document.getElementById('email');
        const subscribeButton = document.getElementById('subscribe-button');
        const responseMessage = document.getElementById('response-message');

        const name = nameField.value;
        const email = emailField.value;

        // Email validation regex pattern
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Input validation
        if (!name && !email) {
            responseMessage.textContent = 'Please enter the details.';
            responseMessage.style.color = 'red';
            return;
        }
        if (!name) {
            responseMessage.textContent = 'Please enter your name';
            responseMessage.style.color = 'red';
            return;
        } else if (!emailPattern.test(email)) {
            responseMessage.textContent = 'Please enter a valid email address.';
            responseMessage.style.color = 'red';
            return;
        }

        // Show loading state
        responseMessage.textContent = ''; // Clear any previous messages
        subscribeButton.disabled = true;
        subscribeButton.textContent = 'Subscribing...';

        try {
            const response = await fetch(
                `${devUrl}/edua/nbn/api/v1/subscribe`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'edua-public',
                        Origin: originUrl, // Dynamically set the Origin header
                    },
                    body: JSON.stringify({ name, email }),
                }
            );

            const result = await response.json();

            if (response.ok && result.error === false) {
                // Success
                subscribeButton.textContent = 'Subscribed';

                // Clear name and email fields
                nameField.value = '';
                emailField.value = '';
            } else {
                // Error from server
                throw new Error(result.message || 'Failed to subscribe');
            }
        } catch (error) {
            responseMessage.textContent = error.message;
            responseMessage.style.color = 'red';
            subscribeButton.disabled = false; // Re-enable button on error
            subscribeButton.textContent = 'SUBSCRIBE';
        }
    });
