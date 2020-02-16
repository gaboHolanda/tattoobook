import re, string, random


def is_email(email):
    if(len(email) > 7):
        valid_regex_email = r"^\S+@\S+$"
        return bool(re.match(valid_regex_email,email))
    return False

def random_string(stringLength=10):
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(stringLength))