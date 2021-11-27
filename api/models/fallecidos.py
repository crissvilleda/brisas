from django.db import models
from api.models import ModeloBase


class Fallecidos(ModeloBase):
    nombres = models.CharField(max_length=250)
    apellidos= models.CharField(max_length=250)
    dpi = models.CharField(max_length=13)
    fecha = models.DateField()
