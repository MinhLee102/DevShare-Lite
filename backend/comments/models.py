from django.db import models
from django.contrib.auth import get_user_model
from posts.models import Post
from utils.delete_user import deleted_user

User = get_user_model()

class Comment(models.Model):
    commenter = models.ForeignKey(User, on_delete= models.SET(deleted_user), related_name= "comments")
    post = models.ForeignKey(Post, on_delete= models.CASCADE, related_name= "comments")
    parent = models.ForeignKey('self', null= True, blank= True, on_delete= models.CASCADE, related_name="replies")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(auto_now= True)

    class Meta: 
        ordering = ['created_at']
    
    def __str__(self):
        if Comment.commenter:
            return self.commenter.username
        else:
            return "anonymous"