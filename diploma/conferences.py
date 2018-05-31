from flask import Blueprint, request, jsonify
from diploma.models import Conference, Person, Organization
from diploma import db
from diploma.marshmallow_schemas import ConferenceSchema
from datetime import datetime

bp = Blueprint('conferences', __name__, url_prefix='/conferences')


@bp.route('/get_all')
def get_all():
    schema = ConferenceSchema(many=True)
    return jsonify(conferences=schema.dump(Conference.query.all()).data)


@bp.route('/get_by_id', methods=('POST',))
def get_by_id():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    conference = Conference.query.get(data['id'])
    if conference is None:
        return jsonify(status=False, error='not found')
    schema = ConferenceSchema()
    return jsonify(status=True, conference=schema.dump(conference).data)


def assign_fields(conference, data):
    if 'short_name' in data:
        conference.short_name = data['short_name']
    if 'full_name' in data:
        conference.full_name = data['full_name']
    if 'place' in data:
        conference.place = data['place']
    if 'start_date' in data:
        conference.start_date = datetime.strptime(
            data['start_date'], '%Y-%m-%d')
    if 'end_date' in data:
        conference.end_date = datetime.strptime(data['end_date'], '%Y-%m-%d')
    if 'logo' in data:
        conference.logo = data['logo']
    if 'purposes' in data:
        conference.purposes = data['purposes']
    if 'theme' in data:
        conference.theme = data['theme']
    if 'program' in data:
        conference.program = data['program']
    if 'languages' in data:
        conference.languages = data['languages']
    if 'dates' in data:
        conference.dates = data['dates']
    if 'publish_info' in data:
        conference.publish_info = data['publish_info']
    if 'contributions' in data:
        conference.contributions = data['contributions']

    if 'cooperative_events' in data:
        for id in data['cooperative_events']:
            other_conference = Conference.query.get(id)
            if other_conference is not None:
                conference.cooperative_events.append(other_conference)

    if 'program_committee' in data:
        for id in data['program_committee']:
            person = Person.query.get(id)
            if person is not None:
                conference.program_committee.append(person)

    if 'org_committee' in data:
        for id in data['org_committee']:
            person = Person.query.get(id)
            if person is not None:
                conference.org_committee.append(person)

    if 'org_contacts' in data:
        for id in data['org_contacts']:
            person = Person.query.get(id)
            if person is not None:
                conference.org_contacts.append(person)

    if 'partners' in data:
        for id in data['partners']:
            organization = Organization.query.get(id)
            if organization is not None:
                conference.partners.append(organization)

    if 'organizers' in data:
        for id in data['organizers']:
            organization = Organization.query.get(id)
            if organization is not None:
                conference.organizers.append(organization)

    if 'sponsors' in data:
        for id in data['sponsors']:
            organization = Organization.query.get(id)
            if organization is not None:
                conference.sponsors.append(organization)


@bp.route('/create', methods=('POST',))
def create():
    data = request.get_json(force=True)
    if 'short_name' not in data:
        return jsonify(status=False, error='no short name')
    if Conference.query.filter_by(short_name=data['short_name']).first() is not None:
        return jsonify(status=False, error='short name already in database')
    conference = Conference()
    assign_fields(conference, data)
    db.session.add(conference)
    db.session.commit()
    return jsonify(status=True, id=conference.id)


@bp.route('/update', methods=('POST',))
def update():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    conference = Conference.query.get(data['id'])
    if conference is None:
        return jsonify(status=False, error='not found')
    # if 'short_name' in data and Conference.query.filter_by(short_name=data['short_name']).first() is not None:
    #     return jsonify(status=False, error='short name already in database')
    assign_fields(conference, data)
    db.session.commit()
    return jsonify(status=True)


@bp.route('/delete', methods=('POST',))
def delete():
    data = request.get_json(force=True)
    if 'id' not in data:
        return jsonify(status=False, error='no id')
    conference = Conference.query.get(data['id'])
    if conference is None:
        return jsonify(status=False, error='not found')
    db.session.delete(conference)
    db.session.commit()
    return jsonify(status=True)
