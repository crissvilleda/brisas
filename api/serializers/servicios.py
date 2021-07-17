from django.utils import timezone
from api.models import Servicio, Pago

from rest_framework import serializers
from api.serializers import UsuarioReadSerializer


class ServicioSerializer(serializers.ModelSerializer):

    class Meta:
        model = Servicio
        fields = '__all__'


class ServicioReadSerializer(serializers.ModelSerializer):
    usuario = UsuarioReadSerializer()
    tipo_servicio = serializers.ReadOnlyField(source='get_tipo_display')
    solvente = serializers.SerializerMethodField()

    class Meta:
        model = Servicio
        fields = '__all__'

    def get_solvente(self, obj):
        anio = timezone.now().year
        mes = timezone.now().month
        query = Pago.objects.filter(servicio=obj, mes__gte=mes, anio__gte=anio)
        if query.exists():
            return True
        elif obj.mes >= mes and obj.anio >= anio:
            return True
        return False
