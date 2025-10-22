document.addEventListener("DOMContentLoaded", () => {
  const registrationForm = document.getElementById("registration-form");
  const usernameInput = document.getElementById("username");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const messageArea = document.getElementById("message-area");

  registrationForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    hideMessage();

    const userData = {
      username: usernameInput.value,
      email: emailInput.value,
      password: passwordInput.value,
    };

    try {
      const response = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        showMessage(data.message, "success");
        registrationForm.reset();
      } else {
        showMessage(data.message, "error");
      }
    } catch (error) {
      console.error("Erro de rede:", error);
      showMessage("Não foi possível conectar ao servidor.", "error");
    }
  });

  function showMessage(message, type) {
    messageArea.textContent = message;
    messageArea.className = `message-area ${type}`;
  }

  function hideMessage() {
    messageArea.textContent = "";
    messageArea.className = "message-area";
  }
});
