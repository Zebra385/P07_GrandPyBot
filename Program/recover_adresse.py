#! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests, os
import json


def read_values_from_json(file):
    """    We fill a array like a dictionnary with a json file     """
    values = []#create a list
    with open(file) as f:# open a json file with my objects
        data = json.load(f) # load all the data contained in this file f
        for entry in data:# Create a new empty list
            values.append(entry)# add each item in my list
    return values # return my completed list

dictionnaire_words=read_values_from_json('words.json')

API_KEY = os.environ['API_KEY']
# API_KEY = 'AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo'

class Question_Place():
    """We def this class to looking for adresse of the site"""
    def __init__(self, question):
        self.question = question
        self.site = self.recover_site()

    def recover_site(self):
        """we def this function to find site in the question"""
        # we split the question
        self.tableau_question = self.question.split()
        self.tableau_question_racourcie = self.tableau_question
        site = ""
        print('le tableau question est')
        print(self.tableau_question)
        # We looking for the length the array
        # If the word is in the dictionnary we remove this word in the dictionnary
        length_tableau = len(self.tableau_question)
        if length_tableau == 1:

            site = str(self.tableau_question[0])

        else:
            for word in dictionnaire_words:

                for word_question in self.tableau_question:

                    print('word_question est :')
                    print(word_question)
                    if word_question == word:
                        print('word du dico est ')
                        print(word)

                        self.tableau_question_racourcie.remove(word_question)

            i = 0

            while i < len(self.tableau_question_racourcie):
                site = site + str(self.tableau_question_racourcie[i]) + " "
                i = i + 1

        print('tu recherche l adresse du site: ' + site)

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
            "key": API_KEY
        }
        r = requests.post(url=URL, params=PARAMS)
        return r.json()
