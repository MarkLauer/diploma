from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from diploma.models import Person
from diploma import db
from diploma.marshmallow_schemas import PersonSchema

bp = Blueprint('persons', __name__, url_prefix='/persons')


@bp.route('/get_all')
def get_all():
    schema = PersonSchema(many=True)
    return jsonify(persons=schema.dump(Person.query.all()).data)


@bp.route('/get_by_id', methods=('POST',))
def get_by_id():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    person = Person.query.get(data['id'])
    if person is None:
        return jsonify(status=False, error='not found')
    schema = PersonSchema()
    return jsonify(status=True, person=schema.dump(person).data)


@bp.route('/update', methods=('POST',))
@login_required
def update():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    if data['id'] != current_user.id:
        return jsonify(status=False, error='permission denied')
    person = Person.query.get(data['id'])
    if person is None:
        return jsonify(status=False, error='not found')
    if 'email' in data:
        person.email = data['email']
    if 'password' in data:
        person.set_password(data['password'])
    if 'name' in data:
        person.name = data['name']
    if 'phone' in data:
        if Person.query.filter_by(phone=data['phone']).first() is not None:
            return jsonify(status=False, error='phone already in database')
        person.phone = data['phone']
    if 'country' in data:
        person.country = data['country']
    if 'affiliation' in data:
        person.affiliation = data['affiliation']
    if 'role' in data:
        person.role = data['role']
    db.session.commit()
    return jsonify(status=True)


@bp.route('/delete', methods=('POST',))
@login_required
def delete():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    if data['id'] != current_user.id:
        return jsonify(status=False, error='permission denied')
    person = Person.query.get(data['id'])
    if person is None:
        return jsonify(status=False, error='not found')
    db.session.delete(person)
    db.session.commit()
    return jsonify(status=True)
