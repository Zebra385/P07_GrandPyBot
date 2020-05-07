import recover_article_wiki as script

class TestArticle:
    article = script.Article_Wiki('7 Cité Paradis, 75010 Paris, France')

    def test_get_site(self):
        self.get_site = 'Cité Paradis'
        assert self.get_site == 'Cité Paradis'

    def test_get_pageid(self):
        self.get_pageid = 5653202
        assert  self.get_pageid == 5653202


    def test_get_article(self):
        self.get_article = 'La cité Paradis est une voie publique située dans le 10e arrondissement de Paris.'
        assert self.get_article == 'La cité Paradis est une voie publique située dans le 10e arrondissement de Paris.'