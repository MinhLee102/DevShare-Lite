from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PostViewSet, TagViewSet
from rest_framework_nested import routers
from comments.views import CommentViewSet

"""router = DefaultRouter()"""
router = routers.SimpleRouter()
router.register(r'posts', PostViewSet, basename= 'post')
router.register(r'tags', TagViewSet, basename= 'tag')

comments_router = routers.NestedDefaultRouter(router, r'posts', lookup='post')
comments_router.register(r'comments', CommentViewSet, basename='post-comments')

urlpatterns = [
    path('', include(router.urls)),
    path('', include(comments_router.urls)), 
]

