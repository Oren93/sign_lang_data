'''
This is a simple cli tool to run migration manually. As we don't currently need more 
functionality this simple script is enough. If needed in the future, we should use a
real cli tool library.
use `python cli.py migrate`
'''
from src.database.migrate import migrate
import sys

def run_migrate():
    migrate()

# For cli tool, a dictionary where the key is the command and the value
# is a tuple of (short explanation, function to execute)
commands = {
    "migrate": ("Apply database migrations", migrate)
}

if __name__ == "__main__":
    if len(sys.argv) ==  1:
        print("Usage:\npython cli.py command\n\nAvailable commands:\n")
        for command, value in commands.items():
              print(command,"\t",value[0])
    if len(sys.argv) == 2:
        commands[sys.argv[1]][1]()
    else:
        print("Error")
