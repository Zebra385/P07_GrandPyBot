#! /usr/bin/env python
# -*- coding:utf-8 -*-
from flask import Flask
from views import app

if __name__ == '__main__':
    app.run(debug=True)