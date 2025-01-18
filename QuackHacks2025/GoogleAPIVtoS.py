from google.cloud import speech

def speech_to_text(config: speech.RecognitionConfig, audio: speech.RecognitionAudio) -> speech.RecognizeResponse:
    client = speech.SpeechClient()
    response = client.recognize(config=config, audio=audio)
    return response

def print_response(response: speech.RecognizeResponse):
    for result in response.results:
        print(result)

def print_result(result: speech.SpeechRecognitionResult):
    best_alternative = result.alternatives[0]
    print("-" * 80)
    print(f"Language Code: {result.language_code}")
    print(f"Transcript: {best_alternative.transcript}")
    print(f"Confidence: {best_alternative.confidence:.0}")


config = speech.RecognitionConfig(language_code ="en")
audio = speech.RecognitionAudio(uri="gs://cloud-samples-data/speech/brooklyn_bridge.flac")
response = speech_to_text(config, audio)
print_response(response)