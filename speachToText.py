import pyaudio
import wave

audio = pyaudio.PyAudio()

stream = audio.open(format=pyaudio.paInt16, channels=1, rate=44100, input=True, frames_per_buffer=1024)

frames = []

try: 
    while True: 
        data = stream.read(1024)
        frames.append(data)
except KeyboardInterrupt: 
    pass


stream.stop_stream()
stream.close()
audio.terminate()

soundfile = wave.open("myrecording.wav", "wb")
soundfile.setnchannels(1)
soundfile.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
soundfile.setframerate(44100)
soundfile.writeframes(b''.join(frames))
soundfile.close()
