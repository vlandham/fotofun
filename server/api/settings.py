import os
from pathlib import Path
from os.path import join, dirname
from dotenv import load_dotenv

DOTENV_PATH = join(dirname(__file__), "..", ".env")
load_dotenv(DOTENV_PATH)

FOTO_DIR = os.environ.get("FOTO_DIR")
