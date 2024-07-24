import os
import time
from sqlalchemy import text, inspect
from sqlalchemy.orm import Session
from src.database.database import SessionLocal
from src.database.database import engine
from src.database.models import Base, Migration
from sqlalchemy.exc import OperationalError
from sqlalchemy import create_engine, inspect
from src.database.database import SQLALCHEMY_DATABASE_URL

MIGRATIONS_PATH = os.path.join(os.getcwd(),"src","database","migrations")

def get_applied_migrations(session: Session):
    return {m.filename for m in session.query(Migration.filename).all()}

def apply_single_migration(session: Session, filename: str):
    with open(os.path.join(MIGRATIONS_PATH, filename), 'r') as file:
        sql_script = file.read()

    try:
        session.execute(text(sql_script))
        migration = Migration(filename=filename)
        session.add(migration)
        session.commit()
    except Exception as e:
        session.rollback()

def ensure_migrations_table(engine):
    inspector = inspect(engine)
    if not inspector.has_table("migrations"):
        Migration.__table__.create(engine)

def apply_migrations():
    engine = create_engine(SQLALCHEMY_DATABASE_URL)
    ensure_migrations_table(engine)

    session = SessionLocal()
    try:
        applied_migrations = get_applied_migrations(session)
        all_migrations = sorted(f for f in os.listdir(MIGRATIONS_PATH) if f.endswith('.sql'))
        new_migrations = [f for f in all_migrations if f not in applied_migrations]

        for migration in new_migrations:
            apply_single_migration(session, migration)
    finally:
        session.close()

def migrate(max_retries=6, retry_delay=10):
    retries = 0
    while retries < max_retries:
        try:
            apply_migrations()
            return
        except OperationalError as e:
            retries += 1
            time.sleep(retry_delay)
