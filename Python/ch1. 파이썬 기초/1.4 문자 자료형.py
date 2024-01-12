"""
# 문자 자료형
- 순서가 있는 시퀀스 자료형
- 큰 따옴표, 작은 따옴표로 감싸서 사용
- 이스케이프 문자 사용가능 (\n, \t, \' 등)

**시퀀스 자료형이란?**
- 순서가 있는 자료형
- 각 요소들은 해당하는 index값을 가님
- python에서는 문자열, 리스트, 튜플이 시퀀스 자료형
"""

string = "오늘의 날씨는 '맑음' 입니다 ☺️"
print(string) # 오늘의 날씨는 '맑음' 입니다 ☺️
print(string[0]) # 오

"""
# 자주 쓰이는 문자열 method
- 연속해서 다른 method를 실행하는 메서드 체이닝도 사용가능
"""
s = "Hello World!"

# lower() : 전체 데이터를 소문자로 바꿔주는 메서드
print(s.lower()) # hello world!

# upper() : 전체 데이터를 대문자로 바꿔주는 메서드
print(s.upper()) # HELLO WORLD!

# find() : 특정 데이터를 찾아서 index를 출력
print(s.find("World")) # 6
print(s.find("Bye")) # -1, 찾을 값이 없는 경우 -1을 출력

# index() : 특정 데이터를 찾아서 index를 출력
print(s.index("World")) # 6
# print(s.index("Bye")) # Error, 찾을 값이 없는 경우 에러 발생

# count() : 특정 문자열이나 숫자의 개수를 세는 메서드
print(s.count("o")) # 2
print(s.count("s")) # 0

# strip() : 데이터의 양쪽 공백과 특정 문자를 제거하는 메서드
print(" 안녕 ".strip()) # 안녕
print("!?안녕!?".strip("!?")) # 안녕

# replace() : 문자열의 특정 부분을 다른 문자로 교체하는 메서드
print(s.replace("World", "Python")) # Hello Python!

# split() : 문자열을 원하는 기준에 따라 쪼개주는 메서드
print("Hello,World,Hello,2024".split(",")) # ['Hello', 'World', 'Hello', '2024']

# join() : 쪼개진 문자열을 합쳐주는 메서드
print(" ".join(['Hello', 'World', 'Hello', '2024'])) # Hello World Hello 2024
print("**".join(['Hello', 'World', 'Hello', '2024'])) # Hello**World**Hello**2024



# isalnum() : 문자열이 알파벳/숫자인지 판단하는 메서드
print("string".isalnum()) # True
print("12345".isalnum()) # True

# isdigit() : 문자열이 숫자인지 판단하는 메서드
print("12345".isdigit()) # True
print("string".isdigit()) # False

# isalpha() : 문자열이 알파벳인지 판단하는 메서드
print("12345".isalpha()) # False
print("string".isalpha()) # True

# isascii() : 문자열이 아스키코드인지 판단하는 메서드
print("12345".isascii()) # True
print("string".isascii()) # True
print("안녕".isascii()) # False

"""
**아스키코드란?**
- 영문 알파벳 + 숫자 + 일부 특수문자로 이루어진 문자 인코딩
- 아스키(ASCII): 미국 국립 표준 협회에서 표준화한 정보교환용 7비트 부호체계
- 문자 인코딩:사용자가 입력한 문자나 기호들을 컴퓨터가 이용할 수 있는 신호로 만드는 것
"""

# rjust() : 문자열 오른쪽 정렬, (공백수, 공백문자)
print("Hello".rjust(10, "a")) # aaaaaHello

# ljust() : 문자열 왼쪽 정렬, (공백수, 공백문자)
print("Hello".ljust(10, "a")) # Helloaaaaa

# center() : 문자열 중앙 정렬, (공백수, 공백문자)
print("Hello".center(10, "a")) # aaHelloaaa

# zfill(): 문자열의 빈 공간을 0으로 채워줌 (문자열 길이)
print("Hello".zfill(10)) # 00000Hello

# translate() : 어떠한 규칙에 따라 문자열을 변환해주는 메서드
table = str.maketrans('HWd', '123')
print(s.translate(table)) # 1ello 2orl3!