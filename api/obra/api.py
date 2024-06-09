from .models import Obra, TipoObra, Tarea, TipoTarea, Reporte
from usuario.models import Usuario
from rest_framework import viewsets, permissions
from .serializers.obra_serializer import ObraSerializer, TipoObraSerializer
from .serializers.tarea_serializer import TareaSerializer, TipoTareaSerializer, ReporteSerializer

class ObraViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = ObraSerializer

    def get_serializer(self, *args, **kwargs):
        if kwargs.get('many', False):
            return super().get_serializer(*args, **kwargs)
        serializer = super().get_serializer(*args, **kwargs)
        if 'directorId' in serializer.fields:
            serializer.fields['directorId'].queryset = Usuario.objects.filter(tipoUsuarioId__nombre='Director de Obra')
        if 'usuarios' in serializer.fields:
            serializer.fields['usuarios'].queryset = Usuario.objects.filter(tipoUsuarioId__nombre__in=['Peón', 'Ayudante de albañil', 'Capataz de Obra'])
        return serializer

    def get_queryset(self):
        queryset = Obra.objects.all()
        tipo = self.request.query_params.get('type', None)
        value = self.request.query_params.get('value', None)

        if tipo is not None and value is not None:
            if tipo == 'director':
                queryset = queryset.filter(directorId__nombre__iexact=value)
            elif tipo == 'tipo':
                queryset = queryset.filter(tipoObraId__nombre__iexact=value)
            elif tipo == 'ubicacion':
                queryset = queryset.filter(ubicacion__iexact=value)
        return queryset

class TipoObraViewSet(viewsets.ModelViewSet):
    queryset = TipoObra.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TipoObraSerializer

class TareaViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TareaSerializer

    def get_serializer(self, *args, **kwargs):
        if kwargs.get('many', False):
            return super().get_serializer(*args, **kwargs)
        serializer = super().get_serializer(*args, **kwargs)
        if 'capatazId' in serializer.fields:
            serializer.fields['capatazId'].queryset = Usuario.objects.filter(tipoUsuarioId__nombre='Capataz de Obra')
        if 'usuarios' in serializer.fields:
            serializer.fields['usuarios'].queryset = Usuario.objects.filter(tipoUsuarioId__nombre__in=['Peón', 'Ayudante de albañil'])
        return serializer

    def get_queryset(self):
        queryset = Tarea.objects.all()
        tipo = self.request.query_params.get('type', None)
        value = self.request.query_params.get('value', None)

        if tipo is not None and value is not None:
            if tipo == 'obra':
                queryset = queryset.filter(obraId__nombre__icontains=value)
            elif tipo == 'capataz':
                queryset = queryset.filter(capatazId__nombre__icontains=value)
            elif tipo == 'director':
                queryset = queryset.filter(obraId__directorId__nombre__icontains=value)
            elif tipo == 'tipo':
                queryset = queryset.filter(tipoTareaId__nombre__icontains=value)
            elif tipo == 'status':
                queryset = queryset.filter(status__iexact=value)
        return queryset

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
