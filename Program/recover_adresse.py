#! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests, os, json



def read_values_from_json(file):
    """    We fill a array like a dictionnary with a json file     """
    values = []  # Create a list
    with open(file) as f:  # open a json file with my objects
        data = json.load(f)  # load all the data contained in this file f
        for entry in data:  # Create a new empty list
            values.append(entry)  # add each item in my list
    return values  # return my completed list


dictionnaire_words = read_values_from_json('words.json')

if 'API_KEY' is  None:
    """ Secret Key import to variable file config.py in développement"""
    API_KEY = os.environ['API_KEY']

else:
    """ Secret Key import to variable in environnement in production """
    import config

    API_KEY = config.API_KEY



class Question_Place():
    """We def this class to looking for adresse of the site"""
    def __init__(self, question):
        self.question = question
        self.site = self.recover_site()



    def cut_question(self):
        # we split the question
        self.question = self.question.lower()  # on met tout en minuscule
        # We take  off all characters no words
        b = "!@#$?,123456789'<>"
        for char in b:
            self.question = self.question.replace(char, " ")
            #  We make a list of words  with our question
        return self.question.split()



    def recover_site(self):
        """we def this function to find site in the question"""
        self.tableau_question_racourcie = self.cut_question()

        self.tableau_site = self.tableau_question_racourcie
        site = ""
        #  We looking for the length the array
        #  If the word is in the dictionnary we remove this word in
        #  the dictionnary
        length_tableau = len(self.tableau_question_racourcie)
        if length_tableau == 1:

            site = str(self.tableau_question_racourcie[0])

        else:
            for word in dictionnaire_words:
                for word_question in self.tableau_question_racourcie:
                    if word_question == word:
                        self.tableau_site.remove(word_question)
            i = 0
            while i < len(self.tableau_question_racourcie):
                site = site + str(self.tableau_site[i]) + " "
                i = i + 1
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

    def map(self):

        """we def this function to find map with the API ...of google"""
        self.adresse = self.send()
        adresse=self.adresse['candidates'][0]['formatted_address']
        URL = "https://maps.googleapis.com/maps/api/staticmap?"
        center = 'center=' + adresse;
        markers = '&markers=size:mid%7Ccolor:red%7CSan' + adresse;
        key = '&key=' + API_KEY
        img_src = URL + center + '&zoom=12&size=400x200&maptype=roadmap'\
                 + markers + key
        return img_src
