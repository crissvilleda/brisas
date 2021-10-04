from api.models.usuarios import Usuario
from django.db import models

from api.models import ModeloBase


class Servicio(ModeloBase):
    AGUA = 10
    CEMENTERIO = 20

    TIPOS_SERVICIOS = (
        (AGUA, 'Servicio Agua'),
        (CEMENTERIO, 'Servicio Cementerio')
    )

    usuario = models.ForeignKey(
        'api.Usuario', on_delete=models.CASCADE, related_name='servicios')

    tipo = models.IntegerField(choices=TIPOS_SERVICIOS)

    # Servira para aguardar en numero de perdio para los usuarios de cementerio
    no_predio = models.IntegerField(blank=True, null=True)

    anio = models.SmallIntegerField()
    mes = models.SmallIntegerField()
    descripcion = models.TextField(blank=True, null=True)
