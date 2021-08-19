from api.models import Detalle, Proyecto

from rest_framework import serializers


class ProyectoReadSerializer (serializers.ModelSerializer):
    class Meta:
        model = Proyecto
        fields = (
            'nombre',
            'tipo',
            'id',
        )


class DetalleSerializer(serializers.ModelSerializer):
    tipo_proyecto = serializers.SerializerMethodField()

    def get_tipo_proyecto(self, obj):
        return obj.proyecto.tipo

    class Meta:
        model = Detalle
        fields = '__all__'


class DetalleReadSerializer(serializers.ModelSerializer):
    proyecto = ProyectoReadSerializer()

    class Meta:
        model = Detalle
        fields = '__all__'
