from api.models.servicios import Servicio
from api.models.usuarios import Usuario
from django.db import models

from api.models import ModeloBase


class Pago(ModeloBase):

    usuario = models.ForeignKey(
        'api.Usuario', on_delete=models.CASCADE, related_name='pagos')
    servicio = models.ForeignKey(
        'api.Servicio', on_delete=models.CASCADE, related_name='pagos')
    mes = models.PositiveSmallIntegerField()
    anio = models.PositiveSmallIntegerField()
    pago = models.FloatField()
