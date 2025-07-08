from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from backend.pagination import StandardResultsSetPagination
from .models import Post, Tag
from .serializers import PostSerializer, TagSerializer
from .permissions import IsAuthorOrReadOnly

class PostViewSet(viewsets.ModelViewSet):
    queryset = Post.objects.select_related('author').prefetch_related('tags').all().order_by('-created_at')
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]

    pagination_class = StandardResultsSetPagination

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all().order_by('name')
    serializer_class = TagSerializer

    pagination_class = StandardResultsSetPagination



