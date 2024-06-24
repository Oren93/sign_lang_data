import os
import sys
import json
import pyperclip as pc

def get_all_extensions(directory):
    extensions = set()
    for root, _, files in os.walk(directory):
        for filename in files:
            _, ext = os.path.splitext(filename)
            if ext:
                extensions.add(ext)
    return extensions

def copy_source_files(directory, valid_extensions):
    valid_extensions = list(valid_extensions)
    for i,ext in enumerate(valid_extensions):
        valid_extensions[i] = ext.replace(' ','')
    if directory[:2] == "~/":
        directory = os.path.expanduser(directory)
    if directory[0] != "/":
        directory = os.path.join("", directory)

    cpy = {}
    ignore_files = set()
    ignore_dirs = set()
    ignore_path =  r"C:\Users\joaos\OneDrive\Ambiente de Trabalho\Mestrado Estatística Aplicada\sign_lang_data\utils\.copyignore"

    if os.path.exists(ignore_path):
        with open(ignore_path, 'r') as f:
            for line in f:
                line = line.strip()
                if line.endswith('/'):
                    ignore_dirs.add(line.rstrip('/'))
                else:
                    ignore_files.add(line)

    for root, dirs, files in os.walk(directory):
        # Check if the directory should be ignored
        if any(ignored_dir in root for ignored_dir in ignore_dirs):
            continue

        for filename in files:
            if any(filename.endswith("."+ext) for ext in valid_extensions) and filename not in ignore_files:
                src_path = os.path.join(root, filename)
                with open(src_path, 'r') as file:
                    data = file.read()
                cpy[src_path.replace(directory, "")] = data
    print("Copied the following files:")
    for i in cpy.keys():
        print(i)
    pc.copy(json.dumps(cpy))

def prompt_user_for_extensions(extensions):
    print("Available file extensions:")
    for ext in sorted(extensions):
        if '.' in ext:
            ext = ext.split('.')[1]
        if len(ext)>=2 and len(ext)<=5:
            print(ext)
    chosen_exts = input("Enter the file extensions to include, separated by commas: ")
    return {ext.strip() for ext in chosen_exts.split(',')}

# Get the directory from the user
if len(sys.argv) != 2:
    print("Usage: python copyfiles.py <directory>")
    sys.exit(1)

directory = sys.argv[1]

# Get all extensions in the directory
all_extensions = get_all_extensions(directory)

# Prompt the user to specify which extensions to include
valid_extensions = prompt_user_for_extensions(all_extensions)

# Copy the files
copy_source_files(directory, valid_extensions)