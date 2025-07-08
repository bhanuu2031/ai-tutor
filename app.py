from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd

# ✅ Create the app
app = Flask(__name__)
CORS(app)  # Enable CORS for frontend connection

# ✅ Load the dataset once
df = pd.read_csv("dataset_jee.csv")

@app.route('/')
def home():
    return "✅ Flask server is running! Try /topics or /questions"

@app.route('/topics', methods=['GET'])
def get_topics():
    return jsonify(sorted(df['Topic'].dropna().unique().tolist()))

# ✅ All unique subjects
@app.route('/subjects', methods=['GET'])
def get_subjects():
    return jsonify(sorted(df['Subject'].dropna().unique().tolist()))

@app.route('/questions', methods=['GET'])
def get_questions():
    filtered_df = df.copy()

    # Use lowercase keys
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

# ✅ Quiz generator
@app.route('/quiz', methods=['GET'])
def quiz():
    topic = request.args.get('topic')
    count = request.args.get('count', 5)

    if topic is None:
        return jsonify({"error": "Topic parameter is required"}), 400

    try:
        count = int(count)
    except ValueError:
        return jsonify({"error": "Invalid count value"}), 400

    filtered_df = df[df['Topic'].str.lower() == topic.lower()]

    if len(filtered_df) < count:
        return jsonify({"error": "Not enough questions in this topic"}), 400

    sample = filtered_df.sample(n=count)
    return jsonify(sample.to_dict(orient='records'))

# ✅ Run the app
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
