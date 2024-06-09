from usuario.models import Usuario, TipoIdentificacion, TipoUsuario
from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .serializers.usuario_serializers import UsuarioSerializer, TipoIdentificacionSerializer, TipoUsuarioSerializer
from .serializers.login_serializer import LoginSerializer
from django.db.models import Q

class UsuarioViewSet(viewsets.ModelViewSet):
    def get_queryset(self):
        queryset = Usuario.objects.all()
        tipo_usuario = self.request.query_params.get('type', None)
        if tipo_usuario is not None:
            tipo_usuario = tipo_usuario.lower()
            if tipo_usuario == 'obrero':
                queryset = queryset.filter(Q(tipoUsuarioId__nombre__icontains='ayudante de albañil') | Q(tipoUsuarioId__nombre__icontains='peón'))
            else:
                queryset = queryset.filter(tipoUsuarioId__nombre__icontains=tipo_usuario)
        return queryset
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = UsuarioSerializer

class TipoIdentificacionViewSet(viewsets.ModelViewSet):
    queryset = TipoIdentificacion.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TipoIdentificacionSerializer

class TipoUsuarioViewSet(viewsets.ModelViewSet):
    queryset = TipoUsuario.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = TipoUsuarioSerializer

class LoginViewSet(viewsets.ViewSet):
    permission_classes = [
        permissions.AllowAny
    ]

    def create(self, request):
        serializer = LoginSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            'status': status.HTTP_200_OK,
            'message': 'Login exitoso.',
            'data': {
                'username': user.username,
                'tipoUsuario': user.tipoUsuarioId.nombre,
                'nombre': user.nombre,
                'foto': user.foto,
            }
        })

    @property
    def allowed_methods(self):
        return ['POST']