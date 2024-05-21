from rest_framework import serializers
from ..models import Obra, TipoObra
from usuario.models import Usuario


class ObraSerializer(serializers.ModelSerializer):
    tipoObraId = serializers.CharField(source='tipoObraId.nombre', read_only=True)
    tipoObra = serializers.CharField(write_only=True)
    usuarios = serializers.PrimaryKeyRelatedField(many=True, queryset=Usuario.objects.all())

    class Meta:
        model = Obra
        fields = '__all__'
        read_only_fields = ('fecha_registro', 'fecha_actualizacion')

    def validate_tipoObra(self, value):
        try:
            tipo_obra = TipoObra.objects.get(nombre=value)
        except TipoObra.DoesNotExist:
            raise serializers.ValidationError('Tipo de obra no válido.')
        return tipo_obra

    def create(self, validated_data):
        tipo_obra = validated_data.pop('tipoObra')
        usuarios_data = validated_data.pop('usuarios')
        obra = Obra.objects.create(tipoObraId=tipo_obra, **validated_data)
        obra.usuarios.set(usuarios_data)
        return obra
        
class TipoObraSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoObra
        fields = '__all__'