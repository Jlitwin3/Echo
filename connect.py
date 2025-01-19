
from flask import Flask, request, jsonify
from bot2 import listen_to_user, generate_response, speak, main
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
    
@app.route("/process", methods=["POST"])
def process():
    try:
        print("Received request at /process")
        main()
        # Listen to user speech
        # data = request.get_json()
        # if not data or "speech" not in data: 
        #     return jsonify({"error": "Invalid JSON input"}), 400
        
        # user_speech = data.get("speech", "")

        # if not user_speech:
        #     return jsonify({"error": "No speech detected"}), 400
        
        # # Generate AI response
        # ai_response = generate_response(user_speech)
        # if not ai_response:
        #     return jsonify({"error": "Failed to generate AI response"}), 500

        # # Convert response to speech
        # speak(ai_response)

        # return jsonify({
        #     "userSpeech": user_speech,
        #     "botResponse": ai_response
        # })
    except Exception as e:
        print(f"Error in /process: {str(e)}")
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True,port=5500)

#----------
# from flask import Flask, request, jsonify
# from bot2 import listen_to_user, generate_response, play_audio, speak
# from bot2 import main as bot_main 



# app = Flask(__name__)

# @app.route("/process", methods=["POST"])
# def process():
#     try:
#         print("Received request at /process")
        
#         # Call the main function from bot2_2.py
#         user_speech, ai_response = bot_main()
        
#         print(f"User speech: {user_speech}")
#         print(f"AI response: {ai_response}")

#         return jsonify({
#             "userSpeech": user_speech,
#             "botResponse": ai_response
#         })
#     except Exception as e:
#         print(f"Error in /process: {str(e)}")
#         return jsonify({"error": str(e)}), 500
#     # user_speech = request.json.get("speech", "")
#     # user_text = listen_to_user(user_speech)  # Convert speech to text
#     # ai_response = generate_response(user_text)  # AI generates a response
#     # audio_response = speak(ai_response)  # Convert response to speech
#     # return jsonify({"response": ai_response, "audio": audio_response})

# if __name__ == "__main__":
#     app.run(debug=True)


