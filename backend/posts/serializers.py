from rest_framework import serializers
from .models import Post, Tag
from users.serializers import UserProfileSerializer

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']

class PostSerializer(serializers.ModelSerializer):

    author = UserProfileSerializer(read_only = True)

    tags = serializers.SlugRelatedField(
        many = True,
        slug_field = 'name',
        queryset=Tag.objects.all(),
        required = False
    )

    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'content',
            'author',
            'tags',
            'created_at',
            'updated_at'
        ]
        read_only_fields = ['author', 'created_at', 'updated_at']

    def to_internal_value(self, data):
        tag_names = data.get('tags')
        if isinstance(tag_names, list):
            for name in tag_names:
                Tag.objects.get_or_create(name=name)
        
        return super().to_internal_value(data)
    
