

from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from api.models import Sector
from api.serializers import SectorSerializer


class SectoresViewSet(viewsets.ModelViewSet):
    queryset = Sector.objects.filter(activo=True)
    serializer_class = SectorSerializer

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("id", "nombre")
    search_fields = ("id", "nombre")
    ordering_fields = ("id", "nombre")

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
