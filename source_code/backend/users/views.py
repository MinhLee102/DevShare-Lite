from rest_framework import generics
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomUserDetailsSerializer
from posts.serializers import PostSerializer

class ProfileView(generics.RetrieveUpdateAPIView):
    """
    API view for retrieving and updating the logged-in user's profile.
    - GET: Returns the user's profile info, published posts, and drafts.
    - PATCH/PUT: Updates the user's profile (e.g., bio, profile_image).
    """

    serializer_class = CustomUserDetailsSerializer

    # Ensures only logged-in users can access
    permission_classes = [IsAuthenticated]

    def get_object(self):
        return self.request.user

    def get(self, request, *args, **kwargs):
        """
        Custom GET handler to enrich the response with the user's posts.
        """

        user = self.get_object()
        user_data = self.get_serializer(user).data
        
        # Retrieve and serialize the user's posts, separated by status.
        # The 'posts' related_name comes from the Post model's author field.
        published_posts = user.post.filter(status='PB')
        draft_posts = user.post.filter(status='DR')
        
        data = {
            'profile': user_data,
            'published_posts': PostSerializer(published_posts, many=True, context={'request': request}).data,
            'drafts': PostSerializer(draft_posts, many=True, context={'request': request}).data,
        }
        return Response(data)