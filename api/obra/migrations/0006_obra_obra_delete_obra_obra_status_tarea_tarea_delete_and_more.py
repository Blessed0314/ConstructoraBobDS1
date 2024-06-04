# Generated by Django 4.2.5 on 2024-06-03 00:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('obra', '0005_reporte'),
    ]

    operations = [
        migrations.AddField(
            model_name='obra',
            name='obra_delete',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='obra',
            name='obra_status',
            field=models.CharField(default='nueva', max_length=15),
        ),
        migrations.AddField(
            model_name='tarea',
            name='tarea_delete',
            field=models.BooleanField(default=False),
        ),
        migrations.AddField(
            model_name='tarea',
            name='tarea_status',
            field=models.CharField(default='nueva', max_length=15),
        ),
    ]
