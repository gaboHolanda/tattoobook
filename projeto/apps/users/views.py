import os
from django.views import generic
from django.shortcuts import redirect, render
from django.core.files.storage import FileSystemStorage
from django.http import JsonResponse
from django.contrib.auth.hashers import make_password, check_password
from django.contrib.auth import login, logout
from .forms import UserForm
from .models import CustomUser, Setting
from .helpers import is_email, random_string
from django.contrib.auth.mixins import LoginRequiredMixin
from django.http import HttpResponseRedirect


class LoginView(generic.TemplateView):
    template_name = 'users/templates/login.html'
    def post(self,request):
        data = request.POST.copy()
        username = data.get('username')
        if is_email(username):
            try:
                user = CustomUser.objects.get(email=username)
            except CustomUser.DoesNotExist:
                return render(request,self.template_name,{'error':'Há algum erro com suas credenciais.'})
        else:
            try:
                user = CustomUser.objects.get(username=username)
            except CustomUser.DoesNotExist:
                return render(request,self.template_name,{'error':'Há algum erro com suas credenciais.'})
        password = data.get('password')
        if(check_password(password,user.password)):
            login(request,user)
            next_url = request.GET.get('next')
            if next_url:
                return HttpResponseRedirect(next_url)
            else:
                return redirect('feed:home')
        else:
            return render(request,self.template_name,{'error':'Há algum erro com suas credenciais.'})
    
class RegisterView(generic.TemplateView):
    template_name = 'users/templates/register.html'
    def post(self,request):
        user_form = UserForm(request.POST)
        data = request.POST.copy()
        name = data.get('name')
        email = data.get('email')
        username = data.get('username').lower().replace(' ','')
        if user_form.is_valid():
            password = make_password(data.get('password'))
            setting = Setting()
            setting.save()
            user = CustomUser(username=username,name=name,email=email,password=password,setting=setting,user_type_id=data.get('user-type'))
            user.save()
            login(request,user)
            return redirect('index')
        else:
            context = {
                'old_email':email,
                'old_username':username,
                'old_name':name
            }
            context.update(user_form.errors_list)
            return render(request,self.template_name,context)

class UpdateSetting(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        setting = request.user.setting
        try:
            avatar = request.FILES['avatar']
            location = 'users/avatars/'
            file_name, file_extension = os.path.splitext(avatar.name)
            file_name = random_string(32) + file_extension
            fs = FileSystemStorage(location='media/'+location)
            fs.save(file_name,avatar)
            setting.avatar = location + file_name
        except Exception as e:
            print(e)
            pass

        try:
            cover = request.FILES['cover']
            location = 'users/covers/'
            file_name, file_extension = os.path.splitext(cover.name)
            file_name = random_string(32) + file_extension
            fs = FileSystemStorage(location='media/'+location)
            fs.save(file_name,cover)
            setting.cover = location + file_name
        except Exception as e:
            print(e)
            pass

        setting.save()
        return JsonResponse({},status=200)

class ChooseInterests(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        user = request.user
        data = request.POST.copy()
        tags_chosen = data.getlist('tags')
        print(tags_chosen)
        if(tags_chosen):
            for tag in tags_chosen:
                user.interests.add(tag)
        return redirect('feed:home')

class GetChats(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        user = request.user
        chats_object = user.chats()
        chats = []
        for chat in chats_object:
            target_id = chat.user_two_id if user.id == chat.user_one_id else chat.user_one_id
            if(target_id == user.id):
                target_name = user.name
            else:
                target_name = CustomUser.objects.get(pk=target_id).name
            messages_objects = chat.get_messages()
            messages = []
            for message in messages_objects:
                avatar = message.user.setting.avatar.url if message.user.setting.avatar else None
                messages.append({
                    'message':message.message,
                    'user_id':message.user_id,
                    'avatar':avatar
                })
            status = chat.status_one if user.user_type_id == 1 else  chat.status_two
            chats.append({
                'target_id':target_id,
                'chat_id':chat.id,
                'target_name':target_name,
                'messages':messages,
                'status':status
            })

        return JsonResponse({'chats':chats},status=200)


        