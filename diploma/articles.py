from flask import Blueprint, request, jsonify
from diploma.models import Article, Person
from diploma import db
from diploma.marshmallow_schemas import ArticleSchema

bp = Blueprint('articles', __name__, url_prefix='/articles')


@bp.route('/get_all')
def get_all():
    schema = ArticleSchema(many=True)
    return jsonify(articles=schema.dump(Article.query.all()).data)


@bp.route('/get_by_id', methods=('POST',))
def get_by_id():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    article = Article.query.get(data['id'])
    if article is None:
        return jsonify(status=False, error='not found')
    schema = ArticleSchema()
    return jsonify(status=True, article=schema.dump(article).data)


def assing_fields(article, data):
    if 'name' in data:
        article.name = data['name']
    if 'text' in data:
        article.text = data['text']
    if 'status' in data:
        article.status = data['status']

    if 'authors' in data:
        for id in data['authors']:
            person = Person.query.get(id)
            article.authors.append(person)


@bp.route('/create', methods=('POST',))
def create():
    data = request.get_json(force=True)
    article = Article()
    assing_fields(article, data)
    db.session.add(article)
    db.session.commit()
    return jsonify(status=True, id=article.id)


@bp.route('/update', methods=('POST',))
def update():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    article = Article.query.get(data['id'])
    if article is None:
        return jsonify(status=False, error='not found')
    assing_fields(article, data)
    db.session.commit()
    return jsonify(status=True)


@bp.route('/delete', methods=('POST',))
def delete():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    article = Article.query.get(data['id'])
    if article is None:
        return jsonify(status=False, error='not found')
    db.session.delete(article)
    db.session.commit()
    return jsonify(status=True)
