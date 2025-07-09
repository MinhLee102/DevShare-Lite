from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Comment
from .serializers import CommentSerializer

class CommentViewSet(viewsets.ModelViewSet):
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] 

    def get_queryset(self):
        post_pk = self.kwargs.get('post_pk')
        return Comment.objects.filter(post_id=post_pk, parent__isnull=True)

    def perform_create(self, serializer):
        post_pk = self.kwargs.get('post_pk')
        serializer.save(commenter=self.request.user, post_id=post_pk)