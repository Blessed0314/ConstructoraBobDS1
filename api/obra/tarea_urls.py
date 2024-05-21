from rest_framework import routers
from .api import TareaViewSet, TipoTareaViewSet, ReporteViewSet

router = routers.DefaultRouter()


router.register('tarea', TareaViewSet, 'tarea')
router.register('tipo_tarea', TipoTareaViewSet, 'tipo_tarea')
router.register('reporte', ReporteViewSet, 'reporte')

urlpatterns = router.urls