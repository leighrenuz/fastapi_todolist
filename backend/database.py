import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Load DATABASE_URL from environment variable, defaulting to SQLite if not set
database_url = os.environ.get("DATABASE_URL", "sqlite:///./test.db")

# If the URL is in an older 'postgres://' format, replace it with the proper 'postgresql://'
if database_url.startswith("postgres://"):
    database_url = database_url.replace("postgres://", "postgresql://", 1)

# Create the engine to interact with the database
engine = create_engine(database_url, echo=True)

# Create a session local class to interact with the database
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class to create tables
Base = declarative_base()
