from diploma import db

program_committee_table = db.Table(
    'program_committee',
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id')),
    db.Column('person_id', db.Integer, db.ForeignKey('person.id'))
)

org_committee_table = db.Table(
    'org_committee',
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id')),
    db.Column('person_id', db.Integer, db.ForeignKey('person.id'))
)

org_contacts_table = db.Table(
    'org_contacts',
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id')),
    db.Column('person_id', db.Integer, db.ForeignKey('person.id'))
)


class Person(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))

    name = db.Column(db.String(64))
    phone = db.Column(db.String(16), unique=True)
    country = db.Column(db.String(32))
    affiliation = db.Column(db.String(120))
    role = db.Column(db.String(120))

    def __repr__(self):
        return '<Person {}>'.format(self.username)


class Conference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(120))
    short_name = db.Column(db.String(64))
    place = db.Column(db.String(120))
    start_date = db.Column(db.DateTime)
    end_date = db.Column(db.DateTime)
    logo = db.Column(db.Text)
    purposes = db.Column(db.Text)
    theme = db.Column(db.String)
    program = db.Column(db.Text)
    languages = db.Column(db.String)
    dates = db.Column(db.String)
    publish_info = db.Column(db.Text)
    contributions = db.Column(db.Text)

    program_committee = db.relationship(
        'Person', secondary=program_committee_table)
    org_committee = db.relationship(
        'Person', secondary=org_committee_table)
    org_contacts = db.relationship(
        'Person', secondary=org_contacts_table)
