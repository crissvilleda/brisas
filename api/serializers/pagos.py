from rest_framework import serializers
from api.models import Pago


class PagoReadSerializer(serializers.ModelSerializer):

    nombre_servicio = serializers.SerializerMethodField()

    class Meta:
        model = Pago
        fields = '__all__'

    def get_nombre_servicio(self, pago):
        return pago.servicio.get_tipo_display()


class PagoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = '__all__'
