from django import forms
from .models import CustomUser

class UserForm(forms.Form):
    name = forms.CharField(max_length=64)
    email = forms.EmailField()
    password = forms.CharField(max_length=32,widget= forms.PasswordInput())
    password_confirm = forms.CharField(max_length=32,widget= forms.PasswordInput())
    username = forms.CharField(max_length=32)
    errors_list = {}
    def clean_email(self):
        email = self.cleaned_data['email']
        if CustomUser.objects.filter(email=email).exists():
            self.errors_list.update(error_email = 'Email já cadastrado')
            raise forms.ValidationError('Email já cadastrado')
        return email

    def clean_username(self):
        username = self.cleaned_data['username']
        if CustomUser.objects.filter(username=username).exists():
            self.errors_list.update(error_username = 'Nome de usuário já cadastrado')
            raise forms.ValidationError('Nome de usuário já cadastrado')
        return username

    def clean(self):
        form_data = self.cleaned_data
        if form_data['password'] != form_data['password_confirm']:
            self.errors_list.update(error_password = 'As senhas não combinam')
            raise forms.ValidationError('As senhas não combinam')
        return form_data
