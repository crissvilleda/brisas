
from rest_framework import serializers

from api.models import Fotos


class FotosSerializer(serializers.ModelSerializer):

    class Meta:
        model = Fotos
        fields = '__all__'
