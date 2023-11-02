from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

from .managers import UserManager

class CustomUser(AbstractUser):
    email = models.EmailField(_('email'), max_length=255, unique=True)

    USERNAME_FIELD = "email" # 로그인에 사용될 필드를 email로 지정
    REQUIRED_FIELDS = [] # 필수로 받고싶은 필드값. USERNAME_FIELD와 password는 따로 명시하지않아도 기본적으로 요구됨

    objects = UserManager()

    def __str__(self):
        return self.email