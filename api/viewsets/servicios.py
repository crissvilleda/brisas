
from api.serializers.servicios import ServicioReadSerializer
from django_filters.rest_framework import DjangoFilterBackend
from django.utils import timezone
from django.db.models import Q
from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
import copy


from api.models import Servicio, Pago, Configuracion

from api.serializers import ServicioSerializer, ServicioReadSerializer, PagoReadSerializer, PagoSerializer

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


def cambiar_por_servicio(item, mes):
    if item['no'] <= mes:
        item['value'] = True
    else:
        item['value'] = False
    return item


def cambiar_por_pagos(item, pagos):
    for pago in pagos:
        if item['no'] == pago.mes:
            item['value'] = True
        elif item['value'] is True:
            pass
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

    def list(self, request, *args, **kwargs):
        solvente = request.query_params.get('solvente', None)

        queryset = self.get_queryset()
        queryset = self.filter_queryset(queryset)

        anio = timezone.now().year
        mes = timezone.now().month

        if solvente is not None and solvente == '1':
            print('Solventes')
            queryset = queryset.filter(Q(pagos__mes__gte=mes, pagos__anio__gte=anio) | Q(
                mes__gte=mes, anio__gte=anio))
        elif solvente is not None and solvente == '2':
            print('Insolventes')
            queryset = queryset.exclude(Q(pagos__mes__gte=mes, pagos__anio__gte=anio) | Q(
                mes__gte=mes, anio__gte=anio))

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = ServicioReadSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)

        serializer = ServicioReadSerializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=['get'], detail=True)
    def historial(self, request, *args, **kwargs):
        servicio = self.get_object()
        queryset = Pago.objects.filter(servicio=servicio).order_by('-id')

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

        anio = servicio.anio
        mes = servicio.mes

        COPY_MESES = copy.deepcopy(LISTA_MESES)
        if not pagos.exists():

            if int(anio_consulta) < anio:
                data['meses'] = list(
                    map(lambda x: cambiar_por_servicio(x, 12), COPY_MESES))
                return Response(data=data, status=status.HTTP_200_OK)
            elif int(anio_consulta) == anio:
                data['meses'] = list(
                    map(lambda x: cambiar_por_servicio(x, mes), COPY_MESES))
                return Response(data=data, status=status.HTTP_200_OK)
            else:
                data['meses'] = list(
                    map(lambda x: cambiar_por_servicio(x, 0), COPY_MESES))
                return Response(data=data, status=status.HTTP_200_OK)

        elif anio == int(anio_consulta):
            data['meses'] = list(
                map(lambda x: cambiar_por_servicio(x, mes), COPY_MESES))
            data['meses'] = list(
                map(lambda x: cambiar_por_pagos(x, pagos), data['meses']))
            return Response(data=data, status=status.HTTP_200_OK)
        else:
            data['meses'] = list(
                map(lambda x: cambiar_por_pagos(x, pagos), COPY_MESES))
            return Response(data=data, status=status.HTTP_200_OK)

    @action(methods=['post'], detail=True)
    def pago(self, request, *args, **kwargs):
        servicio = self.get_object()
        meses = request.data.get('meses', 0)
        ultimo_pago = Pago.objects.filter(servicio=servicio).last()

        config = Configuracion.objects.all().last()

        cuota = config.cuota_agua
        if servicio.tipo == Servicio.CEMENTERIO:
            cuota = config.cuota_cementerio

        if ultimo_pago is None:
            anio = servicio.anio
            mes = servicio.mes + 1
            while(meses > 0):
                data = {}
                if mes < 12 and mes > 0:
                    data['usuario'] = servicio.usuario.id
                    data['servicio'] = servicio.id
                    data['mes'] = mes
                    data['anio'] = anio
                    data['pago'] = cuota
                    serializer = PagoSerializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                elif mes == 12:
                    data['usuario'] = servicio.usuario.id
                    data['servicio'] = servicio.id
                    data['mes'] = mes
                    data['anio'] = anio
                    data['pago'] = cuota
                    serializer = PagoSerializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    anio += 1
                    mes = 0

                mes += 1
                meses -= 1
            return Response(status=status.HTTP_200_OK)

        else:
            anio = ultimo_pago.anio
            mes = ultimo_pago.mes + 1
            while(meses > 0):
                data = {}
                if mes < 12 and mes > 0:
                    data['usuario'] = servicio.usuario.id
                    data['servicio'] = servicio.id
                    data['mes'] = mes
                    data['anio'] = anio
                    data['pago'] = cuota
                    serializer = PagoSerializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                elif mes == 12:
                    data['usuario'] = servicio.usuario.id
                    data['servicio'] = servicio.id
                    data['mes'] = mes
                    data['anio'] = anio
                    data['pago'] = cuota
                    serializer = PagoSerializer(data=data)
                    serializer.is_valid(raise_exception=True)
                    serializer.save()
                    anio += 1
                    mes = 0

                mes += 1
                meses -= 1
            return Response(status=status.HTTP_200_OK)

    def destroy(self, request, *args, **kwargs):
        return Response(status=status.HTTP_405_METHOD_NOT_ALLOWED)
