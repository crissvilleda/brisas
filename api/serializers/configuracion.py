from rest_framework import serializers
from api.models import Configuracion


class ConfigSerializer(serializers.ModelSerializer):

    class Meta:
        model = Configuracion
        fields = '__all__'
