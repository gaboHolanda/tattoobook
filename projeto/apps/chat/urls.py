from django.urls import path, include
from .views import CreateChat, SendMessage,ChangeChatStatus,OpenChat

app_name = 'chat'

urlpatterns = [
    path('create',CreateChat.as_view(),name='create'),
    path('sendmessage',SendMessage.as_view(),name='send'),
    path('change-chat-status',ChangeChatStatus.as_view(),name='change.chat.status'),
    path('open-chat',OpenChat.as_view(),name='open.chat')
]

