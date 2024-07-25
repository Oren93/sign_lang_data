import logging
import os
from logging.handlers import RotatingFileHandler

def setup_logger(log_file_name, log_level=logging.INFO):
    # Ensure the log directory exists
    log_dir = os.path.join(os.getcwd(),"logs")
    if not os.path.exists(log_dir):
        os.makedirs(log_dir)

    # Full path for the log file
    log_file_path = os.path.join(log_dir, log_file_name)

    # Create a logger
    logger = logging.getLogger(__name__)
    logger.setLevel(log_level)

    # Create handlers
    file_handler = RotatingFileHandler(log_file_path, maxBytes=10485760, backupCount=5)  # 10MB per file, keep 5 old files
    console_handler = logging.StreamHandler()

    # Create formatters and add it to handlers
    log_format = logging.Formatter('%(asctime)s - %(name)s - %(levelname)s - %(message)s')
    file_handler.setFormatter(log_format)
    console_handler.setFormatter(log_format)

    # Add handlers to the logger
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger

# Create a logger instance
logger = setup_logger('app.log')

# Function to get the logger
def get_logger():
    return logger
