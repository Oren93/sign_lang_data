from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from src.database.migrate import migrate

def start_scheduler():
    scheduler = BackgroundScheduler()

    # Schedule the task to run daily at midnight
    scheduler.add_job(
        migrate,
        trigger=CronTrigger(hour=0, minute=0),
        id='db_migration'
    )

    # Run the migration immediately on startup
    scheduler.add_job(migrate, id='initial_migration')

    scheduler.start()
