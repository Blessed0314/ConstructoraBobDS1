import uuid
from django.db import models

# Create your models here.

class Obra (models.Model):
    obraId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)
    ubicacion = models.CharField(max_length=50)
    directorId = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE)
    tipoObraId = models.ForeignKey('TipoObra', on_delete=models.CASCADE)
    usuarios = models.ManyToManyField('usuario.Usuario', related_name='obras')
    obra_status = models.CharField(max_length=15, default='nueva')
    obra_delete = models.BooleanField(default=False)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_actualizacion = models.DateField(auto_now=True)

    def __str__(self):
        return self.nombre

class TipoObra(models.Model):
    tipoObraId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
    
class Tarea(models.Model):
    tareaId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    obraId = models.ForeignKey('Obra', on_delete=models.CASCADE)
    tipoTareaId = models.ForeignKey('TipoTarea', on_delete=models.CASCADE)
    descripcion = models.TextField(max_length=200)
    capatazId = models.ForeignKey('usuario.Usuario', on_delete=models.CASCADE)
    usuarios = models.ManyToManyField('usuario.Usuario', related_name='tareas')
    status = models.CharField(max_length=15, default='nueva')
    tarea_delete = models.BooleanField(default=False)
    fecha_asignacion = models.DateField()
    fecha_estimada = models.DateField()
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_actualizacion = models.DateField(auto_now=True)

    def __str__(self):
        return self.nombre
    
class TipoTarea(models.Model):
    tipoTareaId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    nombre = models.CharField(max_length=50)

    def __str__(self):
        return self.nombre
    
class Reporte(models.Model):
    reporteId = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    tareaId = models.ForeignKey('Tarea', on_delete=models.CASCADE)
    descripcion = models.TextField(max_length=200)
    fotos = models.CharField(max_length=255)
    audios = models.CharField(max_length=255)
    fecha_registro = models.DateField(auto_now_add=True)
    fecha_actualizacion = models.DateField(auto_now=True)

    def __str__(self):
        return self.nombre