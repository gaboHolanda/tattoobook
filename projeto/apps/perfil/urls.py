from django.urls import path
from .views import Show

app_name = 'perfil'

urlpatterns = [
    path('',Show.as_view(),name='show'),
]