from rest_framework import routers
from usuario.api import UsuarioViewSet, LoginViewSet
from obra.api import ObraViewSet, TareaViewSet, ReporteViewSet

router = routers.DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')
router.register(r'usuario', UsuarioViewSet, basename='usuario')
router.register(r'obra', ObraViewSet, basename='obra')
router.register(r'tarea', TareaViewSet, basename='tarea')
router.register(r'reporte', ReporteViewSet)