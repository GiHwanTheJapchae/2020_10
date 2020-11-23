import sys
import time


starttime = time.time()
flytime = 0
while flytime <= 5:
    flytime = time.time() - starttime
    print(flytime)

print('end')