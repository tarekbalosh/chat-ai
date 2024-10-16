
       
        async function sendToGeminiAI(message) {
    try {
        const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyDHHJFjSa5oL0WJqwKz0VYTtZSke8080sU', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [ // Adjusting to match the API specification
                    {
                        parts: [
                            {
                                text: message // Use the message input directly
                            }
                        ]
                    }
                ]
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('AI Response:', data); // Log the full response to understand its structure
        
        // Check if the response contains candidates and return the output
        if (data.candidates && data.candidates.length > 0) {
            const candidate = data.candidates[0]; // Get the first candidate
            const parts = candidate.content.parts; // Access parts from the candidate's content

            if (parts.length > 0) {
                return parts[0].text; // Return the text from the first part
            }
        }

        return 'No valid response from AI'; // Default response if no valid output is found
    } catch (error) {
        console.error('Error sending message to Gemini AI:', error);
        return null; // Return null in case of error to avoid breaking the chat flow
    }
}

    
        // Function to send the message in chat
        async function sendMessage() {
            const messageInput = document.getElementById('messageInput');
            const message = messageInput.value.trim();
    
            if (message) {
                // Create a new message div (user message)
                const newMessage = document.createElement('div');
                newMessage.classList.add('message', 'sent');
                newMessage.innerHTML = `<p>${message}</p>`;
    
                const chatBody = document.getElementById('chatBody');
                chatBody.appendChild(newMessage);
    
                // Scroll to the bottom of the chat
                chatBody.scrollTop = chatBody.scrollHeight;
    
                // Send the message to the AI
                const aiResponse = await sendToGeminiAI(message);
    
                // Display AI response if any
                if (aiResponse) {
                    const aiMessage = document.createElement('div');
                    aiMessage.classList.add('message', 'received');
                    aiMessage.innerHTML = `<p>${aiResponse}</p>`;
                    chatBody.appendChild(aiMessage);
    
                    // Scroll to the bottom of the chat after AI response
                    chatBody.scrollTop = chatBody.scrollHeight;
                }
    
                // Clear the input field
                messageInput.value = '';
            }
        }
    
        // Function to check if Enter key is pressed
        function checkKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }
    
