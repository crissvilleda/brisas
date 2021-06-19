from api.models.usuarios import Usuario
from django.db import models

from api.models import ModeloBase


class Servicio(ModeloBase):
    AGUA = 10
    CEMENTERIO = 20
    usuario = models.ForeignKey(
        'api.Usuario', on_delete=models.CASCADE, related_name='servicios')
