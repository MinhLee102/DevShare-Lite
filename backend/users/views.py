from rest_framework.decorators import api_view
from rest_framework.response import Response

from .models import User
from .serializers import CustomUserDetailsSerializer

@api_view(['GET'])
def get_user_profile_data(request, pk):
    try:
        try:
            user = User.objects.get(username = pk)
        except User.DoesNotExist:
            return Response({'error': 'User not exists'})
    
        serializer = CustomUserDetailsSerializer(user, many = False)
        return Response(serializer.data)
    except:
        return Response({'error': 'Error getting user data'})



