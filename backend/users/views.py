from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserDetailsSerializer
from posts.serializers import PostSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    serializer_class = CustomUserDetailsSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        user = self.get_object()
        user_data = self.get_serializer(user).data
        
        published_posts = user.post.filter(status='PB')
        draft_posts = user.post.filter(status='DR')
        
        data = {
            'profile': user_data,
            'published_posts': PostSerializer(published_posts, many=True, context={'request': request}).data,
            'drafts': PostSerializer(draft_posts, many=True, context={'request': request}).data,
        }
        return Response(data)