from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework.authtoken.views import obtain_auth_token
from django.conf.urls import url
from api import viewsets


router = DefaultRouter()
router.register(r'user', viewsets.UserViewset)
router.register(r'sector', viewsets.SectoresViewSet)
router.register(r'usuario', viewsets.UsuarioViewSet)
router.register(r'proyecto', viewsets.ProyectoViewSet)
router.register(r'servicio', viewsets.ServicioViewSet)
router.register(r'detalle', viewsets.DetalleViewSet)
router.register(r'config', viewsets.ConfigViewSet, basename='configuracion')
router.register(r'dashboard', viewsets.DashboardViewSet, basename='dashboard')
router.register(r'fallecido',viewsets.FallecidosViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    url(r"^api/token", obtain_auth_token, name="api-token"),
    path('api-auth/', include('rest_framework.urls')),
]
