- 목차

# 1. 서론

## 1.1. JWT (JSON Web Tokens) 소개

JWT는 사용자 인증 및 정보 전달을 위한 강력한 도구로, JSON 형식의 토큰입니다. 이 토큰은 정보의 무결성을 보장하며 필요에 따라 정보를 안전하게 전달할 수 있는 방식으로 설계되었습니다.

### 1.1.1 JWT의 용도

JWT는 주로 다음과 같은 용도로 사용됩니다

1. **인증**: JWT는 사용자 인증에 매우 유용합니다. 사용자가 로그인하면 서버는 JWT를 발급하고, 이 토큰을 클라이언트에게 제공합니다. 클라이언트는 이 토큰을 사용하여 각 요청에 대한 인증을 수행할 수 있습니다.
2. **정보 교환**: JWT를 사용하면 클라이언트와 서버 간의 정보 교환이 효율적으로 이루어집니다. 페이로드에 필요한 정보를 담아 보낼 수 있으며, 이 정보는 안전하게 전달됩니다.
3. **세션 관리 용도**: JWT를 사용하면 서버가 세션 정보를 관리할 필요가 없어집니다. 각 클라이언트의 상태는 토큰 자체에 저장되므로 서버의 부하가 감소하며 확장성이 향상됩니다.

### 1.1.2 JWT의 구성

JWT(JSON Web Token)는 세 가지 주요 구성 요소로 구성됩니다

1. **헤더 (Header)**
2. **페이로드 (Payload)**
3. **서명 (Signature)**

각 부분은 토큰의 구조와 정보 전달을 위해 중요한 역할을 합니다. 이러한 구성 요소를 함께 사용하여 JWT는 안전하고 효율적인 방식으로 정보를 전달하고 검증합니다.

자세한 내용은 다음 챕터에서 자세히 다루겠습니다.

## 1.2. Django와 JWT의 연계

Django의 기본 인증 시스템은 세션을 기반으로 하고 있으며, 웹 애플리케이션에 적합한 방식입니다. 그러나 RESTful API를 구축하거나 분산 시스템에서 사용자 인증을 구현할 때는 JWT(JSON Web Tokens)와 같은 토큰 기반 인증이 더 적합할 수 있습니다. 이에 대한 이유는 다음과 같습니다

### 1.2.1 Django 인증 시스템

Django의 기본 인증 시스템은 세션을 활용하여 사용자를 식별하고 관리합니다. 이 시스템은 웹 애플리케이션에서 사용자를 인증하고 상태를 유지하는 데 효과적이지만, RESTful API나 분산 시스템에서는 몇 가지 제한 사항이 존재합니다

- **상태 유지**: 세션은 상태를 서버에 유지해야 하므로 서버 측의 부담이 증가합니다.
- **세션 관리**: 세션 관리를 위해 서버 측에 저장 공간이 필요하며, 이로 인해 서버의 확장성에 제약이 생길 수 있습니다.
- **다중 플랫폼 지원**: 모바일 애플리케이션 및 다른 플랫폼에서의 사용자 인증을 위해 유연한 방식이 필요합니다.

### 1.2.2 왜 JWT인가?

JWT는 이러한 문제를 극복하기 위한 강력한 해결책으로 등장했습니다. 다음은 JWT를 선택하는 이유입니다

1. **상태를 유지하지 않음**: JWT는 상태를 서버에 유지하지 않습니다. 이는 사용자의 인증 정보가 토큰 내에 자체 포함되어 있어서, 서버 측에서 별도의 상태 관리가 필요하지 않음을 의미합니다. 이로써 서버의 부담이 감소합니다.
2. **분산 시스템 지원**: JWT는 분산 시스템 및 다중 플랫폼에서 손쉽게 사용될 수 있습니다. 클라이언트가 토큰을 저장하고 사용하면, 서버는 사용자의 상태를 관리하는 부담이 줄어들며, 여러 시스템 간에 사용자 인증 정보를 공유하기에 이상적입니다.
3. **보안성**: JWT는 디지털 서명을 통해 토큰의 무결성을 보장합니다. 이를 통해 토큰이 변조되지 않았음을 검증할 수 있으며, 토큰의 내용은 안전하게 보호됩니다.
4. **유연성**: JWT는 클레임(claim)이라는 페이로드 내의 사용자 정의 데이터를 포함할 수 있는 유연한 구조를 가지고 있습니다. 이를 통해 다양한 사용 사례에 맞게 JWT를 활용할 수 있습니다.

# 2. JWT의 기초

### 2.1. JWT의 구조

JWT( JSON Web Tokens)는 세 가지 주요 구성 요소로 구성되며, 이들은 마침표로 구분된 문자열로 표현됩니다. 다음은 각 구성 요소에 대한 설명입니다.

```
xxxxx[Header].yyyyy[Payload].zzzzz[Signature]
```

1. **헤더 (Header)**

- 헤더는 JWT의 유형 및 서명 알고리즘과 같은 메타 정보를 포함합니다. 일반적으로 JSON 포맷으로 작성되며, 일반적으로 Base64로 인코딩됩니다.
- 다음의 예시에서 "alg"은 서명 알고리즘을 나타내며, "HS256"는 HMAC SHA-256 알고리즘을 사용함을 나타냅니다. "typ"은 토큰의 유형을 나타냅니다.
  ```json
  {
    "alg": "HS256",
    "typ": "JWT"
  }
  ```

1. **페이로드 (Payload)**

- 페이로드는 실제로 전달하려는 정보를 포함합니다. 이 정보는 클레임(claim)이라고도 불립니다.
- 클레임은 사용자에 대한 속성이나 토큰에 관한 메타데이터를 포함할 수 있습니다.
- 페이로드는 JSON 포맷으로 작성되며, Base64로 인코딩됩니다.
- 다음의 예시에서 "name"은 사용자의 이름을, "exp"는 토큰의 만료 시간을 나타냅니다.
  ```json
  {
    "name": "John Doe",
    "exp": 1516239022
  }
  ```

1. **서명 (Signature)**
   - 서명은 토큰의 유효성을 검증하기 위한 부분입니다. 서명은 헤더, 페이로드, 그리고 비밀 키를 사용하여 생성됩니다.
   - 서명을 통해 토큰이 변경되지 않았고, 유효한 발급자로부터 온 것임을 확인할 수 있습니다.

이러한 구조를 통해 JWT는 정보를 안전하게 표현하고 전달할 수 있으며, 클라이언트와 서버 간의 통신에서 무결성과 인증을 보장합니다.

## 2.2. JWT의 작동 방식

다음은 사용자 인증과 정보 교환을 위한 JWT(JSON Web Tokens)의 작동 방식에 대한 설명입니다.

### 1. 인증 과정

1. **사용자 인증:** 사용자가 ID와 비밀번호와 같은 인증 정보와 함께 서버에 로그인 요청을 보냅니다.
2. **토큰 생성:** 서버는 인증이 유효한 경우 사용자 정보와 함께 서명된 JWT를 생성하여 클라이언트에 반환합니다.
   - **AccessToken**: 일반적으로 짧은 유효 기간을 가지며, 노출되더라도 짧은 시간 동안만 악용될 수 있도록 설계됩니다.
   - **RefreshToken**: AccessToken을 갱신하는 데 사용되는 토큰으로, RefreshToken이 노출되어도 AccessToken 발급을 위해 client id와 서버의 secret 키가 추가로 필요하기 때문에 안전합니다.

### 2. 토큰 검증

1. **요청과 토큰 전달:** 사용자는 발급받은 토큰을 쿠키, 세션, 스토리지 등에 저장하여두었다가 이후인증이 필요한 모든 요청시에 AccessToken을 header에 담아서 서버에 보냅니다.
2. **토큰 검증:** 서버는 받은 토큰의 서명을 검증하고, 토큰이 유효한지 확인합니다. 유효하면 해당 토큰의 페이로드를 사용하여 사용자를 인증하고 요청에 응답합니다.

### 3. 상태 비저장

1. **상태 비저장:** JWT는 상태를 서버에 저장하지 않습니다. 서버는 사용자의 세션 상태를 유지하지 않으며, 오로지 토큰을 사용하여 사용자를 인증합니다.
2. **만료 및 갱신:** AccessToken이 만료된 경우, 클라이언트는 RefreshToken을 사용하여 서버로부터 새로운 AccessToken을 발급받을 수 있습니다.
3. **로그아웃:** 로그아웃 시, 클라이언트는 AccessToken과 RefreshToken을 모두 만료시킵니다.

이와 같은 방식으로 JWT는 안전한 사용자 인증 및 정보 교환을 달성하며, 상태 비저장 방식으로 서버의 부담을 줄입니다. 클라이언트는 토큰을 안전하게 보관하여 사용하고, 토큰의 만료 및 갱신을 통해 보안을 유지합니다.

## 2.3. JWT의 장점과 유의사항

1. **장점**
   - 세션 상태를 서버에 저장하지 않기 때문에, 서버는 클라이언트 수가 증가하더라도 부담이 크게 증가하지 않습니다.
   - JWT는 필요한 모든 정보를 자체적으로 가지고 있어 별도의 데이터베이스 조회 없이 사용자 정보를 포함합니다.
   - 서명을 통해 데이터의 무결성을 보장합니다. 이는 토큰이 생성된 후 변경되지 않았음을 확인합니다.
2. **유의사항**
   - 페이로드에 너무 많은 정보를 담으면 토큰의 크기가 커져 네트워크 트래픽에 영향을 줄 수 있습니다. 따라서 필요한 최소한의 정보만을 토큰에 포함해야 합니다.
   - 비밀 키가 노출되면 토큰을 위조할 수 있습니다. 따라서 비밀 키를 안전하게 보호해야 합니다. 또한, 클라이언트 측에서도 토큰을 안전하게 보관해야 합니다.
   - 일단 발급된 토큰은 서버에서 즉시 폐기할 수 없으며, 유효기간이 만료될 때까지 유효합니다. 따라서 토큰의 만료 기간을 적절하게 설정하여 보안을 유지해야 합니다.
   - Payload는 암호화되지 않으므로, 공격에 의해 노출될 가능성이 있습니다. 따라서 민감한 정보를 Payload에 기재하지 않아야 합니다.
   - 사용자 토큰이 탈취당하는 경우 보안상의 문제가 발생할 수 있으므로, 토큰에 적절한 사용기한을 부여하여 효과적인 보안을 유지해야 합니다.

# 3. JWT 인증 방식으로 회원가입 및 로그인 구현하기

## 3.1 프로젝트 초기 설정

Django 프로젝트 생성을 위해 다음의 명령어를 실행합니다.

```bash
python -m venv venv # 가상환경 생성

source venv/Scripts/activate # 가상환경 실행, 명령어는 PC 환경에 따라 상이할 수 있음

pip install django # django 설치

django-admin startproject project . # project 프로젝트 생성

python manage.py startapp accounts # accounts 앱 생성

# settings.py > INSTALLED_APPS에 새로 생성한 앱 추가
```

## 3.2 Custom User 모델 구현

```markdown
### custom user 모델을 아래와 같이 구현해주세요 ☺️

1. username 필드는 사용하지않습니다.
2. 로그인시 email 필드를 사용합니다.
3. gender 필드를 추가하여 여자/남자 중에 선택할 수 있도록 해주세요.
4. date_of_birth 필드를 추가해주세요.
```

1. User Managers을 다음과 같이 생성합니다.

```python
# accounts/managers.py
from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _

class CustomUserManager(BaseUserManager):

    def create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError(_('The Email must be set'))
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        extra_fields.setdefault('is_active', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError(_('Superuser must have is_staff=True.'))
        if extra_fields.get('is_superuser') is not True:
            raise ValueError(_('Superuser must have is_superuser=True.'))
        return self.create_user(email, password, **extra_fields)
```

1. Custom User 모델을 생성합니다. 이때, 기본 User 모델을 확장하기 위해 **`AbstractUser`**를 상속받습니다.

```python
# accounts/models.py
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager

GENDER_CHOICES = (
    ('male', '남자'),
    ('female', '여자'),
)

class CustomUser(AbstractUser):
    username = None
    email = models.EmailField(_('email address'), unique=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    gender = models.CharField(max_length=6, choices=GENDER_CHOICES, blank=True)
    date_of_birth = models.DateField(blank=True, null=True)


    def __str__(self):
        return self.email
```

1. settings.py에 `AUTH_USER_MODLE` 을 추가해 사용할 User 모델을 선언합니다.

```python
AUTH_USER_MODEL = 'accounts.CustomUser'
```

1. 모델 변경 사항을 데이터베이스에 적용하기 위해 다음 명령어를 실행하여 마이그레이션을 진행합니다.

```bash
python manage.py makemigrations
python manage.py migrate
```

1. Custom User 모델을 admin 페이지에서 관리할 수 있도록 등록합니다.

```python
from django.contrib import admin
from accounts.models import CustomUser

# Register your models here.
admin.site.register(CustomUser)
```

📌 참고

[Custom users using Django REST framework | Kraken Systems Ltd.](https://krakensystems.co/blog/2020/custom-users-using-django-rest-framework?source=post_page-----e54c3ed2420c--------------------------------)

[customUser.md](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/f6e14c4e-4330-4533-94d5-0c60608f096c/customUser.md)

# 4. 회원가입 구현

1. **라이브러리 설치**

회원가입을 구현하기 위해 필요한 라이브러리를 설치합니다. **`djangorestframework`**, **`dj-rest-auth`**, **`django-allauth`**, **`djangorestframework-simplejwt`** 등의 라이브러리가 필요합니다.

[requirements.txt](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/dbd6cbbe-4894-483c-a57f-5168efbb6591/requirements.txt)

```bash
pip install djangorestframework # RESTful API 개발
pip install dj-rest-auth # 인증 및 사용자 관리 구현(로그인, 로그아웃, 회원가입 및 소셜 로그인)
pip install django-allauth # 다양한 인증 및 회원가입 옵션을 제공 (사용자 인증, 회원가입, 비밀번호 재설정 및 소셜 로그인)
pip install djangorestframework-simplejwt # JSON Web Token (JWT) 인증을 구현
```

1.  **설치한 라이브러리를 사용할 수 있도록 settings.py에 추가합니다.**

    settings.py 파일에서 필요한 설정을 추가합니다. **`INSTALLED_APPS`**에 관련 앱을 추가하고, JWT를 사용하도록 설정합니다.

    ```python
    INSTALLED_APPS = [
    ...
        # 설치한 라이브러리들
        'rest_framework',
        'rest_framework.authtoken',
        'dj_rest_auth',
        'django.contrib.sites',
        'allauth',
        'allauth.account',
        'allauth.socialaccount',
        'dj_rest_auth.registration',
    ...
    ]
    ```

    ```python
    # dj-rest-auth
    REST_USE_JWT = True # JWT 사용 여부
    JWT_AUTH_COOKIE = 'my-app-auth' # 호출할 Cookie Key 값
    JWT_AUTH_REFRESH_COOKIE = 'my-refresh-token' # Refresh Token Cookie Key 값

    # django-allauth
    SITE_ID = 1 # 해당 도메인 id
    ACCOUNT_UNIQUE_EMAIL = True # User email unique 사용 여부
    ACCOUNT_USER_MODEL_USERNAME_FIELD = None # 사용자 이름 필드 지정
    ACCOUNT_USERNAME_REQUIRED = False # User username 필수 여부
    ACCOUNT_EMAIL_REQUIRED = True # User email 필수 여부
    ACCOUNT_AUTHENTICATION_METHOD = 'email' # 로그인 인증 수단
    ACCOUNT_EMAIL_VERIFICATION = 'none' # email 인증 필수 여부

    SIMPLE_JWT = {
        'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),  # AccessToken 유효 기간 설정
        'SLIDING_TOKEN_REFRESH_LIFETIME': timedelta(days=1),  # RefreshToken 유효 기간 설정
    }
    ```

    ```python
    REST_FRAMEWORK = {
        'DEFAULT_AUTHENTICATION_CLASSES': [
            'rest_framework_simplejwt.authentication.JWTAuthentication',
        ],
    }
    ```

2.  **마이그레이션**

    ```bash
    python manage.py migrate
    ```

3.  \***\*URL 패턴 설정\*\***
    회원가입을 처리할 URL 패턴을 설정합니다.
        ```python
        # myapp/urls.py
        from django.urls import path, include

        urlpatterns = [
            path('admin/', admin.site.urls),
            path("account/", include("accounts.urls"))
        ]
        ```

        ```python
        # accounts/urls.py
        from django.contrib import admin
        from django.urls import path, include

        urlpatterns = [
            path('join/', include("dj_rest_auth.registration.urls")),
        ]
        ```

# 5. 로그인 구현

1.  \***\*URL 패턴 설정\*\***
    로그인 처리를 위한 URL 패턴을 추가합니다.
        ```python
        # accounts.urls.py
        from django.urls import path, include

        urlpatterns = [
        ...
            path("", include("dj_rest_auth.urls"))
        ...
        ]
        ```

# 6. \***\*클라이언트 테스트\*\***

````markdown
### djangorestframework-simplejwt를 사용하여 회원가입과 로그인 기능을 구현해주세요.

### 구현되어야할 엔드 포인트는 아래와 같습니다.

```py
/account/join # 회원가입
/account/login # 로그인
/account/logout # 로그아웃
```
````

````

회원가입 및 로그인 API가 구현되었습니다. 클라이언트는 회원가입 요청을 보내면 사용자가 생성되고 JWT 토큰이 반환됩니다. 로그인 요청을 보내면 이메일과 비밀번호가 검증되고 JWT 토큰이 반환됩니다.

- 회원가입: http://localhost:8000/account/join/
- 로그인: http://localhost:8000/account/login/

다음과 같은 기능도 사용할 수 있습니다.

```python
/account/login # 로그인
/account/logout # 로그아웃
/account/password/change/account/ # 비밀번호 재설정
/account/token/refresh/ # 토큰 재발급
````

![스크린샷 2023-11-06 132602.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/49618cd5-ea19-4521-ad36-f3cf241359cb/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2023-11-06_132602.png)

![스크린샷 2023-11-06 132742.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/4ac5635b-ee8e-4207-ad0b-3ce3ab7ed649/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2023-11-06_132742.png)

다음 챕터에서는 Access Token과 Refresh Token을 사용한 인증과정에 대해 알아보도록 하겠습니다.

📌 참고

[auth.md](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/8fee6a69-5a52-4182-a063-7227cc7af31c/auth.md)

# 6. **Access Token, Refresh Token 인증 과정**

![images_daybreak_post_a1d58638-7671-44c0-9694-09f6e81c9a93_스크린샷 2020-09-01 16.11.26.png](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/fda70e48-1503-4fdf-8ad1-7c36cbf8f287/images_daybreak_post_a1d58638-7671-44c0-9694-09f6e81c9a93_%E1%84%89%E1%85%B3%E1%84%8F%E1%85%B3%E1%84%85%E1%85%B5%E1%86%AB%E1%84%89%E1%85%A3%E1%86%BA_2020-09-01_16.11.26.png)

Access Token과 Refresh Token을 활용한 사용자 인증 과정은 다음과 같습니다:

1. 사용자가 로그인을 시도합니다.
2. 서버는 사용자 정보를 확인한 후, Access Token과 Refresh Token을 발급합니다.
3. 사용자가 데이터를 요청할 때, Access Token을 HTTP 헤더에 담아 요청을 보냅니다.
4. 서버는 수신된 Access Token을 검증하고 요청에 대한 응답을 생성하여 반환합니다.
5. Access Token이 만료된 경우, 서버는 Access Token이 만료되었음을 사용자에게 알립니다.
6. 사용자는 Refresh Token과 현재 유효한 Access Token을 사용하여 새로운 Access Token을 요청합니다.
7. 서버는 Refresh Token의 유효성을 확인한 후, 새로운 Access Token을 발급하여 반환합니다.

# 💡 실습

````markdown
### Access Token이 유효한 경우에만 접근이 가능한 마이페이지를 만들어주세요 ☺️

1. 로그인하여 Access Token을 발급받습니다.
2. 마이페이지 접속시 header에 Access Token을 담아보냅니다. Access Token이 유효한 경우에만 마이페이지에 접근이 가능합니다.
3. 마이페이지에 접속하면 "반갑습니다, {유저이메일}님!"이 화면에 출력되도록 해주세요.

### 구현되어야할 엔드 포인트는 아래와 같습니다.

```py
/account/join # 회원가입
/account/login # 로그인
/account/logout # 로그아웃
/account/mypage # 로그인한 사용자만 확인가능
```
````

```

![토큰이 유효하지않거나 만료된 경우](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/9a840ae4-1d66-4699-a55a-6f129405f6ff/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2023-11-06_164138.png)

토큰이 유효하지않거나 만료된 경우

![토큰이 유효한 경우](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/18788262-49e7-4af8-9170-9101e8b65adf/%EC%8A%A4%ED%81%AC%EB%A6%B0%EC%83%B7_2023-11-06_164157.png)

토큰이 유효한 경우

📌참고

[mypage.md](https://prod-files-secure.s3.us-west-2.amazonaws.com/579fe283-28aa-489d-ae65-d683304becfc/deb4fc06-588e-4a51-a90e-d7004c140ec9/mypage.md)
```
