"""tattobook URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf.urls.static import static
from django.conf import settings
from django.urls import path, include
from apps.pages.views import IndexView
from apps.users.views import LoginView,RegisterView

urlpatterns = [
    path('',IndexView.as_view(),name='index'),
    path('login',LoginView.as_view(),name='login'),
    path('register',RegisterView.as_view(),name='register'),
    path('admin/', admin.site.urls),
    path('feed/',include('apps.feed.urls')),
    path('users/',include('apps.users.urls')),
    path('chat/',include('apps.chat.urls')),
    path('search/',include('apps.search.urls')),
    path('post/',include('apps.post.urls')),
    path('gerenciar/',include('apps.gerenciar_perfil.urls')),
    path('<str:username>/',include('apps.perfil.urls'))
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

