# Generated by Django 2.2.9 on 2021-07-10 22:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_merge_20210706_0333'),
    ]

    operations = [
        migrations.CreateModel(
            name='Configuracion',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('activo', models.BooleanField(default=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('cuota_agua', models.FloatField(default=0)),
                ('cuota_cementerio', models.FloatField(default=0)),
            ],
            options={
                'ordering': ['id'],
                'abstract': False,
            },
        ),
    ]