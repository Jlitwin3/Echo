from transformers import pipeline
import speech_recognition as sr
import pyttsx3
import openai
import asyncio
from TTS.api import TTS
import torch
from speechToText import audioFile as af
import wave
import pyaudio as pa
import google.generativeai as genai





def listen_to_user(output_file = "user_input.wav"):

    r = sr.Recognizer()

    with sr.Microphone() as source:

        print("Ask a question for the Bot to answer!")

        audio = r.listen(source, timeout = 5, phrase_time_limit = 10)

        try:

            with open(output_file, "wb") as f:
                f.write(audio.get_wav_data())
                print("Audio saved to", output_file)

            text = r.recognize_google(audio)

            return text
        except sr.UnknownValueError:
            print("Speech Recognition could not understand audio")
            return None
        except sr.RequestError:
            print("Could not request results from Google Speech Recognition service")
            return None
        


##def generate_response(text):
    ##if not text:
        ##print("Sorry I didn't catch that, can you repeat?")
    ##model = pipeline("text2text-generation", model="google/flan-t5-base", batch_size=1, device = -1)

    ##response = model(text, max_new_tokens = 200)[0]["generated_text"]

    ##return response

def generate_response(text):
    if not text:
        print("Sorry, I didn't catch that. Can you repeat?")
        return None

    try:
        # Configure the API
        genai.configure(api_key="AIzaSyArKoZaTlIZd-R_NP-DKz9q-ngb5Vgi6LE")

        # Initialize the model
        model = genai.GenerativeModel("gemini-1.5-flash-latest")

        # Generate content
        response = model.generate_content(text)

        # Debug: Print the response to check structure
        print("Response received:", response)

        # Extract the content
        if response and hasattr(response, 'candidates') and len(response.candidates) > 0:
            # Print first candidate to debug its content
            print("First candidate structure:", response.candidates[0])

            # Extract content from the candidate
            candidate = response.candidates[0]

            # Check if 'parts' exists and contains 'text'
            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts') and len(candidate.content.parts) > 0:
                # Extract text from the first part
                content = candidate.content.parts[0].text
                print("Extracted content:", content)
                return content.strip()
            else:
                print("No 'parts' or 'text' field found in candidate content.")
                return None
        else:
            print("No candidates found in the response.")
            return None

    except Exception as e:
        print(f"An error occurred: {e}")
        return None

def voice_sample():
    name = input("Enter your name: ")
    filename = input("Enter a filename for the audio: ")

    audio_file = af(name, filename)
    audio_file.getAudio()

    return audio_file.filename



def play_audio(wav):
    wf = wave.open("output.wav", 'rb')

    p = pa.PyAudio()

    stream = p.open(format=pa.paInt16,
                    channels=wf.getnchannels(),
                    rate=wf.getframerate(),
                    output=True)
    
    chunk = 1024
    data = wf.readframes(chunk)
    while data:
        stream.write(data)
        data = wf.readframes(chunk)

    stream.stop_stream()
    stream.close()
    p.terminate()


def speak(text):
    #voice = voice_sample()
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
    wav = tts.tts_to_file(text=text, speaker_wav = f"user_input.wav", language = "en", file_path = "output.wav")
    #save_audio(wav)
    
    play_audio(wav)





def main():
    while True:

        user_input = listen_to_user()
        if user_input:
            
            print("Your speech: ", user_input)
            response = generate_response(user_input)
            speak(response)
            print("Bot:", response)
            
            
        else:
            print("Sorry I didn't catch that, can you repeat?")

main()