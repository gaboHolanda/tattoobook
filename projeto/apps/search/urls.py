from django.urls import path
from .views import ListUsers

app_name = 'search'

urlpatterns = [
    path('',ListUsers.as_view(),name='list.users'),
]