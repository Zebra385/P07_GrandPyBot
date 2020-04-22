from flask import Flask, render_template, url_for

app = Flask(__name__)
@app.route('/')
@app.route('/P07_GrandPyBot')
def accueil():
    return render_template('accueil.html')
if __name__ == "__main__:" :
    app.run()
