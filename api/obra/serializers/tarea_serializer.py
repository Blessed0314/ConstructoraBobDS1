from rest_framework import serializers
from ..models import Tarea, TipoTarea, Reporte

class TareaSerializer(serializers.ModelSerializer):
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
        