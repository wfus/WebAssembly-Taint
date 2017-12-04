import random

type_list = ['int', 'float', 'double']
for t in type_list:
	print('int main{}('.format(t))
	for i in range(10):
		print('{} a{},'.format(t, i))
	print('{} a{}){{return 0;}}'.format(t, 10))
for t in type_list:
	parameters = ''
	for i in range(21):
		parameters += str(random.randint(1, 1000))
		parameters += ', '
	parameters += str(random.randint(1,1000))
	print('console.log(exports.main{}({}));'.format(t, parameters))
