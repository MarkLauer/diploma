from flask import Blueprint, request, jsonify
from diploma.models import Page, Conference
from diploma import db
from diploma.marshmallow_schemas import PageSchema

bp = Blueprint('pages', __name__, url_prefix='/pages')


@bp.route('/get_all')
def get_all():
    schema = PageSchema(many=True)
    return jsonify(pages=schema.dump(Page.query.all()).data)


@bp.route('/get_by_id', methods=('POST',))
def get_by_id():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    page = Page.query.get(data['id'])
    if page is None:
        return jsonify(status=False, error='not found')
    schema = PageSchema()
    return jsonify(status=True, page=schema.dump(page).data)


def assing_fields(page, data):
    if 'name' in data:
        page.name = data['name']
    if 'content' in data:
        page.text = data['content']
    if 'conference_id' in data:
        conference = Conference.query.get(data['conference_id'])
        if conference is not None:
            page.conference = conference


@bp.route('/create', methods=('POST',))
def create():
    data = request.get_json(force=True)
    if 'name' not in data:
        return jsonify(status=False, error='no name')
    if Page.query.filter_by(name=data['name']).first() is not None:
        return jsonify(status=False, error='name already in database')
    page = Page()
    assing_fields(page, data)
    db.session.add(page)
    db.session.commit()
    return jsonify(status=True, id=page.id)


@bp.route('/update', methods=('POST',))
def update():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    page = Page.query.get(data['id'])
    if page is None:
        return jsonify(status=False, error='not found')
    assing_fields(page, data)
    db.session.commit()
    return jsonify(status=True)


@bp.route('/delete', methods=('POST',))
def delete():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    page = Page.query.get(data['id'])
    if page is None:
        return jsonify(status=False, error='not found')
    db.session.delete(page)
    db.session.commit()
    return jsonify(status=True)
