from rest_framework import serializers
from ..models import Obra, TipoObra

class ObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Obra
        fields = '__all__'
        read_only_fields = ('fecha_registro', 'fecha_actualizacion')
        
class TipoObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoObra
        fields = '__all__'