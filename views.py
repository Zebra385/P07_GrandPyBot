from flask import Flask, render_template, url_for, jsonify, request
from recup_adresse import Question_Place
from recup_article_wiki import Article_Wiki


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
@app.route('/find-article', methods=['POST'])
def find_article():
    data = request.get_json()
    text_input2 = data['site']
    article =Article_Wiki(text_input2)

    retour = article.get_article()
    return retour

