from django.db import models
from django.conf import settings

class Chat(models.Model):
    status_one = models.IntegerField(default=0)
    status_two = models.IntegerField(default=0)
    user_one = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_one'
    )
    user_two = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name='user_two'
    )
    def get_messages(self):
        messages = Message.objects.filter(chat_id=self.id).order_by('-created_at')[:10:-1]
        return messages

class Message(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete = models.CASCADE
    )
    message = models.TextField()
    chat = models.ForeignKey(
        Chat,
        on_delete = models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
