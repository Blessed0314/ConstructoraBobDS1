from rest_framework import routers
from usuario.api import UsuarioViewSet
from obra.api import ObraViewSet, TareaViewSet, ReporteViewSet

router = routers.DefaultRouter()
router.register(r'usuario', UsuarioViewSet, basename='usuario')
router.register(r'obra', ObraViewSet)
router.register(r'tarea', TareaViewSet)
router.register(r'reporte', ReporteViewSet)