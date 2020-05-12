import Program.recover_adresse as script
import requests


class TestRecoverAdresse:
    question = script.Question_Place('Salut GrandPy ! Est-ce que tu connais'
                                     ' l\'adresse de le louvre')

    def test_recover_site(self):
        self.recover_site = 'le louvre'
        assert self.recover_site == 'le louvre'


# custom class to be the mock return value
# will override the requests.Response returned from requests.get
class MockResponse:

    # mock json() method always returns a specific testing dictionary
    @staticmethod
    def json():
        return {"formatted_address": 'Rue de Rivoli, 75001 Paris, France'}


def test_find(monkeypatch):
    question = script.Question_Place(
        'Salut GrandPy ! Est-ce que tu connais l\'adresse de le louvre')

    # Any arguments may be passed and mock_post() will always return our
    # mocked object, which only has the .json() method.
    def mock_post(* args, ** kwargs):
        return MockResponse()

    # apply the monkeypatch for requests.get to mock_get
    monkeypatch.setattr(requests, "post", mock_post)

    # app.get_json, which contains requests.get, uses the monkeypatch
    result = question.send()
    assert result["formatted_address"] == "Rue de Rivoli, 75001 Paris, France"
