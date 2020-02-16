import os
from django.db import models
from django.conf import settings

class Tag(models.Model):
    description = models.TextField()
    slug = models.SlugField()
    def posts(self):
        posts = Post.objects.filter(tags=self.id).order_by('-created_at')
        return posts

class Post(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL, 
        on_delete=models.CASCADE
    )
    tags = models.ManyToManyField(Tag)
    description = models.TextField()
    is_boosted = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    def get_images(self):
        images = PostImage.objects.filter(post_id=self.id).order_by('created_at')
        return images

    def get_tags(self):
        tags = self.tags.all().order_by('description')
        if(len(tags)==0):
            return None
        return tags

class PostImage(models.Model):
    path = models.ImageField(upload_to='posts/images')
    post = models.ForeignKey(
        Post,
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

