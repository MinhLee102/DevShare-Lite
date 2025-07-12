from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from .models import User

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'profile_image']
        read_only_fields = ('id', 'email',)


class MyRegisterSerializer(RegisterSerializer):

    def custom_signup(self, request, user):
        user.save()
        return user 
    
class CustomLoginSerializer(LoginSerializer):
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    
    def validate(self, attrs):
        username = attrs.get('username')
        email = attrs.get('email')
        password = attrs.get('password')
        user = None

        if not password:
            raise serializers.ValidationError('Password is required.')

        if email:
            try:
                user = User.objects.get(email__iexact=email) 
            except User.DoesNotExist:
                pass 


        if not user and username:
            try:
                user = User.objects.get(username__iexact=username)
            except User.DoesNotExist:
                pass

        if user:
            if not user.is_active:
                msg = 'User account is disabled.'
                raise serializers.ValidationError(msg, code='authorization')
            
            if not user.check_password(password):
                msg = 'Unable to log in with provided credentials.'
                raise serializers.ValidationError(msg, code='authorization')
        else:
            msg = 'Unable to log in with provided credentials.'
            raise serializers.ValidationError(msg, code='authorization')
        
        attrs['user'] = user
        return attrs
