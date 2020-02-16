from django.shortcuts import render
from django.shortcuts import render,redirect, get_object_or_404
from django.views import generic
from apps.users.models import CustomUser
from django.http import JsonResponse,HttpRequest
from django.contrib.auth.mixins import LoginRequiredMixin

class ListUsers(LoginRequiredMixin,generic.TemplateView):
    template_name = 'search/templates/list-users.html'
    def get(self,request):
        query = request.GET.get('q')
        if query:
            tatuadores = CustomUser.objects.filter(username__icontains=query,user_type=1)
        else:
            tatuadores = CustomUser.objects.filter(user_type=1).order_by('username')
        context = {
            'tatuadores':tatuadores,
        }
        if(HttpRequest.is_ajax(request)):
            all_users = []
            if(len(tatuadores)>0):
                for tatuador in tatuadores:
                    avatar = tatuador.setting.avatar.url if tatuador.setting.avatar else None
                    all_users.append({
                        'username':tatuador.username,
                        'name':tatuador.name,
                        'avatar':avatar
                    })
            return JsonResponse({'tatuadores':all_users},status=200)
        else:
            return render(request,self.template_name,context)
