import Program.recover_article_wiki as script
import requests



# custom class to be the mock return value
# will override the requests.Response returned from requests.get
class MockResponse:

    # mock json() method always returns a specific testing dictionary
    @staticmethod
    def json():
        return {"query": {"searchinfo": {"totalhits": 819}, "search":
            [{"ns": 0, "title": "Rue de Rivoli", "pageid": 105972,
            "size": 65788, }, {"pageid": '55656'}]}}


def test_page_id(monkeypatch):
    article = script.Article_Wiki('7 Cité Paradis, 75010 Paris, France')

    # Any arguments may be passed and mock_post() will always return our
    # mocked object, which only has the .json() method.
    def mock_post(* args, ** kwargs):
        return MockResponse()

    # apply the monkeypatch for requests.get to mock_get
    monkeypatch.setattr(requests, "post", mock_post)

    # app.get_json, which contains requests.get, uses the monkeypatch
    result = article.get_pageid()
    assert result == 105972


class MockResponse2:

    # mock json() method always returns a specific testing dictionary
    @staticmethod
    def json():
        return {"query": {"pages": {"5653202": {"pageid": 5653202, "ns": 0,
                "title": "Cité Paradis", "extract": "ARTICLE: BLABLABLA"}}}}


def test_page_article(monkeypatch):
    article = script.Article_Wiki('7 Cité Paradis, 75010 Paris, France')

    # Any arguments may be passed and mock_post() will always return our
    # mocked object, which only has the .json() method.
    def mock_get2(* args, ** kwargs):
        return MockResponse2()

    # apply the monkeypatch for requests.get to mock_get
    monkeypatch.setattr(requests, "get", mock_get2)

    # app.get_json, which contains requests.get, uses the monkeypatch
    result = article.get_article()
    assert result == "ARTICLE: BLABLABLA"
