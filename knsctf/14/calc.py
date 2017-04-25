import crypt, getpass, pwd, sys

def calc(w, salt):
    return crypt.crypt(w, '$6$'+salt+'$')

f = open('dict')
dic = [line.rstrip() for line in f]

for prob in [line.rstrip() for line in sys.stdin]:
    salt = prob.split('$')[2]
    for cand in dic:
        if calc(cand, salt) == prob:
            print(cand)
            break
