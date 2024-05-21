from rest_framework import routers
from .api import ObraViewSet, TipoObraViewSet, TareaViewSet, TipoTareaViewSet, ReporteViewSet

router = routers.DefaultRouter()

router.register('obra', ObraViewSet, 'obra')
router.register('tipo_obra', TipoObraViewSet, 'tipo_obra')
router.register('tarea', TareaViewSet, 'tarea')
router.register('tipo_tarea', TipoTareaViewSet, 'tipo_tarea')
router.register('reporte', ReporteViewSet, 'reporte')

urlpatterns = router.urls