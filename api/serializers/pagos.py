from rest_framework import serializers
from api.models import Pago


class PagoReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = '__all__'


class PagoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pago
        fields = '__all__'
