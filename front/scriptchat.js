// scripts.js

function sendMessage() {
    const userInput = document.getElementById('user-input').value;
    if (userInput.trim() !== "") {
        displayMessage(userInput, 'user');
        document.getElementById('user-input').value = '';

        // Simulate a bot response after a short delay
        setTimeout(() => {
            displayMessage("Thank you for your question! Here's some information on " + userInput + ".", 'bot');
        }, 1000);
    }
}

function sendQuickReply(reply) {
    displayMessage(reply, 'user');

    // Simulate a bot response after a short delay
    setTimeout(() => {
        displayMessage("Here's what you need to know about " + reply + ".", 'bot');
    }, 1000);
}

function displayMessage(message, sender) {
    const chatboxMessages = document.getElementById('chatbox-messages');
    const messageElement = document.createElement('div');
    messageElement.className = 'message ' + (sender === 'bot' ? 'bot-message' : 'user-message');
    messageElement.innerHTML = `
        <div class="avatar ${sender === 'bot' ? 'bot-avatar' : 'user-avatar'}">${sender === 'bot' ? '🤖' : '👤'}</div>
        <div class="message-content">${message}</div>
    `;
    chatboxMessages.appendChild(messageElement);
    chatboxMessages.scrollTop = chatboxMessages.scrollHeight;
}
