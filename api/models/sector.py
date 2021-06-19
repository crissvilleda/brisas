from django.db import models

from api.models import ModeloBase


class Sector(ModeloBase):
    nombre = models.CharField(max_length=250)
