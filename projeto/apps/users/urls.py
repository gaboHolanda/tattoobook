from django.urls import path
from .views import UpdateSetting, GetChats, ChooseInterests

app_name = 'users'

urlpatterns = [
    path('update-setting',UpdateSetting.as_view(),name='settings'),
    path('get-chats',GetChats.as_view(),name='get-chats'),
    path('interests',ChooseInterests.as_view(),name='interests')
]