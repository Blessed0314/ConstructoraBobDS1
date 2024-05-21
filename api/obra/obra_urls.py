from rest_framework import routers
from .api import ObraViewSet, TipoObraViewSet

router = routers.DefaultRouter()

router.register('obra', ObraViewSet, 'obra')
router.register('tipo_obra', TipoObraViewSet, 'tipo_obra')

urlpatterns = router.urls