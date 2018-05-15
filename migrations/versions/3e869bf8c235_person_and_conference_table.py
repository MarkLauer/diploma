"""person and conference table

Revision ID: 3e869bf8c235
Revises: 
Create Date: 2018-05-15 23:07:22.724485

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3e869bf8c235'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('conference',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=120), nullable=True),
    sa.Column('short_name', sa.String(length=64), nullable=True),
    sa.Column('place', sa.String(length=120), nullable=True),
    sa.Column('start_date', sa.DateTime(), nullable=True),
    sa.Column('end_date', sa.DateTime(), nullable=True),
    sa.Column('logo', sa.Text(), nullable=True),
    sa.Column('purposes', sa.Text(), nullable=True),
    sa.Column('theme', sa.String(), nullable=True),
    sa.Column('program', sa.Text(), nullable=True),
    sa.Column('languages', sa.String(), nullable=True),
    sa.Column('dates', sa.String(), nullable=True),
    sa.Column('publish_info', sa.Text(), nullable=True),
    sa.Column('contributions', sa.Text(), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('person',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=64), nullable=True),
    sa.Column('email', sa.String(length=120), nullable=True),
    sa.Column('password_hash', sa.String(length=128), nullable=True),
    sa.Column('name', sa.String(length=64), nullable=True),
    sa.Column('phone', sa.String(length=16), nullable=True),
    sa.Column('country', sa.String(length=32), nullable=True),
    sa.Column('affiliation', sa.String(length=120), nullable=True),
    sa.Column('role', sa.String(length=120), nullable=True),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('phone')
    )
    op.create_index(op.f('ix_person_email'), 'person', ['email'], unique=True)
    op.create_index(op.f('ix_person_username'), 'person', ['username'], unique=True)
    op.create_table('org_committee',
    sa.Column('conference_id', sa.Integer(), nullable=True),
    sa.Column('person_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['conference_id'], ['conference.id'], ),
    sa.ForeignKeyConstraint(['person_id'], ['person.id'], )
    )
    op.create_table('org_contacts',
    sa.Column('conference_id', sa.Integer(), nullable=True),
    sa.Column('person_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['conference_id'], ['conference.id'], ),
    sa.ForeignKeyConstraint(['person_id'], ['person.id'], )
    )
    op.create_table('program_committee',
    sa.Column('conference_id', sa.Integer(), nullable=True),
    sa.Column('person_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['conference_id'], ['conference.id'], ),
    sa.ForeignKeyConstraint(['person_id'], ['person.id'], )
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('program_committee')
    op.drop_table('org_contacts')
    op.drop_table('org_committee')
    op.drop_index(op.f('ix_person_username'), table_name='person')
    op.drop_index(op.f('ix_person_email'), table_name='person')
    op.drop_table('person')
    op.drop_table('conference')
    # ### end Alembic commands ###