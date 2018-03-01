#s = ['i','like','lists']
#print(' '.join(s))
#ten words to a line, write 20 lines and each word must be chosen
#at random from a list of 10 words- each of which has 7 letters
import math
import random
words = ["".join([chr(random.randrange(97,97+26)) for i in range(7)]) for j in range(10)]
#print(words)

f = open('randomWords.txt','w')
for i in range(20):
    for j in range(10):
        f.write(words[math.floor(random.random()*10)]);
        if j!=9:
            f.write(" ")
    if i!=19:
        f.write('\n')
f.close()
