from os import listdir
from os.path import realpath, expanduser, isfile, join
from api.settings import FOTO_DIR


def get_foto_dir():
    """
    """
    return realpath(expanduser(FOTO_DIR))


def list_fotos():
    """
    """
    root = get_foto_dir()
    print(root)
    onlyfiles = [f for f in listdir(root) if isfile(join(root, f))]
    return onlyfiles


def get_foto(foto_index):
    """
    """
    all_fotos = list_fotos()
    root = get_foto_dir()
    filepath = join(root, all_fotos[foto_index])
    return filepath
