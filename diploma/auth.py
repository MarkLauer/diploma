from flask import Blueprint, request, jsonify
from flask_login import current_user, login_user, logout_user
from diploma.models import Person
from diploma import db

bp = Blueprint('auth', __name__, url_prefix='/auth')


@bp.route('/login', methods=('POST',))
def login():
    if current_user.is_authenticated:
        return jsonify(status=False, error='the user is authenticated')
    data = request.get_json(force=True)
    if 'email' not in data or 'password' not in data:
        return jsonify(status=False, error='no data')
    user = Person.query.filter_by(email=data['email']).first()
    if user is None or not user.check_password(data['password']):
        return jsonify(status=False, error='invalid email or password')
    login_user(user, remember=True)
    return jsonify(status=True)


@bp.route('/logout')
def logout():
    logout_user()
    return jsonify(status=True)


@bp.route('/is_logged')
def is_logged():
    if current_user.is_authenticated:
        return jsonify(status=True, id=current_user.id, email=current_user.email)
    return jsonify(status=False)


@bp.route('/register', methods=('POST',))
def register():
    if current_user.is_authenticated:
        return jsonify(status=False, error='the user is authenticated')
    data = request.get_json(force=True)
    if 'email' not in data or 'password' not in data:
        return jsonify(status=False, error='no data')
    if Person.query.filter_by(email=data['email']).first() is not None:
        return jsonify(status=False, error='email is already registered')
    user = Person(email=data['email'])
    user.set_password(data['password'])
    db.session.add(user)
    db.session.commit()
    return jsonify(status=True)
