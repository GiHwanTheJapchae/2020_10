from socket import *

clientSock = socket(AF_INET, SOCK_STREAM)
clientSock.connect(('127.0.0.1', 22046))




print('connected.')
data = 'hi'

clientSock.send('{"log":"hello"}'.encode('utf-8'))

print('sended')






data = clientSock.recv(1024)
print('received : ', data.decode('utf-8'))

clientSock.close()
