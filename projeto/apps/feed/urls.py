from django.urls import path
from .views import HomeView, LogOut, SearchFromTag

app_name = 'feed'
urlpatterns = [
    path('',HomeView.as_view(),name='home'),
    path('logout/',LogOut.as_view(),name='logout'),
    path('tag/<int:id>/<slug:slug>',SearchFromTag.as_view(),name='posts.from.tag'),
]