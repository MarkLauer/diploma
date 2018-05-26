from flask import Blueprint, request, jsonify
from diploma.models import Organization
from diploma import db
from diploma.marshmallow_schemas import OrganizationSchema

bp = Blueprint('organizations', __name__, url_prefix='/organizations')


@bp.route('/get_all')
def get_all():
    schema = OrganizationSchema(many=True)
    return jsonify(organizations=schema.dump(Organization.query.all()).data)


@bp.route('/get_by_id', methods=('POST',))
def get_by_id():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    organization = Organization.query.get(data['id'])
    if organization is None:
        return jsonify(status=False, error='not found')
    schema = OrganizationSchema()
    return jsonify(status=True, organization=schema.dump(organization).data)


@bp.route('/create', methods=('POST',))
def create():
    data = request.get_json(force=True)
    if 'name' not in data:
        return jsonify(status=False, error='no name')
    if Organization.query.filter_by(name=data['name']).first() is not None:
        return jsonify(status=False, error='name already in database')
    organization = Organization(name=data['name'])
    db.session.add(organization)
    db.session.commit()
    return jsonify(status=True, id=organization.id)


@bp.route('/update', methods=('POST',))
def update():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    organization = Organization.query.get(data['id'])
    if organization is None:
        return jsonify(status=False, error='not found')
    if 'name' in data:
        organization.name = data['name']
    db.session.commit()
    return jsonify(status=True)


@bp.route('/delete', methods=('POST',))
def delete():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    organization = Organization.query.get(data['id'])
    if organization is None:
        return jsonify(status=False, error='not found')
    db.session.delete(organization)
    db.session.commit()
    return jsonify(status=True)
