from rest_framework import viewsets, status, filters
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from django.db import transaction
from django.core.files import File
from api.models import Proyecto, Fotos
from api.serializers import ProyectoSerializer, ProyectoReadSerializer
from rest_framework.decorators import action
from rest_framework.response import Response


class ProyectoViewSet(viewsets.ModelViewSet):
    queryset = Proyecto.objects.filter(activo=True).order_by('-id')

    filter_backends = (DjangoFilterBackend,
                       filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("id", "nombre", "tipo")
    search_fields = ("id", "nombre")
    ordering_fields = ("id", "nombre")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return ProyectoReadSerializer
        else:
            return ProyectoSerializer

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)

    @action(methods=['post'], detail=True)
    def guardar_imagen(self, request, *args, **kwargs):
        proyecto = self.get_object()
        imagen = request.FILES.get('imagen', None)

        with transaction.atomic():
            foto = Fotos.objects.create(
                proyecto=proyecto,
                foto=File(imagen)
            )
            return Response(status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)

    @action(methods=['put'], detail=True)
    def cerrar(self, request, *args, **kwargs):
        servicio = self.get_object()
        servicio.cerrado = True
        servicio.save()
        return Response(status=status.HTTP_200_OK)
