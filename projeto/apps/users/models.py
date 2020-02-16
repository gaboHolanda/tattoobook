from django.contrib.auth.models import AbstractUser
from django.db import models
from apps.post.models import Post, Tag
from apps.chat.models import Chat
from apps.gerenciar_perfil.models import Endereço

class UserType(models.Model):
    description = models.CharField(max_length=32)


class Setting(models.Model):
    avatar = models.ImageField(upload_to='users/avatars',null=True)
    cover = models.ImageField(upload_to='users/covers',null=True)

class CustomUser(AbstractUser):
    pass
    user_type = models.ForeignKey(
        UserType,
        on_delete=models.CASCADE
    )
    setting = models.OneToOneField(
        Setting,
        on_delete=models.CASCADE
    )
    interests = models.ManyToManyField(Tag)
    last_name = None
    first_name = None
    name = models.CharField(max_length=64)
    email = models.EmailField(unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []
    def posts(self):
        posts = Post.objects.filter(user_id=self.id).order_by('-created_at').order_by('-is_boosted')
        return posts
    def chats(self):
        if(self.user_type_id == 1):
            chats = Chat.objects.filter(user_one_id=self.id).exclude(status_one=0)
        else:
            chats = Chat.objects.filter(user_two_id=self.id).exclude(status_two=0)
        return chats
    def endereços(self):
        endereços = Endereço.objects.filter(user_id=self.id)
