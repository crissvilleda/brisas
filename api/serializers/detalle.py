from api.models import Detalle

from rest_framework import serializers
from api.serializers import UsuarioReadSerializer


class DetalleSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detalle
        fields = '__all__'


class DetalleReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Detalle
        fields = '__all__'
