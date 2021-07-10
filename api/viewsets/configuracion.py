from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response


from api.models import Configuracion
from api.serializers import ConfigSerializer


class ConfigViewSet(viewsets.ViewSet):

    @action(methods=['post'], detail=False)
    def actualizar(self, request, *args, **kwargs):
        data = request.data
        config = Configuracion.objects.all().last()

        if not config:
            serializer = ConfigSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)

        serializer = ConfigSerializer(instance=config, data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)

    @action(methods=['get'], detail=False)
    def leer(self, request, *args, **kwargs):
        config = Configuracion.objects.all().last()

        serializer = ConfigSerializer(config, partial=True)
        return Response(data=serializer.data, status=status.HTTP_200_OK)
