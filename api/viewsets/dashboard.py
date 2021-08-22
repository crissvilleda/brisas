
# rest_framework
from rest_framework import viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action

# django
from django.db.models import Sum, Q
from django.utils import timezone

# models
from api.models import Proyecto, Servicio, Pago, Detalle


class DashboardViewSet(viewsets.ViewSet):
    """
    Dashboard viewset
    """
    @action(detail=False, methods=['get'])
    def data_general(self, request):
        """
        Generar dashboard
        """
        data = {}
        proyecto_agua = {}
        proyecto_cementerio = {}
        servicio_agua = {}
        servicio_cementerio = {}
        proyectos = []
        servicios = []

        anio = timezone.now().year
        mes = timezone.now().month
        # obtener data de proyectos

        proyecto_agua['tipo'] = 'Agua'
        proyecto_cementerio['tipo'] = 'Cementerio'

        proyecto_agua['total_proyectos'] = Proyecto.objects.filter(
            activo=True, tipo=Proyecto.AGUA).count()

        proyecto_cementerio['total_proyectos'] = Proyecto.objects.filter(
            activo=True, tipo=Proyecto.CEMENTERIO).count()

        proyecto_agua['total_ingresos'] = Detalle.objects.filter(
            activo=True, tipo=Detalle.INGRESO).filter(proyecto__tipo=Proyecto.AGUA).aggregate(total=Sum('monto'))['total'] or 0

        proyecto_cementerio['total_ingresos'] = Detalle.objects.filter(
            activo=True, tipo=Detalle.INGRESO).filter(proyecto__tipo=Proyecto.CEMENTERIO).aggregate(total=Sum('monto'))['total'] or 0

        proyecto_agua['total_egresos'] = Detalle.objects.filter(activo=True, tipo=Detalle.EGRESO).filter(
            proyecto__tipo=Proyecto.AGUA).aggregate(total=Sum('monto'))['total'] or 0

        proyecto_cementerio['total_egresos'] = Detalle.objects.filter(activo=True, tipo=Detalle.EGRESO).filter(
            proyecto__tipo=Proyecto.CEMENTERIO).aggregate(total=Sum('monto'))['total'] or 0
        proyectos.append(proyecto_agua)
        proyectos.append(proyecto_cementerio)
        data['proyectos'] = proyectos

        # obtener data de servicios
        servicio_agua['tipo'] = 'Agua'
        servicio_cementerio['tipo'] = 'Cementerio'

        servicio_agua['total_ingresos'] = Pago.objects.filter(
            activo=True).filter(servicio__tipo=Servicio.AGUA).aggregate(total=Sum('pago'))['total'] or 0

        servicio_cementerio['total_ingresos'] = Pago.objects.filter(activo=True).filter(
            servicio__tipo=Servicio.CEMENTERIO).aggregate(total=Sum('pago'))['total'] or 0

        servicio_agua['insolventes'] = Servicio.objects.filter(activo=True, tipo=Servicio.AGUA).exclude(
            Q(pagos__mes__gte=mes, pagos__anio__gte=anio) | Q(mes__gte=mes, anio__gte=anio)).distinct().count()

        servicio_cementerio['insolventes'] = Servicio.objects.filter(activo=True, tipo=Servicio.CEMENTERIO).exclude(
            Q(pagos__mes__gte=mes, pagos__anio__gte=anio) | Q(mes__gte=mes, anio__gte=anio)).distinct().count()

        servicio_agua['solventes'] = Servicio.objects.filter(activo=True, tipo=Servicio.AGUA).filter(
            Q(pagos__mes__gte=mes, pagos__anio__gte=anio) | Q(mes__gte=mes, anio__gte=anio)).distinct().count()

        servicio_cementerio['solventes'] = Servicio.objects.filter(activo=True, tipo=Servicio.CEMENTERIO).filter(
            Q(pagos__mes__gte=mes, pagos__anio__gte=anio) | Q(mes__gte=mes, anio__gte=anio)).distinct().count()

        servicios.append(servicio_agua)
        servicios.append(servicio_cementerio)
        data['servicios'] = servicios

        return Response(data=data, status=status.HTTP_200_OK)
