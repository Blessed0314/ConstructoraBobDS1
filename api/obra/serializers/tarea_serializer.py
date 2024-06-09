from rest_framework import serializers
from ..models import Tarea, TipoTarea, Reporte
from usuario.models import Usuario

class TareaSerializer(serializers.ModelSerializer):
    capatazId = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.filter(tipoUsuarioId__nombre='Capataz de Obra'),
        many=False
    )
    usuarios = serializers.PrimaryKeyRelatedField(
        queryset=Usuario.objects.filter(tipoUsuarioId__nombre__in=['Peón', 'Ayudante de albañil']),
        many=True
    )

    class Meta:
        model = Tarea
        fields = '__all__'
        read_only_fields = ('fecha_registro', 'fecha_actualizacion')

class TipoTareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoTarea
        fields = '__all__'

class ReporteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reporte
        fields = '__all__'
        read_only_fields = ('fecha_registro', 'fecha_actualizacion')
        