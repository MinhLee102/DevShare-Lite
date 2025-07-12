from rest_framework import serializers
from .models import Post, Tag
from users.serializers import CustomUserDetailsSerializer

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'name']
        

class PostSerializer(serializers.ModelSerializer):
    """
    Serializer for the Post model, handling nested author and tag data.
    """

    # Use a nested serializer to show detailed author info instead of just an ID.
    author = CustomUserDetailsSerializer(read_only = True)

    # SlugRelatedField allows writing tags by their name (e.g., ["react", "django"])
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
            'updated_at',
            'status'
        ]
        read_only_fields = ['author', 'created_at', 'updated_at',]


    def to_internal_value(self, data):
        """
        Override this method to auto-create tags that don't exist yet.
        """
                
        tag_names = data.get('tags')
        if isinstance(tag_names, list):
            for name in tag_names:
                Tag.objects.get_or_create(name=name)
        
        return super().to_internal_value(data)
    
