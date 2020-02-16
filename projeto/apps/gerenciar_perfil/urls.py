from django.urls import path
from .views import Geral, Seguranca, Localizacao

app_name = 'gerenciar_perfil'

urlpatterns = [
    path('geral',Geral.as_view(),name='geral'),
    path('seguranca',Seguranca.as_view(),name='seguranca'),
    path('localizacao', Localizacao.as_view(),name='localizacao')

]