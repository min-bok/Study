from dj_rest_auth.registration.views import RegisterView
from .serializers import CustomRegisterSerializer

# 회원가입 커스텀 뷰
class CustomRegisterView(RegisterView):
    serializer_class = CustomRegisterSerializer

from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.http import HttpResponse 

class MyPageView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return HttpResponse(f"<h1>반갑습니다, {user.email}님!</h1>")
