from flask import Flask, request, jsonify
from flask_cors import CORS
from bot2_2 import main as bot_main

app = Flask(__name__)
CORS(app)

@app.route("/process", methods=["POST"])
def process():
    try:
        print("Received request at /process")
        
        # Call the main function from bot2_2.py
        user_speech, ai_response = bot_main()
        
        print(f"User speech: {user_speech}")
        print(f"AI response: {ai_response}")

        return jsonify({
            "userSpeech": user_speech,
            "botResponse": ai_response
        })
    except Exception as e:
        print(f"Error in /process: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)

