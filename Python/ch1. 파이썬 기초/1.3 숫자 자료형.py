"""
- 숫자 자료형은 최댓값, 최솟값이 없고 자동으로 메모리를 할당함
- int(정수형), float(실수형), complex(복소수형) 자료형이 있음
- 데이터 분석에서도 많이 쓰이는 numpy, Pandas 같은 모듈에서는 메모리 효율을 위해 정수와 실수를 좀 더 세분화하여 연산함
"""

A = 123
B = 0b100
C = 0o24
D = 0xAC
E = 3.14
F = 1-2j

print(type(A)) # int
print(type(B)) # int
print(type(C)) # int
print(type(D)) # int
print(type(E)) # float
print(type(F)) # complex