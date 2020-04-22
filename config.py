import os
basedir = os.path.abspath(os.path.dirname(__file__))
SQLACHEMY_DATABASE_URL = 'sqlite:///' + os.path.join(basedir, 'app.db')
