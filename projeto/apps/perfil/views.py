from django.shortcuts import render
from django.views import generic
from django.shortcuts import redirect, get_object_or_404
from apps.users.models import CustomUser
from django.contrib.auth.mixins import LoginRequiredMixin

class Show(LoginRequiredMixin,generic.TemplateView):
    template_name = 'perfil/templates/show.html'
    def get(self,request,username):
        perfil = get_object_or_404(CustomUser,username=username)
        posts = perfil.posts()
        context = {
            'posts':posts,
            'perfil':perfil
        }
        return render(request,self.template_name,context)
