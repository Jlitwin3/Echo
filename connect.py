from flask import Flask, request, jsonify
from bot2 import 


app = Flask(__name__)

@app.route("/process", methods=["POST"])
def process():
    user_speech = request.json.get("speech", "")
    user_text = speech_to_text(user_speech)  # Convert speech to text
    ai_response = generate_response(user_text)  # AI generates a response
    audio_response = text_to_speech(ai_response)  # Convert response to speech
    return jsonify({"response": ai_response, "audio": audio_response})

if __name__ == "__main__":
    app.run(debug=True)

