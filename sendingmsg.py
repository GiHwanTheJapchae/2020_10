from socket import *
import time

clientSock = socket(AF_INET, SOCK_STREAM)
clientSock.connect(('116.89.189.31', 22046))




print('connected.')
data = 'hi'
clientSock.send(
    '{"order":"35.133118/129.105832/35.132994/129.106182/35.132516/129.106236/35.132498/129.106048/"}'.encode('utf-8'))
time.sleep(1)
clientSock.send(
    '{"dist":"35.123414/13.234234/10.12332/3.12232"}'.encode('utf-8'))
time.sleep(1)

clientSock.send(
    '{"log":["Take off"]}'.encode('utf-8'))
time.sleep(1)


clientSock.send(
    '{"log":["go forward", "35.133118", "129.105832"]}'.encode('utf-8'))
time.sleep(0.2)

clientSock.send(
    '{"log":["go forward", "35.133120", "129.105836"]}'.encode('utf-8'))
time.sleep(0.2)

clientSock.send(
    '{"log":["go forward", "35.133122", "129.105878"]}'.encode('utf-8'))
time.sleep(0.2)

clientSock.send(
        '{"log":["go forward", "35.133124", "129.105834"]}'.encode('utf-8'))
time.sleep(0.2)

clientSock.send(
        '{"log":["go forward", "35.133130", "129.105889"]}'.encode('utf-8'))
time.sleep(0.2)

clientSock.send(
        '{"log":["go forward", "35.13378", "129.105823"]}'.encode('utf-8'))

time.sleep(5)
clientSock.send(
    '{"log":["Target 1 arrive"]}'.encode('utf-8'))
time.sleep(5)
clientSock.send(
    '{"log":["go forward", "35.132994", "129.106182"]}'.encode('utf-8'))
time.sleep(5)
clientSock.send(
    '{"log":["Target 2 arrive"]}'.encode('utf-8'))

print('sended')






data = clientSock.recv(1024)
print('received : ', data.decode('utf-8'))

clientSock.close()
