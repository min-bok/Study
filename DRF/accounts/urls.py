from django.urls import path, include
from .views import MyPageView, CustomRegisterView

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('join/', CustomRegisterView.as_view(), name='custom_join'),
    path('mypage/', MyPageView.as_view(), name='mypage'),
]
