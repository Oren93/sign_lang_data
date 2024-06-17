from fastapi import APIRouter
import psycopg2

# PostgreSQL connection details
DB_NAME = "sign_db"
DB_USER = "admin"
DB_PASSWORD = "test"
DB_HOST = "database"

router = APIRouter()

def get_db_connection():
    connection = psycopg2.connect(
        dbname=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        host=DB_HOST
    )
    return connection

@router.get("/words")
async def get_words():
    """
    Send a list of words to frontend
    """
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("SELECT gloss FROM glosses")
        words = [row[0] for row in cursor.fetchall()]
        cursor.close()
        connection.close()
        return {"words": words}
    except Exception as e:
        return {"error": str(e)}
