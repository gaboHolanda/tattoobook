from django.shortcuts import render
from django.views import generic
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from apps.users.models import CustomUser
from .models import Chat, Message
from django.contrib.auth.mixins import LoginRequiredMixin

class CreateChat(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        if (request.user.user_type_id == 2):
            data = request.POST.copy()
            target_id = data.get('target_id')
            target_user = CustomUser.objects.get(pk=target_id)
            try:
                chat = Chat.objects.get(user_one_id=target_user.id,user_two_id=request.user.id)
                if(chat.status_two != 0):
                    return JsonResponse({},status=403)
                chat.status_two = 1
                chat.save()
                messages = []
                messages_objects = chat.get_messages()
                for message in messages_objects:
                    avatar = message.user.setting.avatar.url if message.user.setting.avatar else None
                    messages.append({
                        'message':message.message,
                        'user_id':message.user_id,
                        'avatar':avatar
                    })
                return JsonResponse({
                    'chat_id':chat.id,
                    'target_name':target_user.name,
                    'messages':messages,
                    'status':chat.status_two
                },status=200)
            except Chat.DoesNotExist:
                chat = Chat(status_two=1,user_one=target_user,user_two=request.user)
                chat.save()
                return JsonResponse({
                    'chat_id':chat.id,
                    'target_name':target_user.name
                },status=200)

class SendMessage(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        data = request.POST.copy()
        chat_id = data.get('chat_id')
        chat = Chat.objects.get(pk=chat_id)
        chat.status_one = 1
        chat.status_two = 1
        chat.save()
        user_id = request.user.id
        line = data.get('message')
        message = Message(chat_id=chat_id,user_id=user_id,message=line)
        message.save()
        return JsonResponse({},status=200)

class ChangeChatStatus(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        user = request.user
        data = request.POST.copy()
        new_status = data.get('status')
        chat_id = data.get('chat_id')
        chat = Chat.objects.get(pk=chat_id)
        if(user.id == chat.user_one_id):
            chat.status_one = new_status
        else:
            chat.status_two = new_status
        chat.save()
        return JsonResponse({},status=200)

class OpenChat(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        user = request.user
        data = request.POST.copy()
        chat_id = data.get('chat_id')
        chat = Chat.objects.get(pk=chat_id)
        if(user.user_type_id == 1):
            if(chat.user_one_id != user.id):
                return JsonResponse({},status=403)
        else:
            if(chat.user_two_id != user.id):
                return JsonResponse({},status=403)
        messages_objects = chat.get_messages()
        messages = []
        for message in messages_objects:
            avatar = message.user.setting.avatar.url if message.user.setting.avatar else None
            messages.append({
                'message':message.message,
                'user_id':message.user_id,
                'avatar':avatar
            })
        if user.user_type_id == 1:
            status = chat.status_one
            target_id = chat.user_two_id
        else:
            status = chat.status_two
            target_id = chat.user_one_id
        chat.save()
        target_name = CustomUser.objects.get(pk=target_id).name
        return JsonResponse({
            'target_id':target_id,
            'chat_id':chat.id,
            'target_name':target_name,
            'messages':messages,
            'status':status
        },status=200)

            
