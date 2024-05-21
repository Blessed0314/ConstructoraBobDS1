from .models import Obra, TipoObra, Tarea, TipoTarea, Reporte
from rest_framework import viewsets, permissions
from .serializers.obra_serializer import ObraSerializer, TipoObraSerializer
from .serializers.tarea_serializer import TareaSerializer, TipoTareaSerializer, ReporteSerializer

class ObraViewSet(viewsets.ModelViewSet):
    queryset = Obra.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ObraSerializer

class TipoObraViewSet(viewsets.ModelViewSet):
    queryset = TipoObra.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TipoObraSerializer

class TareaViewSet(viewsets.ModelViewSet):
    queryset = Tarea.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TareaSerializer

class TipoTareaViewSet(viewsets.ModelViewSet):
    queryset = TipoTarea.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TipoTareaSerializer

class ReporteViewSet(viewsets.ModelViewSet):
    queryset = Reporte.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ReporteSerializer
