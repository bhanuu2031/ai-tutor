from flask import Flask, request, jsonify, session
from flask_cors import CORS
import pandas as pd
import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)
app.secret_key = 'Key_Here'


# ✅ Dummy users
users = {"student@example.com": "123456"}

# ✅ Load dataset
df = pd.read_csv("dataset_jee.csv")

# ----------------------- Quiz Functionality -----------------------

@app.route('/')
def home():
    return "✅ Flask server is running! Try /topics, /questions, /quiz, /chat"

@app.route('/topics')
def get_topics():
    return jsonify(sorted(df['Topic'].dropna().unique().tolist()))

@app.route('/subjects')
def get_subjects():
    return jsonify(sorted(df['Subject'].dropna().unique().tolist()))

@app.route('/questions')
def get_questions():
    filtered_df = df.copy()
    subject = request.args.get('subject')
    topic = request.args.get('topic')
    year = request.args.get('year')

    if subject:
        filtered_df = filtered_df[filtered_df['Subject'].str.lower() == subject.lower()]
    if topic:
        filtered_df = filtered_df[filtered_df['Topic'].str.lower() == topic.lower()]
    if year:
        filtered_df = filtered_df[filtered_df['Year'] == int(year)]

    return jsonify(filtered_df.to_dict(orient='records'))

@app.route('/quiz')
def quiz():
    topic = request.args.get('topic')
    count = int(request.args.get('count', 5))

    if not topic:
        return jsonify({"error": "Topic parameter is required"}), 400

    filtered = df[df['Topic'].str.lower() == topic.lower()]
    if len(filtered) < count:
        return jsonify({"error": "Not enough questions"}), 400

    sample = filtered.sample(n=count)
    return jsonify(sample.to_dict(orient='records'))

# ---------------------- Auth Functionality ------------------------

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if email in users:
        return jsonify({"error": "User already exists"}), 409

    users[email] = password
    return jsonify({"message": "Signup successful"}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    if users.get(email) == password:
        session["user"] = email
        return jsonify({"message": "Login successful"}), 200
    return jsonify({"error": "Invalid credentials"}), 401

@app.route('/logout', methods=['GET'])
def logout():
    session.pop("user", None)
    return jsonify({"message": "Logged out"}), 200

@app.route('/me', methods=['GET'])
def me():
    if "user" in session:
        return jsonify({"user": session["user"]})
    return jsonify({"error": "Not logged in"}), 401

# ---------------------- Nexa-AI Chat using Gemini ------------------------

@app.route("/chat", methods=["POST"])
def chat():
    user_msg = request.json.get("message", "")
    if not user_msg:
        return jsonify({"error": "No message provided"}), 400

    try:
        response = requests.post(
            "https://api.groq.com/openai/v1/chat/completions",
            headers={
                "Authorization": f"Bearer {os.getenv('GROQ_API_KEY')}",
                "Content-Type": "application/json"
            },
            json={
                "model": "llama3-70b-8192",
                "messages": [
                    {"role": "system", "content": "You are Nexa-AI, an exam mentor for JEE/NEET/UPSC."},
                    {"role": "user", "content": user_msg}
                ],
                "temperature": 0.7,
                "max_tokens": 200
            }
        )

        result = response.json()

        if "error" in result:
            return jsonify({"error": result["error"]["message"]}), 500

        reply = result["choices"][0]["message"]["content"]
        return jsonify({"reply": reply})
    except Exception as e:
        return jsonify({"error": f"LLaMA error: {str(e)}"}), 500

# ---------------------- Run Server ------------------------

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
