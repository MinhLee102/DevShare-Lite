from django.db import models
from django.contrib.auth import get_user_model
from posts.models import Post
from utils.delete_user import deleted_user

User = get_user_model()

class comment(models.Model):
    commenter = models.ForeignKey(User, on_delete= models.SET(deleted_user), related_name= "comment")
    post = models.ForeignKey(Post, on_delete= models.CASCADE, related_name= "comment")
    parent = models.ForeignKey('self', null= True, blank= True, on_delete= models.CASCADE, related_name="reply")
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(auto_now= True)
    
    def __str__(self):
        if comment.commenter:
            return self.commenter.username
        else:
            return "anonymous"