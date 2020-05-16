"""Test Flask views.py project module and his routes provide templates"""

from flask_testing import TestCase
from flask import jsonify
from Program.views import app


@app.route("/ajax/")
def some_json():
    return jsonify(success=True)


class TestViews(TestCase):

    """Test views module"""

    render_templates = False

    def create_app(self):
        """Test app"""

        app.config['TESTING'] = True
        return app

    def test_accueil_template(self):
        """test render index and / template"""

        response = self.client.get("/")
        assert response.status_code == 200
        self.assert_template_used('accueil.html')

    def test_Find_site(self):
        response = self.client.get("/ajax/")
        assert response.status_code == 200


