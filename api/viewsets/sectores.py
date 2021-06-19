

from rest_framework import viewsets, status
from rest_framework.response import Response
from api.models import Sector
from api.serializers import SectorSerializer


class SectoresViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.filter(activo=True)
    serializer_class = SectorSerializer

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
