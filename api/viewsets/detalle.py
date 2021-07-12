
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from api.models import Detalle
from api.serializers import DetalleSerializer, DetalleReadSerializer


class DetalleViewSet(viewsets.ModelViewSet):
    queryset = Detalle.objects.filter(activo=True).order_by('-id')
    serializer_class = DetalleSerializer

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("id", "tipo", "tipo_detalle", "descripcion")
    search_fields = ("id", "tipo", "tipo_detalle", "descripcion")
    ordering_fields = ("id", "tipo", "tipo_detalle", "descripcion")

    def get_queryset(self):
        queryset = super().get_queryset()
        if self.action in ['list']:
            idProyecto = self.request.GET.get('idProyecto', None)
            if idProyecto:
                return queryset.filter(proyecto_id=idProyecto)
            return queryset.none()

        return queryset



    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return DetalleReadSerializer
        else:
            return DetalleSerializer

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
