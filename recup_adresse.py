#! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests, json


class Question_Place():
    def __init__(self, question):
        self.question = question



    def send(self):
        self.site = self.question.split()[10]
        print(self.site)
        package_url = f'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={self.site}&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo';
        r = requests.post(package_url)
        print(r.json()['candidates'][0]['formatted_address'])
        return r.json()
        # package_json_product = r.json()
        # return package_json_product






