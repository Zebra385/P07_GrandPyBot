#! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests


class Question():
    def __init__(self,question):
        self.question = question

    def cut(self):
        return self.question.split()

print('Bonjour, je suis papy robot, pose moi ta demande d adresse sous la ' \
'forme : Salut GrandPy ! Est-ce que tu connais l adresse de ... ')
question_a_papyrobot= input('pose ta question: ');
question = Question(question_a_papyrobot)
tableau_adresse = question.cut()
site =tableau_adresse[11]
print('tu recherche l adresse du site: ' + site )

package_url = f'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input={site}&inputtype=textquery&fields=formatted_address,name,geometry&key=AIzaSyAu-GCUJE1l_rVUxe0Tk0c5DXdNXnM94Oo';
r = requests.get(package_url);
package_json_product = r.json();
print('ladresse du site : ' + site +' est : ' + package_json_product['candidates'][0]['formatted_address']);
