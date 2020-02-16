from django import forms
from apps.users.models import CustomUser

class GeralForm(forms.Form):
    name = forms.CharField(max_length=64)
    username = forms.CharField(max_length=32)
    email = forms.EmailField()
    errors_list = {}
    # def clean_email(self):
    #     email = self.cleaned_data['email']
    #     if CustomUser.objects.get(email=email).exists():
    #         self.errors_list.update(error_email = 'Email já cadastrado')
    #         raise forms.ValidationError('Email já cadastrado')
    #     return email
    #
    # def clean_username(self):
    #     username = self.cleaned_data['username']
    #     if CustomUser.objects.get(username=username).exists():
    #         self.errors_list.update(error_username = 'Nome de usuário já cadastrado')
    #         raise forms.ValidationError('Nome de usuário já cadastrado')
    #     return username
