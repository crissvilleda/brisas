from django.db import models

from api.models import ModeloBase


class Detalle(ModeloBase):
    AGUA = 10
    CEMENTERIO = 20

    TIPOS_SERVICIOS = (
        (AGUA, 'Servicio Agua'),
        (CEMENTERIO, 'Servicio Cementerio')
    )

    INGRESO = 10
    EGRESO = 20
    NEUTRO = 30

    TIPOS_DETALLE = (
        (INGRESO, 'Ingreso'),
        (EGRESO, 'Egreso'),
        (NEUTRO, 'Neutro')
    )

    tipo = models.IntegerField(choices=TIPOS_SERVICIOS)
    tipo_detalle = models.IntegerField(choices=TIPOS_DETALLE)

    descripcion = models.TextField()
    monto = models.FloatField()
    cerrado = models.BooleanField(default=False)

    proyecto = models.ForeignKey(
        'api.Proyecto', on_delete=models.CASCADE, related_name='detalles', null=True)
