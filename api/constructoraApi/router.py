from rest_framework import routers
from usuario.api import UsuarioViewSet, LoginViewSet, TipoUsuarioViewSet, TipoIdentificacionViewSet
from obra.api import ObraViewSet, TareaViewSet, ReporteViewSet, TipoObraViewSet, TipoTareaViewSet

router = routers.DefaultRouter()
router.register(r'login', LoginViewSet, basename='login')

router.register(r'usuario', UsuarioViewSet, basename='usuario')
router.register(r'tipo_usuario', TipoUsuarioViewSet, basename='tipo_usuario')
router.register(r'tipo_identificacion', TipoIdentificacionViewSet, basename='tipo_identificacion')

router.register(r'obra', ObraViewSet, basename='obra')
router.register(r'tipo_obra', TipoObraViewSet, basename='tipo_obra')

router.register(r'tarea', TareaViewSet, basename='tarea')
router.register(r'tipo_tarea', TipoTareaViewSet, basename='tipo_tarea')

router.register(r'reporte', ReporteViewSet)