import speech_recognition as sr
from TTS.api import TTS
import torch
import wave
import pyaudio as pa
import google.generativeai as genai
import os

def listen_to_user(input_file = "user_input.wav"):
    r = sr.Recognizer()
    with sr.AudioFile(input_file) as source:
        print("Processing audio file...")
        audio = r.record(source)
        try:
            text = r.recognize_google(audio)
            return text
        except sr.UnknownValueError:
            print("Speech Recognition could not understand audio")
            return None
        except sr.RequestError:
            print("Could not request results from Google Speech Recognition service")
            return None

def generate_response(text):
    if not text:
        print("Sorry, I didn't catch that. Can you repeat?")
        return None
    try:
        genai.configure(api_key=os.getenv("GOOGLE_AI_API_KEY"))
        model = genai.GenerativeModel("gemini-1.5-flash-latest")
        response = model.generate_content(text)
        if response and hasattr(response, 'candidates') and len(response.candidates) > 0:
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts') and len(candidate.content.parts) > 0:
                content = candidate.content.parts[0].text
                return content.strip()
            else:
                return None
        else:
            return None
    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def speak(text):
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
    tts.tts_to_file(text=text, speaker_wav="user_input.wav", language="en", file_path="output.wav")

def main():
    user_input = listen_to_user()
    if user_input:
        response = generate_response(user_input)
        speak(response)
        
        # Write the response to a file
        with open('response.txt', 'w') as f:
            f.write(f"{user_input}\n{response}")
    else:
        print("Sorry I didn't catch that, can you repeat?")

if __name__ == "__main__":
    main()

