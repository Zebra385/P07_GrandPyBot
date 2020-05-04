#! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests, json


class Question_Place():
    def __init__(self, question):
        self.question = question



    def send(self):
        self.site = self.question.split()[10]
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
        print('ladresse est:')
        print(adr)
        return r.json()
        # package_json_product = r.json()
        # return package_json_product






