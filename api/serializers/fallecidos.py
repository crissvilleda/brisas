from rest_framework import serializers
from api.models import Fallecidos


class FallecidosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fallecidos
        fields = '__all__'
