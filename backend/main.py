from fastapi import FastAPI
import psycopg2

app = FastAPI()
# PostgreSQL connection details
DB_NAME = "sign_metadata"
DB_USER = "admin"
DB_PASSWORD = "test"
DB_HOST = "database"

# Connect to PostgreSQL
conn = psycopg2.connect(
    dbname=DB_NAME, user=DB_USER,
    password=DB_PASSWORD, host=DB_HOST
)
cursor = conn.cursor()

@app.get("/words")
async def get_words():
    try:
        cursor.execute("SELECT word FROM words_table")
        words = [row[0] for row in cursor.fetchall()]
        return words
    except Exception as e:
        return {"error": str(e)}
