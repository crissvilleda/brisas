from django.db import models
from api.models import ModeloBase


class Configuracion(ModeloBase):
    cuota_agua = models.FloatField(default=0)
    cuota_cementerio = models.FloatField(default=0)
