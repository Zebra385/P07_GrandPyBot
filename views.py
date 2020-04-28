from flask import Flask, render_template, url_for, jsonify, request
from recup_adresse import Question_Place

app = Flask(__name__)


@app.route('/')
@app.route('/P07_GrandPyBot')
def accueil():
    return render_template('accueil.html')
@app.route('/find-site', methods=['POST'])
def find_site():
    data = request.get_json()
    text_input = data['text']
    question = Question_Place(text_input)
    response = question.send()
    return jsonify(response)

