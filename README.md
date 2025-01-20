This project connects an AI system with a user interface that enables real-time spoken interaction. Users can speak to the AI, and the AI will respond both visually (text) and audibly (voice).

Features:

Speech-to-Text (STT): Converts user speech into text.

AI Response Generation: Processes user input and generates appropriate responses.

Text-to-Speech (TTS): Converts the AI's response into an audio file.

User Interface: A simple HTML/JavaScript frontend for interaction.

Technologies Used

Backend

Flask: A lightweight Python web framework for creating API endpoints.

Speech-to-Text (STT): Python libraries like SpeechRecognition or similar.

AI Logic: Custom AI logic for generating responses.

Text-to-Speech (TTS): Libraries like pyttsx3 or gTTS for audio generation.

Frontend

HTML/CSS/JavaScript: Provides a simple and interactive user interface.

JavaScript Fetch API: Handles communication with the Flask backend.

How It Works: 

User Input:

The user clicks a button to begin speaking.

The browser records the user’s voice and sends it to the backend.

Processing:

The Flask backend receives the audio and converts it to text using an STT module.

The AI logic processes the text and generates a response.

The response is converted to audio using a TTS module.

Response:

The backend sends the AI’s response (text and audio) back to the frontend.

The frontend displays the response text and plays the audio.


REQUIRED INSTALLS: 

SpeechRecognition
TTS
torch
pyaudio
npm
flask

