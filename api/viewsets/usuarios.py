

from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from api.models import Usuario
from api.serializers import UsuarioSerializer, UsuarioReadSerializer


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = Usuario.objects.filter(activo=True)
    serializer_class = UsuarioSerializer

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("id", "nombres", "apellidos", "sector")
    search_fields = ("id", "nombres", "apellidos")
    ordering_fields = ("id", "nombres")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UsuarioReadSerializer
        else:
            return UsuarioSerializer

    def create(self, request, *args, **kwargs):
        sector = request.data.get('sector')
        request.data['sector'] = sector['id']
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        sector = request.data.get('sector')
        request.data['sector'] = sector['id']
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
