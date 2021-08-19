from api.models.detalle import Detalle
from rest_framework import serializers
from api.models import Proyecto
from django.db.models import Sum


class ProyectoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proyecto
        fields = (
            'nombre',
            'descripcion',
            'fecha_inicio',
            'fecha_fin',
            'tipo'
        )


class ProyectoReadSerializer (serializers.ModelSerializer):
    monto_neutro = serializers.SerializerMethodField()
    monto_egreso = serializers.SerializerMethodField()
    monto_ingreso = serializers.SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = '__all__'

    def get_monto_ingreso(self, obj):
        monto_ingreso = obj.detalles.filter(
            tipo=Detalle.INGRESO).aggregate(total=Sum('monto'))['total'] or 0
        return monto_ingreso

    def get_monto_neutro(self, obj):
        monto_neutro = obj.detalles.filter(
            tipo=Detalle.NEUTRO).aggregate(total=Sum('monto'))['total'] or 0
        return monto_neutro

    def get_monto_egreso(self, obj):
        monto_egreso = obj.detalles.filter(
            tipo=Detalle.EGRESO).aggregate(total=Sum('monto'))['total'] or 0
        return monto_egreso
