
from api.serializers.servicios import ServicioReadSerializer
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response


from api.models import Servicio, Pago, Configuracion

from api.serializers import ServicioSerializer, ServicioReadSerializer, PagoReadSerializer

LISTA_MESES = [{'no': 1, 'nombre': 'enero', 'value': False},
               {'no': 2, 'nombre': 'febrero', 'value': False},
               {'no': 3, 'nombre': 'marzo', 'value': False},
               {'no': 4, 'nombre': 'abril', 'value': False},
               {'no': 5, 'nombre': 'mayo', 'value':  False},
               {'no': 6, 'nombre': 'junio', 'value': False},
               {'no': 7, 'nombre': 'julio', 'value': False},
               {'no': 8, 'nombre': 'agosto', 'value': False},
               {'no': 9, 'nombre': 'septiembre', 'value': False},
               {'no': 10, 'nombre': 'octubre', 'value': False},
               {'no': 11, 'nombre': 'noviembre', 'value':  False},
               {'no': 12, 'nombre': 'diciembre', 'value': False},
               ]


def change(item, mes):
    if item['no'] <= mes:
        item['value'] = True
    else:
        item['value'] = False
    return item


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
        import pdb
        pdb.set_trace()
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

    @action(methods=['get'], detail=True)
    def meses(self, request, *args, **kwargs):
        servicio = self.get_object()
        anio_consulta = request.query_params.get('anio', None)

        if anio_consulta is None:
            return Response(status=status.HTTP_400_BAD_REQUEST)

        pagos = Pago.objects.filter(servicio=servicio, anio=anio_consulta)

        # Se obtendrá también la cantidad de lo que se va a pagar para que el frontend sepa hacer los calculos y cobrar
        data = {}

        config = Configuracion.objects.all().last()

        if servicio.tipo == Servicio.AGUA:
            data['cuota'] = config.cuota_agua or 0
        else:
            data['cuota'] = config.cuota_cementerio or 0

        if not pagos.exists():
            anio = servicio.anio
            mes = servicio.mes

            if int(anio_consulta) < anio:
                data['meses'] = list(map(lambda x: change(x, 12), LISTA_MESES))
                return Response(data=data, status=status.HTTP_200_OK)
            elif int(anio_consulta) == anio:
                data['meses'] = list(
                    map(lambda x: change(x, mes), LISTA_MESES))
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                data['meses'] = list(
                    map(lambda x: change(x, 0), LISTA_MESES))
                return Response(data=data, status=status.HTTP_200_OK)

        pass

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
