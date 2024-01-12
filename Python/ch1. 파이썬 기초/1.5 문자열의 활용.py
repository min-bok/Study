# 문자열 인덱싱
string = "Hello 2024, Bye 2023"

print(string[0]) # H
print(string[1]) # e

# 문자열 슬라이싱 [start:end:k]
"""
- 인덱스가 start인 지점에서 end 미만인 지점
- start를 생략하면 문자열의 시작지점
- end를 생략하면 문자열의 끝지점
- k만큼 건너뛰는 데이터
"""
print(string[2:13]) # llo 2024, B
print("12345678"[::2]) # 1357

# 문자열의 사칙연산
"""
- 더하기 연산 가능
- 곱하기 연산 가능
- 불가능한 연산 실행시 Error 발생
"""
print(string+string) # Hello 2024, Bye 2023Hello 2024, Bye 2023
print(string*3) # Hello 2024, Bye 2023Hello 2024, Bye 2023Hello 2024, Bye 2023
print(string/string) # Error