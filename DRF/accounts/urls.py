from django.urls import path, include
from .views import MyPageView 

urlpatterns = [
    path('', include('dj_rest_auth.urls')),
    path('join/', include('dj_rest_auth.registration.urls')),
    path('mypage/', MyPageView.as_view(), name='mypage'),
]
