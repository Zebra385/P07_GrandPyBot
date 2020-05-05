#! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests, json


class Question_Place():
    def __init__(self, question):
        self.question = question
        self.site= self.recover_site()


    def recover_site(self):
        """we def this function to find site"""
        array_question= self.question.split()
        lengh_array_question = len(array_question)
        i = 9
        site=""

        while  i < lengh_array_question :
            site= site + str(array_question[i]) + " "
            i = i+1

        return site

    def send(self):
        self.site = self.recover_site()
        """we def this function to find adresse"""
        URL = "https://maps.googleapis.com/maps/api/place/findplacefromtext/json"

        PARAMS = {
            "input": self.site,
            "inputtype": "textquery",
            "fields": "formatted_address,name,geometry",
            "key":'AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo'
        }
        r = requests.post(url=URL, params=PARAMS)

        adr = r.json()['candidates'][0]['formatted_address']

        return r.json()
        # package_json_product = r.json()
        # return package_json_product






