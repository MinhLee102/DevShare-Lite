from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    Custom User model that extends Django's AbstractUser.
    This allows for additional profile fields to be added directly to the user model.
    """

    username = models.CharField(max_length=100, unique=True)
    email = models.EmailField(unique=True)
    bio = models.CharField(max_length= 600)
    profile_image = models.ImageField(upload_to= 'profile_image', blank= True, null= True)

    def __str__(self):
        return self.username