# Generated by Django 2.2.9 on 2021-06-24 03:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0003_auto_20210620_1832'),
    ]

    operations = [
        migrations.CreateModel(
            name='Proyecto',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activo', models.BooleanField(default=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('nombre', models.CharField(max_length=250)),
                ('descripcion', models.TextField()),
                ('costo', models.FloatField()),
                ('fecha_inicio', models.DateField()),
                ('fecha_fin', models.DateField()),
                ('tipo', models.IntegerField(choices=[(10, 'Proyecto de agua'), (20, 'Proyecto de cementerio'), (30, 'Otros proyectos')], default=30)),
            ],
            options={
                'ordering': ['id'],
                'abstract': False,
            },
        ),
    ]