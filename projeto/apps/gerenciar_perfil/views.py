from django.shortcuts import render
from django.shortcuts import render,redirect, get_object_or_404
from django.contrib import messages
from django.contrib.auth import update_session_auth_hash
from django.contrib.auth.hashers import make_password, check_password
from django.views import generic
from apps.users.models import CustomUser
from django.http import JsonResponse,HttpRequest
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import GeralForm

class Geral(LoginRequiredMixin,generic.TemplateView):
    template_name = 'gerenciar_perfil/templates/geral.html'
    def get(self,request):
        return render(request,self.template_name)
    def post(self,request):
        data = request.POST.copy()
        geral_form = GeralForm(data)
        name = data.get('name')
        username = data.get('username')
        email = data.get('email')
        if geral_form.is_valid():
            user = request.user
            if name != user.name:
                user.name = name
                messages.add_message(request, messages.SUCCESS, 'Nome atualizado com sucesso')
            if username != user.username:
                if CustomUser.objects.filter(username=username).exists():
                    messages.add_message(request, messages.ERROR, 'Username já existe')
                else:
                    messages.add_message(request, messages.SUCCESS, 'Username atualizado com sucesso')
                    user.username = username
            if email != user.email:
                if CustomUser.objects.filter(email=email).exists():
                    messages.add_message(request, messages.ERROR, 'Email já existe')
                else:
                    messages.add_message(request, messages.SUCCESS, 'Email atualizado com sucesso')
                    user.email = email
            user.save()
            return render(request,self.template_name)
        else:
            context = {
                'old_name':name,
                'old_username':username,
                'old_email':email
            }
            context.update(geral_form.errors_list)
            return render(request,self.template_name,context)

class Seguranca(LoginRequiredMixin,generic.TemplateView):
    template_name = 'gerenciar_perfil/templates/seguranca.html'
    def get(self,request):
        return render(request,self.template_name)
    def post(self,request):
        data = request.POST.copy()
        old_password = data.get('old_password')
        password = data.get('password')
        password_confirm = data.get('password_confirm')
        user = request.user
        context = {}
        if check_password(old_password,user.password):
            if password == password_confirm:
                user.password = make_password(password)
                user.save()
                update_session_auth_hash(request,user)
                context.update(success_message = 'Senha alterada com sucesso')
            else:
                context.update(error_password = 'As senhas não combinam')
        else:
            context.update(error_old_password = 'Senha atual incorreta')
        return render(request,self.template_name,context)
        

        
class Localizacao(LoginRequiredMixin,generic.TemplateView):
    template_name = 'gerenciar_perfil/templates/localizacao.html'
    def get(self,request):
        return render(request,self.template_name)
        