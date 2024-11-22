document
  .getElementById("newsletter-form")
  .addEventListener("submit", async function (e) {
    e.preventDefault();

    const url = "https://edua-admin.ledgermail.io";

    // dev url
    // const url = "http://localhost:4042";
    const originUrl = window.location.origin;
    console.log(originUrl);

    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const subscribeButton = document.getElementById("subscribe-button");
    const responseMessage = document.getElementById("response-message");

    const name = nameField.value;
    const email = emailField.value;

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name && !email) {
      responseMessage.textContent = "Please enter the details.";
      responseMessage.style.color = "red";
      return;
    }
    if (!name) {
      responseMessage.textContent = "Please enter your name";
      responseMessage.style.color = "red";
      return;
    } else if (!emailPattern.test(email)) {
      responseMessage.textContent = "Please enter a valid email address.";
      responseMessage.style.color = "red";
      return;
    }

    responseMessage.textContent = "";
    subscribeButton.disabled = true;
    subscribeButton.textContent = "Subscribing...";

    try {
      const response = await fetch(`${url}/edua/nbn/api/v1/subscribe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "edua-public",
          Origin: originUrl,
        },
        body: JSON.stringify({ name, email }),
      });

      const result = await response.json();

      if (response.ok && result.error === false) {
        subscribeButton.textContent = "Subscribed";

        nameField.value = "";
        emailField.value = "";
      } else {
        throw new Error(result.message || "Failed to subscribe");
      }
    } catch (error) {
      responseMessage.textContent = error.message;
      responseMessage.style.color = "red";
      subscribeButton.disabled = false; 
      subscribeButton.textContent = "SUBSCRIBE";
    }
  });
