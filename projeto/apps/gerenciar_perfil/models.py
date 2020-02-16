import os
from django.db import models
from django.conf import settings

# Create your models here.

class Endereço(models.Model):
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    Cep = models.CharField(max_length=8)
    Pais = models.CharField(max_length=50)
    Estado = models.CharField(max_length=50)
    Cidade = models.CharField(max_length=50)
    Bairro = models.CharField(max_length=50)
    Rua = models.CharField(max_length=300)
    Numero = models.IntegerField()
    Complemento = models.CharField(max_length=400)