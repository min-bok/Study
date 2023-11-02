from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('join/', include("dj_rest_auth.registration.urls")),
]
