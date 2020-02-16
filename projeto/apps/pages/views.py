from django.views import generic
from django.shortcuts import redirect,render

class IndexView(generic.TemplateView):
    template_name = 'pages/templates/index.html'
    def get(self,request):
        if(request.user.is_authenticated):
            return redirect('feed:home')
        else:
            return render(request,self.template_name)
