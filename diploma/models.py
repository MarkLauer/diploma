from diploma import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from diploma import login

# association tables
cooperative_events_table = db.Table(
    'cooperative_events',
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id')),
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id'))
)

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

partners_table = db.Table(
    'partners',
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id')),
    db.Column('organization_id', db.Integer, db.ForeignKey('organization.id'))
)

organizers_table = db.Table(
    'organizers',
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id')),
    db.Column('organization_id', db.Integer, db.ForeignKey('organization.id'))
)

sponsors_table = db.Table(
    'sponsors',
    db.Column('conference_id', db.Integer, db.ForeignKey('conference.id')),
    db.Column('organization_id', db.Integer, db.ForeignKey('organization.id'))
)

authors_table = db.Table(
    'authors',
    db.Column('article_id', db.Integer, db.ForeignKey('article.id')),
    db.Column('person_id', db.Integer, db.ForeignKey('person.id'))
)

# models


class Person(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password_hash = db.Column(db.String(128))
    name = db.Column(db.String(64))
    phone = db.Column(db.String(16), unique=True)
    country = db.Column(db.String(32))
    affiliation = db.Column(db.String(120))
    role = db.Column(db.String(120))

    def __repr__(self):
        return '<Person {}>'.format(self.email)

    def set_password(self, password):
        self.password_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password_hash, password)


class Conference(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    short_name = db.Column(db.String(64), index=True, unique=True)
    full_name = db.Column(db.String(120))
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

    cooperative_events = db.relationship(
        'Conference', secondary=cooperative_events_table, lazy='subquery')

    program_committee = db.relationship(
        'Person', secondary=program_committee_table, lazy='subquery')
    org_committee = db.relationship(
        'Person', secondary=org_committee_table, lazy='subquery')
    org_contacts = db.relationship(
        'Person', secondary=org_contacts_table, lazy='subquery')

    partners = db.relationship(
        'Organization', secondary=partners_table, lazy='subquery')
    organizers = db.relationship(
        'Organization', secondary=organizers_table, lazy='subquery')
    sponsors = db.relationship(
        'Organization', secondary=sponsors_table, lazy='subquery')

    pages = db.relationship('Page', backref='conference', lazy='dynamic')

    def __repr__(self):
        return '<Conference {}>'.format(self.short_name)


class Article(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String)
    text = db.Column(db.Text)
    status = db.Column(db.String)

    authors = db.relationship(
        'Person', secondary=authors_table, lazy='subquery')

    def __repr__(self):
        return '<Article {}>'.format(self.name)


class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True, unique=True)

    def __repr__(self):
        return '<Organization {}>'.format(self.name)


class Page(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String, index=True, unique=True)
    content = db.Column(db.Text)

    conference_id = db.Column(db.Integer, db.ForeignKey('conference.id'))

    def __repr__(self):
        return '<Page {}>'.format(self.name)


@login.user_loader
def load_user(id):
    return Person.query.get(int(id))
