from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from api.models import Fallecidos
from api.serializers import FallecidosSerializer


class FallecidosViewSet(viewsets.ModelViewSet):
    queryset = Fallecidos.objects.filter(activo=True)
    serializer_class = FallecidosSerializer

    filter_backends = (DjangoFilterBackend, filters.SearchFilter,
                       filters.OrderingFilter)
    filter_fields = ("id", "nombres", "apellidos", "dpi")
    search_fields = ("id", "nombres", "apellidos", "dpi")
    ordering_fields = ("id", "nombres", "apellidos", "dpi")

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
