from rest_framework import serializers
from .models import Comment
from users.serializers import CustomUserDetailsSerializer 

class ReplySerializer(serializers.ModelSerializer):
    commenter = CustomUserDetailsSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'commenter', 'content', 'created_at']


class CommentSerializer(serializers.ModelSerializer):
    commenter = CustomUserDetailsSerializer(read_only=True)

    replies = ReplySerializer(many=True, read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'commenter', 'content', 'created_at', 'replies', 'parent']
        
        extra_kwargs = {'parent': {'write_only': True, 'required': False}}