#! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests


class Question_Place():
    """We def this class to looking for adresse of the site"""
    def __init__(self, question):
        self.question = question
        self.site = self.recover_site()

    def recover_site(self):
        """we def this function to find site in the question"""
        # we split the question
        array_question = self.question.split()
        lengh_array_question = len(array_question)
        i = 9
        site = ""
        while i < lengh_array_question:
            site = site + str(array_question[i]) + " "
            i = i+1
        return site

    def send(self):
        self.site = self.recover_site()
        """we def this function to find adresse with the API Place of google"""
        URL = "https://maps.googleapis.com/maps/api/" \
              "place/findplacefromtext/json"
        PARAMS = {
            "input": self.site,
            "inputtype": "textquery",
            "fields": "formatted_address,name,geometry",
            "key": API_Key
        }
        r = requests.post(url=URL, params=PARAMS)
        return r.json()
