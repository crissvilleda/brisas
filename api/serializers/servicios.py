from api.models import Servicio

from rest_framework import serializers
from api.serializers import UsuarioReadSerializer


class ServicioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Servicio
        fields = '__all__'


class ServicioReadSerializer(serializers.ModelSerializer):
    usuario = UsuarioReadSerializer()

    class Meta:
        model = Servicio
        fields = '__all__'
