from django.contrib.auth import get_user_model

User = get_user_model()

def deleted_user():
    user, _ = User.objects.get_or_create(username="annonymous", defaults={
        "email": "none@gmail.com",
        "is_active": False,
    })
    return user

