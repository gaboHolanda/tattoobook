import os
from django.shortcuts import redirect
from django.http import JsonResponse
from django.views import generic
from django.core.files.storage import FileSystemStorage
from django.conf import settings
from .forms import PostForm
from .models import Post,PostImage,Tag
from .helpers import random_string
from django.contrib.auth.mixins import LoginRequiredMixin

class Create(LoginRequiredMixin,generic.edit.FormView):
    form_class = PostForm
    def post(self,request):
        form_class = self.get_form_class()
        form = self.get_form(form_class)
        files = request.FILES.getlist('images')
        if(form.is_valid()):
            location = 'posts/images/'
            data = request.POST.copy()
            post = Post(description=data.get('description'),user=request.user)
            tags_list = data.getlist('tags')
            post.save()
            for tag in tags_list:
                post.tags.add(tag)
            for file in files:
                file_name, file_extension = os.path.splitext(file.name)
                file_name = random_string(32) + file_extension
                fs = FileSystemStorage(location='media/'+location)
                fs.save(file_name,file)
                PostImage(path=location+file_name,post=post).save()
        return redirect('feed:home')

class Delete(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        try:
            data = request.POST.copy()
            post_id = data.get('post_id')
            post = Post.objects.get(pk=post_id)
            if(request.user.id == post.user.id):
                images = post.get_images()
                for image in images:
                    full_path = os.path.join(settings.BASE_DIR,image.path.url.strip('/'))
                    try:
                        os.remove(full_path)
                    except:
                        pass
                post.delete()
                return JsonResponse({},status=200)
            else:
                raise Exception()
        except:
            return JsonResponse({},status=500)

class Update(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        try:
            data = request.POST.copy()
            post_id = data.get('post_id')
            description = data.get('description')
            post = Post.objects.get(pk=post_id)
            if(request.user.id == post.user.id):
                post.tags.clear()
                post.description = description
                post.save()
                tags_list = data.getlist('tags')
                deleted_old_images = data.getlist('deleted_old_images')
                files = request.FILES.getlist('images')
                location = 'posts/images/'
                images = []
                for deleted_image in deleted_old_images:
                    image = PostImage.objects.get(pk=deleted_image)
                    full_path = os.path.join(settings.BASE_DIR,image.path.url.strip('/'))
                    try:
                        os.remove(full_path)
                    except:
                        pass
                    image.delete()
                    
                for file in files:
                    file_name, file_extension = os.path.splitext(file.name)
                    file_name = random_string(32) + file_extension
                    fs = FileSystemStorage(location='media/'+location)
                    fs.save(file_name,file)
                    new_image = PostImage(path=location+file_name,post=post)
                    new_image.save()
                    images.append({
                        'path':new_image.path.url,
                        'id':new_image.id
                    })

                for tag in tags_list:
                    post.tags.add(tag)

                return JsonResponse({
                    'images':images
                },status=200)
            else:
                raise Exception()
        except:
            return JsonResponse({},status=500)

class ListTags(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        if(request.user.user_type_id == 1):
            tags = Tag.objects.all().order_by('description')
            all_tags = []
            for tag in tags:
                all_tags.append({
                    'slug': tag.slug,
                    'id': tag.id,
                    'description': tag.description
                })
            return JsonResponse({'tags':all_tags},status=200)


class ImpusionarPost(LoginRequiredMixin,generic.TemplateView):
    def post(self,request):
        # try:
        data = request.POST.copy()
        post_id = data.get('post_id')
        post = Post.objects.get(pk=post_id)
        post.is_boosted = not post.is_boosted
        post.save()
        return JsonResponse({'is_boosted':post.is_boosted},status=200)
            # else:
            #     raise Exception()
        # except:
        #     return JsonResponse({},status=500)