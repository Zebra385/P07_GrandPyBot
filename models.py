from flask_sqlachemy import SQLAchemy

fromm .views import appdirs
#Create database connection oblject
db = SQLALchemy(app)

Class Content(db.Model):
    id = db.column(db.Integer, primary_key=True)
    description = db.column(db.Sting(300)n nullable = False)

def __init__(self, description):
    self.description = description


db.create_all()