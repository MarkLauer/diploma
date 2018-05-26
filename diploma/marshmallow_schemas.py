from diploma import ma
from diploma.models import Person, Conference, Organization, Article, Page


class PersonSchema(ma.ModelSchema):
    class Meta:
        model = Person


class ConferenceSchema(ma.ModelSchema):
    class Meta:
        model = Conference


class OrganizationSchema(ma.ModelSchema):
    class Meta:
        model = Organization


class ArticleSchema(ma.ModelSchema):
    class Meta:
        model = Article


class PageSchema(ma.ModelSchema):
    class Meta:
        model = Page
