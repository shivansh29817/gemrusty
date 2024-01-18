// Replace 'YOUR_GEMINI_API_KEY' with your actual Gemini API key
const { GoogleGenerativeAI } = require("@google/generative-ai");

const chatMessages = document.getElementById('chat-messages');
const userInput = document.getElementById('user-input');

// Replace this with your actual Gemini API key
const GEMINI_API_KEY = 'AIzaSyCIgcXZQwNM6V1BUSWZl2OYa_6LG-tp9oY';

function sendMessage() {
    const userMessage = userInput.value;

    if (userMessage.trim() === '') return;

    displayMessage('You', userMessage, 'user');
    userInput.value = '';

    // Call the Gemini API
    getGeminiApiResponse(userMessage)
        .then((aiResponse) => {
            displayMessage('AI', aiResponse, 'ai');
        })
        .catch((error) => {
            console.error('Error fetching Gemini API:', error);
            displayMessage('AI', 'Error occurred while fetching response.', 'ai-error');
        });
}

function displayMessage(sender, message, type) {
    const messageContainer = document.createElement('div');
    messageContainer.classList.add('message', type);

    // Check if the message contains Markdown-style bold syntax
    const boldRegex = /\*\*(.*?)\*\*/g;
    const formattedMessage = message.replace(boldRegex, '<strong>$1</strong>');

    messageContainer.innerHTML = `<strong>${sender}:</strong> ${formattedMessage}`;
    chatMessages.appendChild(messageContainer);

    // Scroll to the bottom of the chat messages
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function getGeminiApiResponse(userMessage) {
    try {
        const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

        const result = await model.generateContent(userMessage);
        const response = await result.response;
        const text = response.text();

        return text;
    } catch (error) {
        throw new Error('Error calling Gemini API: ' + error.message);
    }
}
    