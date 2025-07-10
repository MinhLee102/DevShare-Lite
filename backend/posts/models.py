from django.db import models
from django.contrib.auth import get_user_model
from utils.delete_user import deleted_user

User = get_user_model()

class Tag(models.Model):
    name = models.CharField(max_length= 150, unique= True)

    def __str__(self):
        return self.name

class Post(models.Model):

    class PostStatus(models.TextChoices):
        DRAFT = 'DR', 'Draft'
        PUBLISHED = 'PB', 'Published'


    title = models.CharField(max_length= 300)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete= models.SET(deleted_user), related_name= "post")
    tags = models.ManyToManyField(Tag, related_name= "post", blank= True)
    created_at = models.DateTimeField(auto_now_add= True)
    updated_at = models.DateTimeField(auto_now= True)

    status = models.CharField(
        max_length=2,
        choices=PostStatus.choices,
        default=PostStatus.DRAFT, 
    )

    def __str__(self):
        return self.title
    



