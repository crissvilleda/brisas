# Generated by Django 2.2.9 on 2021-11-25 03:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0016_servicio_no_predio'),
    ]

    operations = [
        migrations.CreateModel(
            name='Fallecidos',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activo', models.BooleanField(default=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('nombres', models.CharField(max_length=250)),
                ('apellidos', models.CharField(max_length=250)),
                ('dpi', models.CharField(max_length=13)),
                ('fecha', models.DateField()),
            ],
            options={
                'ordering': ['id'],
                'abstract': False,
            },
        ),
    ]
