import os
from flask import Flask
from config import Config
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_marshmallow import Marshmallow

db = SQLAlchemy()
migrate = Migrate()
login = LoginManager()
login.login_view = 'auth.login'
ma = Marshmallow()


def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object(Config)

    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    db.init_app(app)
    migrate.init_app(app, db)
    login.init_app(app)
    ma.init_app(app)

    from diploma import models

    @app.shell_context_processor
    def make_shell_context():
        return {'db': db, 'Person': models.Person, 'Conference': models.Conference}

    from diploma import auth
    app.register_blueprint(auth.bp)

    from diploma import persons
    app.register_blueprint(persons.bp)

    from diploma import conferences
    app.register_blueprint(conferences.bp)

    from diploma import organizations
    app.register_blueprint(organizations.bp)

    from diploma import articles
    app.register_blueprint(articles.bp)

    from diploma import pages
    app.register_blueprint(pages.bp)

    return app
