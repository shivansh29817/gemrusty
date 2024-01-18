const sendButton = document.getElementById('send-button');
const userInput = document.getElementById('user-input');
const chatLog = document.getElementById('chat-log');
const converter = new showdown.Converter();

// Function to handle sending the prompt
const sendPrompt = async () => {
  const prompt = userInput.value.trim();

  if (prompt !== '') {
    try {
      const response = await fetch('/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `userInput=${encodeURIComponent(prompt)}`,
      });

      const result = await response.json();
      const rawText = result.response;

      // Convert raw text to HTML using showdown
      const htmlText = converter.makeHtml(rawText);

      const messageElement = document.createElement('div');
      messageElement.innerHTML = htmlText;
      chatLog.appendChild(messageElement);

      // Clear the input field after sending the prompt
      userInput.value = '';
    } catch (error) {
      console.error('Error fetching or processing response:', error);
    }
  }
};

// Event listener for the "Send" button click
sendButton.addEventListener('click', sendPrompt);

// Event listener for the "Enter" key press
userInput.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    // Prevent the default behavior of the "Enter" key (form submission)
    event.preventDefault();
    sendPrompt();
  }
});
