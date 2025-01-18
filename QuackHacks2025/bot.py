from transformers import pipeline
import speech_recognition as sr
import pyttsx3
import openai
import asyncio

##api_key="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"




def listen_to_user():

    r = sr.Recognizer()

    with sr.Microphone() as source:

        print("Ask a question for the Bot to answer!")

        audio = r.listen(source, timeout = 5, phrase_time_limit = 10)

        try:

            text = r.recognize_google(audio)

            return text
        except sr.UnknownValueError:
            print("Speech Recognition could not understand audio")
            return None
        except sr.RequestError:
            print("Could not request results from Google Speech Recognition service")
            return None

"""def generate_response(text):
    if not text:
        print("Sorry I didn't catch that, can you repeat?")
    model = pipeline("text2text-generation", model="google/flan-t5-base", batch_size=1, device = -1)

    response = model(text)[0]["generated_text"]

    return response"""

async def generate_response(text):
    try:
        response = await openai.chat.completions.create(model = "gpt-3.5-turbo", 
                                                 messages = [{"role": "user", "content": text}], 
                                                 max_tokens = 150, temperature = 0.7)

        return response.choices[0].message.content.strip()

    except Exception as e:
        print(f"Unexpected error: {e}")
        return "Something went wrong. Please try again later."




def speak(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()

async def main():
    while True:

        user_input = listen_to_user()
        if user_input:
            print("Your speech: ", user_input)
            response = await generate_response(user_input)
            print("Bot:", response)
            speak(response)
        else:
            print("Sorry I didn't catch that, can you repeat?")


asyncio.run(main())