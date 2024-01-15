"""
# 문제 1
오늘 진행한 책 크롤링 코드를 이용하여 다음 요구사항을 만족하는 코드를 작성해주세요.

1. 모든 텍스트는 앞, 뒤 공백이 제거된 텍스트여야 합니다.
2. 가격은 int 형이어야 합니다.
3. 저자는 앞에 '저자: '가 없어야 합니다.
4. 가격을 달러로 바꿔주는 메서드를 작성해주세요.
5. 할인 메서드를 작성해주세요. 할인율이 들어가면 변경되어야 합니다.
  5.1 object.discount(10) => 10프로 할인된 가격을 반환합니다.
  5.2 object.discount(0) => 0프로 할인된 가격을 반환합니다.
"""
import requests
from bs4 import BeautifulSoup

url = "https://paullab.co.kr/bookservice/"
response = requests.get(url)

if response.status_code == 200:
    html = response.text
    soup = BeautifulSoup(html, 'html.parser')
    book_detail = soup.select("div.book_detail")
    # titles = soup.select("h2.book_name")
    # book_info = soup.select("p.book_info")

    for info in book_detail:
        print("=============")
        print(info)

    # for info in book_info:
    #     print(info)

else:
    print(response.status_code)