from api.models.detalle import Detalle
from rest_framework import serializers
from api.models import Proyecto
from django.db.models import Sum

class ProyectoReadSerializer(serializers.ModelSerializer):

    class Meta:
        model = Proyecto
        fields = '__all__'


class ProyectoSerializer(serializers.ModelSerializer):
    monto_neutro=serializers.SerializerMethodField()
    monto_egreso=serializers.SerializerMethodField()
    total_costo=serializers.SerializerMethodField()

    class Meta:
        model = Proyecto
        fields = '__all__'

    def get_monto_neutro(self, obj):        
        monto_neutro = obj.detalles.filter(tipo_detalle=Detalle.NEUTRO).aggregate(total=Sum('monto'))['total']
        return monto_neutro

    def get_monto_egreso(self, obj):        
        monto_egreso = obj.detalles.filter(tipo_detalle=Detalle.EGRESO).aggregate(total=Sum('monto'))['total']
        return monto_egreso

    def get_total_costo(self, obj):       
        total_costo = obj.detalles.filter(tipo_detalle__in=[Detalle.EGRESO, Detalle.NEUTRO]).aggregate(total=Sum('monto'))['total']
        return total_costo