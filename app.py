from flask import Flask, render_template, request, jsonify
import google.generativeai as genai

# Initialize Flask app
app = Flask(__name__)
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)


# Configure Google API Key
genai.configure(api_key="AIzaSyCenB10p3CKKiVXqHiEiGTB5JtcNy2aDeM")
model = genai.GenerativeModel("gemini-pro")


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/generate", methods=["POST"])
def generate_response():
    data = request.json
    prompt = data.get("prompt", "")
    
    # Check for personalized queries
    lower_case_prompt = prompt.lower()
    if any(phrase in lower_case_prompt for phrase in ["who are you","introduce yourself","introduce appy.ai","what is your name", "tell me about you", "what's your name", "what are you", "introduce yourself","who are you"]):
        chat = model.start_chat(history=[])
        response = chat.send_message("'I am Appy.ai, made by Abhinandan!' reply this in a unique way. remember made in the sence of created the ai model")
        return jsonify({"response": response.text})
    elif any(phrase in lower_case_prompt for phrase in ["who made you","who developed you","introduce your creator","By what means were you brought into existence","By what were you brought into existence","Who is your creator","who is your developer","who created this","who made this","what is your creator","who build appy.ai","who made appy.ai","who is the developer of appy.ai","who developed appy.ai"]):
        chat = model.start_chat(history=[])
        response = chat.send_message("'Abhinandan developed this ai model, appy.ai!' reply this in a unique way. remember made in the sence of created the ai model and lastly say a little thanks to abhinandan and provide @abhinandan_ap_ is the instagram handel of abhinandan to follow to get in touch in that reply")
        return jsonify({"response": response.text})
    elif any(phrase in lower_case_prompt for phrase in ["who is abhinandan parhi","do you know abhinandan parhi","introduce abhinandan parhi","do you know abhinandan parhi"]):
        chat = model.start_chat(history=[])
        response = chat.send_message("'Abhinandan Parhi, an AI/ML enthusiast and Computer Science Engineering student, specializes in Python, machine learning, and data analysis, driving impactful solutions through innovation and real-world applications in emerging technologies. Abhinandan developed this ai model, appy.ai!' reply this in a unique way. remember made in the sence of created the ai model and lastly say a little thanks to abhinandan and provide @abhinandan_ap_ is the instagram handel of abhinandan to follow in that reply")
        return jsonify({"response": response.text})
    lower_case_prompt = prompt.lower()

    try:
        # Proceed with the usual chat generation if not a personalized query
        chat = model.start_chat(history=[])
        response = chat.send_message(prompt)
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": "Error: Could not process your request."})


@app.route("/lamborghini", methods=["GET"])
def describe_lamborghini():
    try:
        chat = model.start_chat(history=[])
        response = chat.send_message("Describe Lamborghini Urus.")
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": "Error: Could not process your request."})


@app.route("/story", methods=["GET"])
def lazy_programmer_story():
    try:
        chat = model.start_chat(history=[])
        response = chat.send_message("Create a story of lazy Programmer Abhinandan within 80 words.")
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": "Error: Could not process your request."})


@app.route("/joke", methods=["GET"])
def tell_joke():
    try:
        chat = model.start_chat(history=[])
        response = chat.send_message("Tell me a funny joke.")
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": "Error: Could not process your request."})


@app.route("/quote", methods=["GET"])
def inspirational_quote():
    try:
        chat = model.start_chat(history=[])
        response = chat.send_message("Share an inspirational quote.")
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": "Error: Could not process your request."})


@app.route("/fact", methods=["GET"])
def interesting_fact():
    try:
        chat = model.start_chat(history=[])
        response = chat.send_message("Tell me a random interesting fact.")
        return jsonify({"response": response.text})
    except Exception as e:
        return jsonify({"response": "Error: Could not process your request."})


if __name__ == "__main__":
    app.run(debug=True)
