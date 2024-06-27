from apscheduler.schedulers.background import BackgroundScheduler
from src.database.migrate import migrate

def start_scheduler():
    scheduler = BackgroundScheduler()
    scheduler.add_job(migrate, 'interval', days=1, id='db_migration')
    scheduler.start()
