from django.db import models

from api.models import ModeloBase


class Detalle(ModeloBase):

    INGRESO = 10
    EGRESO = 20
    NEUTRO = 30

    TIPOS_DETALLE = (
        (INGRESO, 'Ingreso'),
        (EGRESO, 'Egreso'),
        (NEUTRO, 'Neutro')
    )

    tipo = models.IntegerField(choices=TIPOS_DETALLE)

    descripcion = models.TextField()
    monto = models.FloatField()

    proyecto = models.ForeignKey(
        'api.Proyecto', on_delete=models.CASCADE, related_name='detalles', null=True)
