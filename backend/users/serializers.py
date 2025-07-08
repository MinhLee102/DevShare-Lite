from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'profile_image']
        read_only_fields = ('email',)


class MyRegisterSerializer(RegisterSerializer):

    def custom_signup(self, request, user):
        user.save()
        return user 