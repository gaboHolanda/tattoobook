from django.shortcuts import render,redirect, get_object_or_404
from django.views import generic
from django.contrib.auth import logout
from apps.post.models import Post,Tag
from django.conf import settings
from django.http import JsonResponse,HttpResponseNotFound,HttpRequest
from django.db.models import QuerySet,Q
from django.contrib.auth.mixins import LoginRequiredMixin

class HomeView(LoginRequiredMixin,generic.TemplateView):
    template_name = 'feed/templates/home.html'
    def get(self,request):
        user = request.user
        if(user.user_type_id == 1):
            tags = Tag.objects.all().order_by('description')
            context = {
                'posts':user.posts,
                'tags':tags
            }
        else:
            posts = Post.objects.filter(tags__in=user.interests.all()).distinct().order_by('-created_at').order_by('-is_boosted')
            context = {
                'posts':posts
            }
            if user.interests.count() == 0:
                tags = Tag.objects.all().order_by('description')
                return render(request,'users/templates/interests.html',{'tags':tags})
        return render(request,self.template_name,context)
          
class LogOut(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        logout(request)
        return redirect('index')

class SearchFromTag(LoginRequiredMixin,generic.TemplateView):
    template_name = 'feed/templates/search-from-tag.html'
    def get(self,request,id,slug):
        tag = get_object_or_404(Tag,pk=id)
        if tag.slug==slug:
            posts = tag.posts()
            context = {
                'posts':posts
            }
            return render(request,self.template_name,context)
        else:
            return HttpResponseNotFound()
        


