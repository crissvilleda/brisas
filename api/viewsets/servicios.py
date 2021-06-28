
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from api.models import Servicio
from api.serializers import ServicioSerializer


class ServicioViewSet(viewsets.ModelViewSet):
    queryset = Servicio.objects.filter(activo=True)
    serializer_class = ServicioSerializer

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("id", "nombre", "tipo")
    search_fields = ("id", "nombre")
    ordering_fields = ("id", "nombre")

    def create(self, request, *args, **kwargs):
        usuario = request.data.get('usuario')
        request.data['usuario'] = usuario['id']
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        usuario = request.data.get('usuario')
        request.data['usuario'] = usuario['id']
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
