
from api.serializers.servicios import ServicioReadSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response


from api.models import Servicio, Pago

from api.serializers import ServicioSerializer, ServicioReadSerializer, PagoReadSerializer


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.filter(activo=True)
    serializer_class = ServicioSerializer

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("id", "usuario", "tipo")
    search_fields = ("id", "usuario__nombres", "usuario__apellidos")
    ordering_fields = ("id", "usuario")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ServicioReadSerializer
        else:
            return ServicioSerializer

    def create(self, request, *args, **kwargs):
        usuario = request.data.get('usuario')
        request.data['usuario'] = usuario['id']
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        usuario = request.data.get('usuario')
        request.data['usuario'] = usuario['id']
        return super().update(request, *args, **kwargs)

    @action(methods=['get'], detail=True)
    def historial(self, request, *args, **kwargs):
        servicio = self.get_object()
        queryset = Pago.objects.filter(servicio=servicio)

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = PagoReadSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = PagoReadSerializer(queryset, many=True)
        return Response(serializer.data)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)