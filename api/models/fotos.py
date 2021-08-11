from django.db import models

from api.models import ModeloBase


class Fotos(ModeloBase):
    proyecto = models.ForeignKey(
        'api.Proyecto', on_delete=models.CASCADE, related_name='fotos')
    foto = models.ImageField(upload_to='proyectos/')
