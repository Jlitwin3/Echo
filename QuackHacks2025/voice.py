import pyttsx3

engine = pyttsx3.init()



rate = engine.getProperty('rate')
print(rate)
engine.setProperty('rate', 125)

volume = engine.getProperty('volume')
print(volume)
engine.setProperty('volume', 1.0)

voices = engine.getProperty('voices')
###engine.setProperty('voice', voices[1].id)

engine.say("Hello World!")
engine.say('My current speaking rate is ' + str(rate))
engine.runAndWait()
engine.stop()