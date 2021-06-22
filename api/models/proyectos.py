from django.db import models
from api.models import ModeloBase


class Proyecto(ModeloBase):

    AGUA = 10
    CEMENTERIO = 20
    OTROS = 30

    TIPOS_PROYECTO = ((AGUA, 'Proyecto de agua'),
                      (CEMENTERIO, 'Proyecto de cementerio'),
                      (OTROS, 'Otros proyectos'))

    nombre = models.CharField(max_length=250)
    descripcion = models.TextField()
    costo = models.FloatField()
    fecha_inicio = models.DateField()
    fecha_fin = models.DateField()
    tipo = models.IntegerField(choices=TIPOS_PROYECTO, default=OTROS)
