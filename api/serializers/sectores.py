from api.models import Sector

from rest_framework import serializers


class SectorSerializer(serializers.ModelSerializer):

    class Meta:
        model = Sector
        fields = '__all__'
