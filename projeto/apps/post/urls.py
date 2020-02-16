from django.urls import path
from .views import Create, Delete, Update,ListTags,ImpusionarPost
app_name = 'post'

urlpatterns = [
    path('create',Create.as_view(),name='create'),
    path('delete',Delete.as_view(),name='delete'),
    path('update',Update.as_view(),name='update'),
    path('list-tags',ListTags.as_view(),name='list-tags'),
    path('impulsionar',ImpusionarPost.as_view(), name='impulsionar')
]