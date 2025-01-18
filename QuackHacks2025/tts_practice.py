from TTS.api import TTS
import torch

device = "cuda" if torch.cuda.is_available() else "cpu"

#print(TTS().list_models())


tts = TTS("tts_models/multilingual/multi-dataset/xtts_v2").to(device)

print(tts.speakers)

