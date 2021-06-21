from django.db import models

from api.models import ModeloBase


class Usuario(ModeloBase):
    nombres = models.CharField(max_length=250)
    apellidos = models.CharField(max_length=250)
    dpi = models.CharField(max_length=13, unique=True)
    foto = models.ImageField(upload_to='Avatar', null=True, blank=True)
    telefono = models.CharField(max_length=15, blank=True, null=True)
    sector = models.ForeignKey(
        'api.Sector', on_delete=models.CASCADE, related_name='usuarios')
