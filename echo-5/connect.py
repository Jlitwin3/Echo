from flask import Flask, request, jsonify
from bot2_2 import main as bot_main

app = Flask(__name__)

@app.route("/process", methods=["POST"])
def process():
    try:
        # Call the main function from bot2-2.py
        user_speech, ai_response, audio_file = bot_main()
        
        return jsonify({
            "userSpeech": user_speech,
            "botResponse": ai_response,
            "audioResponse": audio_file
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

