import recover_adresse as script
import requests

from io import BytesIO
import json

class TestRecoverAdresse:
    question = script.Question_Place('Salut GrandPy ! Est-ce que tu connais l\'adresse de le louvre')


    def test_recover_site(self):
        self.recover_site = 'le louvre'
        assert self.recover_site == 'le louvre'


    def test_send(self):
        self.send= 'Rue de Rivoli, 75001 Paris, France'
        assert  self.send == 'Rue de Rivoli, 75001 Paris, France'

    def test_http_return(self, monkeypatch):


        results = [{
            "candidates": [
                {
                    "formatted_address": "7 Cité Paradis, 75010 Paris, France",
                    "name": "OpenClassrooms",

                }
            ]
        }
        ]

        def mockreturn(requests):
            return

        monkeypatch.setattr(requests, "post", mockreturn)
        assert self.send == results