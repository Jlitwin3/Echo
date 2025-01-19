import speech_recognition as sr
from TTS.api import TTS
import torch
import wave
import pyaudio as pa
import google.generativeai as genai



def listen_to_user(output_file = "user_input.wav"):
    r = sr.Recognizer()
    with sr.Microphone() as source:
        print("Ask a question for the Bot to answer!")
        r.adjust_for_ambient_noise(source)
        audio = r.listen(source, timeout = 10, phrase_time_limit = 20)
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
        


def generate_response(text):
    if not text:
        print("Sorry, I didn't catch that. Can you repeat?")
        return None
    try:
        genai.configure(api_key="AIzaSyArKoZaTlIZd-R_NP-DKz9q-ngb5Vgi6LE")
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
    device = 'cuda' if torch.cuda.is_available() else 'cpu'
    tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)
    wav = tts.tts_to_file(text=text, speaker_wav = f"user_input.wav", language = "en", file_path = "output.wav")
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
