from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from .models import User

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = {'username', 'bio', 'profile_image'}

class MyRegisterSerializer(RegisterSerializer):

    def custom_signup(self, request, user):
        user.save()
        return user 