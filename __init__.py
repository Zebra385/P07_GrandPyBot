P07_GrandPyBot/__init__.py
from flask import Flask

from .views import app
from.import models
# connect sqlachemy to app
models.db.init_app(app)
