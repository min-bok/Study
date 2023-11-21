from django.contrib.auth import get_user_model
from dj_rest_auth.registration.serializers import RegisterSerializer

class CustomRegisterSerializer(RegisterSerializer):
    class Meta:
        model = get_user_model()
        fields = ('email', 'password')

    def get_cleaned_data(self):
        data_dict = super().get_cleaned_data()
        data_dict['username'] = data_dict['email']
        return data_dict
