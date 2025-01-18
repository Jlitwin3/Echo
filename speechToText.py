import pyaudio
import wave

recordings = {}

class audioFile: 
    def __init__(self, name: str, filename: str): 
        self.name = name
        self.filename = filename

    def getAudio(self):

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

        soundfile = wave.open(f"{self.filename}.wav", "wb")
        recordings[self.name] = f"{self.filename}.wav"
        soundfile.setnchannels(1)
        soundfile.setsampwidth(audio.get_sample_size(pyaudio.paInt16))
        soundfile.setframerate(44100)
        soundfile.writeframes(b''.join(frames))
        soundfile.close()
        print(f"Audio file saved as: {filename}.wav!")


if __name__ == "__main__":
    name = input("Enter your name: ")
    filename = input("Enter a filename for the audio: ")

    audio_file = audioFile(name, filename)
    audio_file.getAudio()

    print(f"Recording for {name} saved as {filename}.wav")
    print("All recordings:", recordings)