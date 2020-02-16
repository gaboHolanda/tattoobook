from django import forms


class PostForm(forms.Form):
    description = forms.Textarea()
    images = forms.ImageField(widget=forms.ClearableFileInput(attrs={'multiple':True}))