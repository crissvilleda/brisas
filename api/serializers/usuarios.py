from api.models import Usuario

from rest_framework import serializers
from api.serializers import SectorSerializer


class UsuarioReadSerializer(serializers.ModelSerializer):

    sector = SectorSerializer()

    class Meta:
        model = Usuario
        fields = '__all__'


class UsuarioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Usuario
        fields = '__all__'
