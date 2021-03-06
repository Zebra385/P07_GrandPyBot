# ! /usr/bin/env python
# -*- coding:utf-8 -*-
import requests


class Article_Wiki():
    """We def a class to return the article
     that the robot Papy Bot must be say
     """
    def __init__(self, adresse):
        self.adresse = adresse
        self.pageid = self.get_site()
        self.article = self.get_article()

    def get_site(self):
        """We def this function to return the site deducted from adresse"""
        adresse1 = self.adresse.split(',')
        adresse2 = adresse1[0].split(" ")
        count = 0
        find_site = ""
        for mot in adresse2:
            if count == 0:
                pass
            else:
                find_site = find_site + str(mot) + " "
            count = +1
        return find_site

    def get_pageid(self):
        """we def this function to find the page id of site wiki
        to the find adresse"""
        url = "https://fr.wikipedia.org/w/api.php"
        self.site = self.get_site()
        params = {
            "action": "query",
            "format": "json",
            "list": "search",
            "srsearch": self.site
        }
        r = requests.post(url=url, params=params)
        data = r.json()
        if data['query']['search'][0]['title'] == self.site:
            self.pageid = data['query']['search'][0]['pageid']
        return data['query']['search'][0]['pageid']

    def get_article(self):
        """we def this function to find the article detected from pageid"""
        self.pageid = self.get_pageid()
        url = "https://fr.wikipedia.org/w/api.php"
        params = {
            "action": "query",
            "format": "json",
            "prop": "extracts",
            "pageids": self.pageid,
            "exsentences": 3,
            "exintro": 1,
            "explaintext": 1
        }

        r = requests.get(url=url, params=params)
        data = r.json()
        extract = data['query']['pages'][str(self.pageid)]['extract']
        return extract
