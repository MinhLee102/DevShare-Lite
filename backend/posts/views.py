from rest_framework import viewsets, generics, status
from rest_framework.decorators import action
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from backend.pagination import StandardResultsSetPagination
from .models import Post, Tag
from .serializers import PostSerializer, TagSerializer
from .permissions import IsAuthorOrReadOnly
from rest_framework.response import Response

class PostViewSet(viewsets.ModelViewSet):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly, IsAuthorOrReadOnly]
    pagination_class = StandardResultsSetPagination

    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'author__username', 'tags__name']
    ordering_fields = ['created_at', 'updated_at']

    def get_queryset(self):
        if self.action == 'list':
            return Post.objects.filter(status=Post.PostStatus.PUBLISHED).select_related('author').prefetch_related('tags').order_by('-created_at')
        return Post.objects.all().select_related('author').prefetch_related('tags')

    def perform_create(self, serializer):
        serializer.save(author = self.request.user)

    @action(detail=True, methods=['post'], permission_classes=[IsAuthorOrReadOnly])
    def publish(self, request, pk=None):
        post = self.get_object()
        if post.status == 'PB':
            return Response({'detail': 'This post has already been published.'}, status=status.HTTP_400_BAD_REQUEST)
            
        post.status = 'PB'
        post.save()
        serializer = self.get_serializer(post)
        return Response(serializer.data)


class TagViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Tag.objects.all().order_by('name')
    serializer_class = TagSerializer

    pagination_class = StandardResultsSetPagination



