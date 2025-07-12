from rest_framework import serializers
from dj_rest_auth.registration.serializers import RegisterSerializer
from dj_rest_auth.serializers import LoginSerializer
from .models import User

class CustomUserDetailsSerializer(serializers.ModelSerializer):
    """
    Serializer for the User model.
    Determines which user fields are returned in API responses 
    """

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'bio', 'profile_image']
        read_only_fields = ('id', 'email',)


class MyRegisterSerializer(RegisterSerializer):
    """
    Custom registration serializer to add any extra logic during signup.
    Currently, it uses the default behavior.
    """

    def custom_signup(self, request, user):
        user.save()
        return user 
    
class CustomLoginSerializer(LoginSerializer):
    """
    Custom login serializer to allow users to log in with either their
    username or their email address.
    """

    # Override default fields to make them not strictly required, allowing the user to provide one or the other.
    username = serializers.CharField(required=False, allow_blank=True)
    email = serializers.EmailField(required=False, allow_blank=True)
    
    def validate(self, attrs):
        """
        Custom validation to authenticate the user via username or email.
        """

        username = attrs.get('username')
        email = attrs.get('email')
        password = attrs.get('password')
        user = None

        if not password:
            raise serializers.ValidationError('Password is required.')

        # Attempt to find the user by email first, if provided.
        if email:
            try:
                user = User.objects.get(email__iexact=email) 
            except User.DoesNotExist:
                pass 

        # If user was not found by email, try by username.
        if not user and username:
            try:
                user = User.objects.get(username__iexact=username)
            except User.DoesNotExist:
                pass

        # If a user object was found, check their password and active status.
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
