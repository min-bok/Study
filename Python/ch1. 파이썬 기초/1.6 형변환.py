# 형 변환
"""
기존의 자료형에서 다른 자료형으로 바꾸는 것
"""

string = "string"
num = 12345
f = 1.2
li = [1,2,3]
tup = (1,2,3)
dic = {'name':'minbok','age':25}
st = {1,2,3}

# int로 형 변환
print(type("12345")) # str
print(type(int("12345"))) # int

# str으로 형 변환
print(type(num)) # int
print(type(str(num))) # str

# bool으로 형 변환
print(bool(1)) # True
print(bool(0)) # False

# float로 형 변환
print(float(10)) # 10.0

# list로 형 변환
print(list("helloworld")) # ['h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd']

# tuple로 형 변환
print(tuple("helloworld")) # ('h', 'e', 'l', 'l', 'o', 'w', 'o', 'r', 'l', 'd')

# dict으로 형 변환
k = [('name', 'minbok'), ('age', 25)]
# print(dict("string")) # Error: key와 value가 있어야합니다.
print(dict(k)) # {'name': 'minbok', 'age': 25}

# set으로 형 변환: 중복을 제거할때 많이 사용함
"""
- set은 중복을 허락하지않고 순서가 없음
"""
transferSet = set("helloworld")
print(transferSet) # {'r', 'h', 'd', 'o', 'e', 'w', 'l'}
print(len(transferSet)) # 7