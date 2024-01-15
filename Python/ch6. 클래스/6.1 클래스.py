# 1. 클래스
"""
- 클래스는 데이터(멤버)와 기능(메서드)를 가지고 있는 인스턴스 객체를 생성하기 위한 역할을 함
- 파이썬은 대표적인 객체지향 프로그래밍 언어이며 클래스는 일종의 설계도면임
"""

# class Car(object):
#     Maxspeed = 300
#     MaxPeople = 5

#     def move(self, x):
#         print(f"{x}의 스피드로 움직이고 있습니다.")

#     def stop(self):
#         print("멈췄습니다.")

# k5 = Car()
# k3 = Car()
# k5.move(10) # 10의 스피드로 움직이고 있습니다.
# k5.stop() # 멈췄습니다.
# k3.move(5) # 5의 스피드로 움직이고 있습니다.
# k3.stop() # 멈췄습니다.

# print(k5.Maxspeed) # 300
# print(k3.Maxspeed) # 300

## 1.1 클래스 변수
"""
- 클래스 변수는 클래스 바로 하위에 자리하고 있는 변수들입니다.
- 클래스 변수는 변수 이름으로 접근하지않습니다
- 클래스 변수는 클래스 이름을 통해서 접근할 수 있습니다.
- 클래스 변수는 해당 클래스를 통해 만들어진 모든 인스턴스 객체들이 공유하는 변수 값 입니다.
- 각 인스턴스 객체들 각자가 관리하고 있는 변수는 인스턴스 변수라고 합니다
"""
# class Car(object):
#     kinds = []
#     MaxSpeed = 300
#     MaxPeople = 5

#     def move(self, x):
#         print(f"{x}의 스피드로 움직이고 있습니다.")

#     def stop(self):
#         print("멈췄습니다.")

# k5 = Car()
# k5.kinds.append('k5')

# k3 = Car()
# k3.kinds.append('k3')

# print(k5.kinds) # ['k5', 'k3']

# ----------------------------------

# class Car(object):
#     kinds = []
#     speed = 300

#     def add_kinds(self, name):
#         self.kinds.append(name)

#     def change_speed(self, speed):
#         self.speed = speed

# k5 = Car()
# k3 = Car()
# k5.add_kinds('k5')
# k3.add_kinds('k3')
# k5.change_speed(500) 
# k3.change_speed(250)

# print('k5.kinds:', k5.kinds) # k5.kinds: ['k5', 'k3']
# print('k3.kinds:', k3.kinds) # k3.kinds: ['k5', 'k3']
# print('k5.speed:', k5.speed) # k5.speed: 500
# print('k3.speed:', k3.speed) # k3.speed: 250
# print(Car().speed) # 300

# 2. _init_ 함수
"""
- __init__ 메서드는 다른 프로그래밍 언어에서의 생성자 역할을 하는 클래스 메서드
- 인스턴스 객체를 생성할 때 자동으로 실해됨
"""

## 2.1 인스턴스 변수
"""
- 클래스 변수: 인스턴스 객체들이 모두 공통으로 공유하는 값
- 인스턴스 변수: 인스턴스 객체 각자가 가지고 있는 값
- 인스턴스 변수는 init 메서드 안에서 선언을 해주어야하며, 이곳에서 선언된 변수들은 각 인스턴스 객체들의 변수로 활동할 수 있음
- 초기화 함수 사용을 위해 반드시 __init__을 사용하고, 매개변수는 self로 선언해야함
"""
# class Car(object):
# 	MaxSpeed = 300 # 공유하는 영역
# 	MaxPeoeple = 5 # 공유하는 영역

# 	def __init__(self, 이름): #self는 자신만의 영역
# 		self.name = 이름

# 	def move(self, x):
# 		print(self.name, x, '의 스피드로 움직이고 있습니다.')

# 	def stop(self):
# 		print('멈췄습니다.')

# k5 = Car('케이파이브')
# k3 = Car('케이쓰리')

# k5.move(100) # 케이파이브 100 의 스피드로 움직이고 있습니다.
# k3.move(200) # 케이쓰리 200 의 스피드로 움직이고 있습니다.

### 더 알아보기: self란?
"""
- 클래스 내부에 정의된 함수인 메서드의 첫번째 인자는 반드시 self 여야함
- self가 없으면 함수는 인자가 없지만 하나를 받았다라는 오류를 발생시킨다
- 이는 파이썬이 첫번째 인자로 self를 자동으로 전달하기 때문에 발생하는 오류이다.
- 클래스 내에 정의된 self는 클래스 인스턴스 그 자체이다 (self와 생성된 인스턴스의 주소값 id가 동일함)
- 즉, self는 객체의 인스턴스 그 자체, 객체 자기 자신을 참조하는 매개변수
- 객체지향 언어는 이것을 메소드에 보이지않게 전달하지만 
- 파이썬은 클래스의 메서드를 정의할 때 self를 명시하며, 메서드를 불러올때 self는 자동으로 전달됨
- self를 사용함으로서 클래스내에 정의한 멤버에 접근할 수 있게됨

	def stop():
		print('멈췄습니다.') 
		
	Car.stop() # TypeError: Car.stop() takes 0 positional arguments but 1 was give
"""

# 3. 특별 메서드 (magic method) : https://docs.python.org/3/reference/datamodel.html
"""
- 파이썬의 클래스에는 기본적으로 내장하고 있는 특별 메서드들이 있으며, 이런 특별 메서드르 쉽게 재정의하여 사용할 수 있음
- 매직메서드 또는 던더 메서드라고 불림
"""

# class Car(object):
#     kinds = []
#     MaxSpeed = 300
#     MaxPeoeple = 5

#     def __init__(self, 이름):
#         self.name = 이름
#         self.kinds.append(이름)

#     def move(self, x):
#         print(self.name, x, '의 스피드로 움직이고 있습니다.')
#         print(self.kinds)
#         self.stop()

#     def stop(self):
#         print('멈췄습니다.')

# k5 = Car('케이파이브') 
# k5.move(100)
# # 케이파이브 100 의 스피드로 움직이고 있습니다.
# # ['케이파이브']
# # 멈췄습니다.

# k3 = Car('케이쓰리')
# k3.move(200)
# # 케이쓰리 200 의 스피드로 움직이고 있습니다.
# # ['케이파이브', '케이쓰리']
# # 멈췄습니다.

"""
- 인스턴스.__dir__을 입력하면 볼 수 있는 기본 매직메서드 중 무언가를 더하는 메서드인 __add__를 수정해서 "hello"를 출력하도록 해보자
- 메서드는 얼마든지 재정의 되어질 수 있음
"""

class Car(object):
    kinds = []
    MaxSpeed = 300
    MaxPeoeple = 5

    def __init__(self, 이름):
        self.name = 이름
        self.kinds.append(이름)

    def __add__(self, add):
        return f"hello {add}" # add: 더 할 요소
    
    def __str__(self): # 자신의 이름을 알려주는 매직메서드
        return self.name

    def move(self, x):
        print(self.name, x, '의 스피드로 움직이고 있습니다.')
        print(self.kinds)
        self.stop()

    def stop(self):
        print('멈췄습니다.')

    @staticmethod #decorator
    def 스피드배속(현재스피드, 배속할스피드):
        print(f'현재 {현재스피드 * 배속할스피드}의 스피드로 달리고 있습니다.')

k5 = Car('케이파이브')
k3 = Car('케이쓰리')
print(k5 + k3) # hello 케이쓰리
print(k5) # 케이파이브
print(Car.스피드배속(100, 2)) # 현재 200의 스피드로 달리고 있습니다.

"""
@staticmethod 데코레이터
- 클래스를 직접 써야할때 self없이 사용할 수 있는 정적메서드
"""

# 4. 상속

# 5. 메서드 오버라이딩

# 6. 다중 상속

# 7. 비공개 속성